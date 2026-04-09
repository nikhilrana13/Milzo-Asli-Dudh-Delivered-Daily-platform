const Subscription = require("../models/subscriptionmodel");
const User = require("../models/usermodel");
const Vendor = require("../models/vendormodel");
const Response = require("../utils/responsehandler");

// user all subscriptions
const UserSubscriptions = async (req, res) => {
  try {
    const userId = req.user;
    let { page = 1, limit = 6, paymentStatus, bookingStatus } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    // check vendor exists or not
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 401, "User not found");
    }
    if (user.role !== "user") {
      return Response(res, 400, "You are not authorized to access this route");
    }
    let filter = { userId: user._id };
    if (
      paymentStatus &&
      !["pending", "paid", "failed"].includes(paymentStatus)
    ) {
      return Response(res, 400, "Invalid paymentStatus");
    }
    if (
      bookingStatus &&
      !["pending", "confirmed", "cancelled"].includes(bookingStatus)
    ) {
      return Response(res, 400, "Invalid bookingStatus");
    }
    //   status filter
    if (paymentStatus) {
      filter.paymentStatus = paymentStatus;
    }
    if (bookingStatus) {
      filter.bookingStatus = bookingStatus;
    }
    const subscriptions = await Subscription.find(filter)
      .sort({ createdAt: -1 }) // latest
      .skip(skip)
      .limit(limit)
      .populate("vendorId", "displayName contactnumbers email")
      .populate("productId", "productName images");
    const totalSubs = await Subscription.countDocuments(filter);
    const totalPages = Math.ceil(totalSubs / limit);
    if (subscriptions.length === 0) {
      return Response(res, 200, "No Subscriptions found", []);
    }
    return Response(res, 200, "Subscriptions found", {
      subscriptions,
      pagination: {
        totalSubs,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("failed to fetch user Subscriptions", error);
    return Response(res, 500, "Internal server error");
  }
};
// user pause subscription
const PauseOrActiveSubscription = async (req, res) => {
  try {
    const userId = req.user;
    const subscriptionId = req.params.id;
    const { status } = req.body;
    if (!subscriptionId || !status) {
      return Response(res, 400, "subscription id and status are required");
    }
    if (!["active", "paused"].includes(status)) {
      return Response(res, 400, "Status must be either 'active' or 'paused'");
    }
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 401, "User not found");
    }
    if (user.role !== "user") {
      return Response(res, 401, "You are not authorized to access this route");
    }
    const subscription = await Subscription.findOne({
      _id: subscriptionId,
      userId,
      paymentStatus: "paid",
      bookingStatus: "confirmed",
      status: { $nin: ["completed", "cancelled"] },
    });
    if (!subscription) {
      return Response(res, 400, "Invalid or already processed");
    }
    if (subscription.status === status) {
      return Response(res, 400, "Subscription already in this state");
    }
    if (status === "paused" && subscription.pauseStartDate) {
      return Response(res, 400, "Already paused");
    }
    if (!subscription.endDate) {
      return Response(res, 400, "Invalid subscription endDate");
    }
    // pause
    if (status === "paused") {
      subscription.status = "paused";
      subscription.pauseStartDate = new Date();
    }
    // resume
    if (status === "active") {
      if (subscription.pauseStartDate) {
        const pausedDays = Math.ceil(
          (Date.now() - subscription.pauseStartDate.getTime()) /
            (1000 * 60 * 60 * 24),
        );
        subscription.totalPausedDays += pausedDays;
        // extend endDate correctly
        subscription.endDate = new Date(
          subscription.endDate.getTime() + pausedDays * 24 * 60 * 60 * 1000,
        );
        subscription.pauseStartDate = null;
      }
      subscription.status = "active";
    }
    await subscription.save();
    return Response(res, 200, `Subscription ${status}`, {
      status: subscription.status,
      totalPausedDays: subscription.totalPausedDays,
    });
  } catch (error) {
    console.error("failed to pause booking", error);
    return Response(res, 500, "Internal server error");
  }
};
// cancel subscription
const CancelSubscription = async (req, res) => {
  try {
    const userId = req.user;
    const subscriptionId = req.params.id;

    if (!subscriptionId) {
      return Response(res, 400, "subscriptionId is required");
    }
    // check user
    const user = await User.findById(userId);
    if (!user || user.role !== "user") {
      return Response(res, 401, "Unauthorized");
    }
    const subscription = await Subscription.findOne({
      _id: subscriptionId,
      userId,
    });
    if (!subscription) {
      return Response(res, 404, "Subscription not found");
    }
    //  already cancelled/completed
    if (["cancelled", "completed"].includes(subscription.status)) {
      return Response(res, 400, "Subscription already closed");
    }
    // Subscription cannot be cancelled after start date
    const now = new Date();
    if (now >= subscription.startDate) {
      return Response(res,403,"Cancellation not allowed after start date");
    }
    // cancel subscription
    const updated = await Subscription.findOneAndUpdate(
      {
        _id: subscriptionId,
        userId,
        status: { $nin: ["cancelled", "completed"] },
        startDate: { $gt: new Date() },
      },
      {
        status: "cancelled",
        bookingStatus: "cancelled",
      },
      { new: true },
    );
    if (!updated) {
      return Response(res, 400, "Cannot cancel subscription");
    }
    return Response(res, 200, "Subscription cancelled successfully", {
      status: updated.status,
    });
  } catch (error) {
    console.error("Cancel Subscription Error:", error);
    return Response(res, 500, "Internal server error");
  }
};
// confirm or cancel subscription for vendor
const ConfirmOrCancelSubs = async (req, res) => {
  try {
    const vendorId = req.user;
    const subscriptionId = req.params.id;
    const { status } = req.body;
    if (!subscriptionId || !status) {
      return Response(res, 400, "subscription id and status are required");
    }
    if (!["confirmed", "cancelled"].includes(status)) {
      return Response(
        res,
        400,
        "Status must be either 'confirmed' or 'cancelled'",
      );
    }
    // check vendor exists or not
    const vendorexists = await Vendor.findById(vendorId);
    if (!vendorexists) {
      return Response(res, 401, "Vendor not found");
    }
    if (vendorexists.role !== "vendor") {
      return Response(res, 401, "You are not authorized to access this route");
    }
    const updated = await Subscription.findOneAndUpdate(
      {
        _id: subscriptionId,
        vendorId: vendorId,
        bookingStatus: "pending",
      },
      {
        bookingStatus: status,
        ...(status === "cancelled" && { status: "cancelled" }),
      },
      { new: true },
    );
    if (!updated) {
      return Response(res, 400, "Already processed or invalid");
    }
    return Response(res, 200, `Booking ${status}`, {
      bookingStatus: updated.bookingStatus,
    });
  } catch (error) {
    console.error("failed to confirm or cancelled booking", error);
    return Response(res, 500, "Internal server error");
  }
};
// vendor all subscriptions
const VendorAllSubscriptions = async (req, res) => {
  try {
    const vendorId = req.user;
    let { page = 1, limit = 6, paymentStatus, bookingStatus } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    // check vendor exists or not
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return Response(res, 401, "Vendor not found");
    }
    if (vendor.role !== "vendor") {
      return Response(res, 400, "You are not authorized to access this route");
    }
    let filter = { vendorId: vendor._id };
    if (
      paymentStatus &&
      !["pending", "paid", "failed"].includes(paymentStatus)
    ) {
      return Response(res, 400, "Invalid paymentStatus");
    }
    if (
      bookingStatus &&
      !["pending", "confirmed", "cancelled"].includes(bookingStatus)
    ) {
      return Response(res, 400, "Invalid bookingStatus");
    }
    //   status filter
    if (paymentStatus) {
      filter.paymentStatus = paymentStatus;
    }
    if (bookingStatus) {
      filter.bookingStatus = bookingStatus;
    }
    const subscriptions = await Subscription.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "username phoneNumber email")
      .populate("productId", "productName images");
    const totalSubs = await Subscription.countDocuments(filter);
    const totalPages = Math.ceil(totalSubs / limit);
    if (subscriptions.length === 0) {
      return Response(res, 200, "No Subscriptions found", []);
    }
    return Response(res, 200, "Subscriptions found", {
      subscriptions,
      pagination: {
        totalSubs,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("failed to fetch vendor Subscriptions", error);
    return Response(res, 500, "Internal server error");
  }
};


module.exports = {
  UserSubscriptions,
  ConfirmOrCancelSubs,
  PauseOrActiveSubscription,
  VendorAllSubscriptions,
  CancelSubscription
};
