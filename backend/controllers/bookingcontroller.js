const Booking = require("../models/bookingmodel");
const Product = require("../models/productmodel");
const Subscription = require("../models/subscriptionmodel");
const User = require("../models/usermodel");
const Vendor = require("../models/vendormodel");
const StripeInstance = require("../utils/stripe");
const Response = require("../utils/responsehandler");
const { safeParse } = require("../utils/validations");
const mongoose = require("mongoose");
const { calculateOffer } = require("../utils/helpers");

// create subscription booking
const CreateSubscriptionBooking = async (req, res) => {
  try {
    const userId = req.user;
    const {
      productId,
      vendorId,
      quantity,
      unit,
      pricePerDay,
      startDate,
      endDate,
      campaignId,
      deliveryTimings,
      deliveryAddress,
    } = req.body;
    // Required fields
    const requiredFields = [
      "productId",
      "vendorId",
      "quantity",
      "unit",
      "pricePerDay",
      "endDate",
      "deliveryAddress",
    ];
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return Response(res, 400, `${field} is required`);
      }
    }

    // Type and value validation
    const parsedQuantity = Number(quantity);
    const parsedPricePerDay = Number(pricePerDay);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return Response(res, 400, "Invalid quantity - must be a positive number");
    }
    if (isNaN(parsedPricePerDay) || parsedPricePerDay <= 0) {
      return Response(res, 400, "Invalid price - must be a positive number");
    }
    // Unit validation
    if (!["ml", "litre", "g", "kg"].includes(unit)) {
      return Response(res, 400, "Invalid unit - must be ml, litre, g, or kg");
    }
    // Authentication && authorization
    const user = await User.findById(userId);
    if (!user || user.role !== "user") {
      return Response(res, 401, "Unauthorized - invalid user role");
    }

    const product = await Product.findById(productId);
    if (!product) {
      return Response(res, 400, "Invalid product");
    }
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return Response(res, 400, "Invalid vendor");
    }
    // Check for existing active subscription and pending booking in one query to reduce race condition window
    const [existing, recentBooking] = await Promise.all([
      Subscription.findOne({
        userId,
        productId,
        status: "active",
      }),
      Booking.findOne({
        userId,
        productId,
        status: "pending",
      }),
    ]);

    if (existing) {
      return Response(res, 400, "Subscription already active for this product");
    }
    if (recentBooking) {
      return Response(res, 400, "Payment already in progress for this product");
    }
    let parsedTimings = [];
    try {
      parsedTimings = deliveryTimings ? safeParse(deliveryTimings) : [];
    } catch {
      return Response(res, 400, "Invalid deliveryTimings format");
    }
    let parsedDeliveryAddress = {};
    try {
      parsedDeliveryAddress = safeParse(deliveryAddress);
    } catch (error) {
      return Response(res, 400, "Invalid deliveryAddress format");
    }
    if (
      !parsedDeliveryAddress.city ||
      !parsedDeliveryAddress.pincode ||
      !parsedDeliveryAddress.addressLine
    ) {
      return Response(res, 400, "Incomplete delivery address ");
    }
    // date calculation
    const start = startDate ? new Date(startDate) : new Date();
    const end = new Date(endDate);

    if (isNaN(end.getTime())) {
      return Response(res, 400, "Invalid endDate format");
    }
    if (end <= start) {
      return Response(res, 400, "endDate must be after startDate");
    }
    const totalDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (totalDays <= 0) {
      return Response(res, 400, "Invalid subscription duration");
    }
    // calculate total amount
    const totalAmount = parsedPricePerDay * parsedQuantity * totalDays;
    // apply discount offer
    let offerResult;
    try {
      offerResult = await calculateOffer({
        userId,
        campaignId,
        totalAmount,
      });
    } catch (err) {
      console.error("failed to calculate offer",err)
      return Response(res, 400, err.message);
    }
    const { finalAmount, discountAmount, appliedCampaign } = offerResult;
    // create booking
    const booking = await Booking.create({
      userId: user._id,
      productId,
      vendorId,
      quantity: parsedQuantity,
      unit,
      pricePerDay: parsedPricePerDay,
      totalDays,
      totalAmount: finalAmount,
      originalAmount: totalAmount,
      discountAmount: discountAmount,
      campaignId: appliedCampaign,
      startDate: start,
      endDate: end,
      deliveryTimings: parsedTimings,
      status: "pending",
      deliveryAddress: parsedDeliveryAddress,
    });
    // create stripe session
    let session;
    try {
      session = await StripeInstance.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: { name: product.name || "Milk Subscription" },
              unit_amount: Math.round(finalAmount * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/payment-success?bookingId=${booking._id}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-failed?bookingId=${booking._id}`,
        metadata: {
          bookingId: String(booking._id),
          userId: String(userId),
          productId: String(productId),
          vendorId: String(vendorId),
        },
      });
    } catch (stripeError) {
      console.error("Stripe session creation failed:", stripeError.message);
      // delete the booking created if Stripe fails
      await Booking.findByIdAndDelete(booking._id);
      return Response(
        res,
        500,
        "Payment processing failed. Please try again.",
        null,
      );
    }
    booking.stripeSessionId = session.id;
    await booking.save();
    return Response(res, 200, "Proceed to payment", {
      totalAmount,
      discountAmount: totalAmount - finalAmount,
      finalAmount,
      url: session.url,
      bookingId: booking._id,
      campaignId: appliedCampaign,
    });
  } catch (error) {
    console.error("Create Subscription Booking error:", {
      message: error.message,
      stack: error.stack,
      userId: req.user,
    });
    return Response(res, 500, "Internal server error", null);
  }
};
// stripe webhook
const StripeWebhookHandler = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = StripeInstance.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    console.log("Webhook received:", event.type, event.id);
    // Handle event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const bookingId = session.metadata?.bookingId;
        if (!bookingId) {
          console.warn("Missing bookingId in session metadata");
          return res.json({ received: true });
        }
        const booking = await Booking.findById(bookingId);
        if (!booking) {
          console.warn(`Booking not found: ${bookingId}`);
          return res.json({ received: true });
        }
        // Prevent double processing with atomic update
        if (booking.status === "paid") {
          console.log(`Booking ${bookingId} already processed`);
          return res.json({ received: true });
        }
        // Verify session ID matches
        if (booking.stripeSessionId !== session.id) {
          console.warn(`Session ID mismatch for booking ${bookingId}`);
          return res.json({ received: true });
        }
        // Check for existing active subscription
        const existingSub = await Subscription.findOne({
          userId: booking.userId,
          productId: booking.productId,
          status: "active",
        });
        if (existingSub) {
          console.log(
            `Active subscription already exists for user ${booking.userId}, product ${booking.productId}`,
          );
          return res.json({ received: true });
        }
        // Use transaction for atomic operations
        const dbSession = await mongoose.startSession();
        dbSession.startTransaction();
        try {
          // Update booking status
          booking.status = "paid";
          await booking.save({ session: dbSession });
          // Create subscription
          await Subscription.create(
            [
              {
                userId: booking.userId,
                vendorId: booking.vendorId,
                productId: booking.productId,
                quantity: booking.quantity,
                unit: booking.unit,
                pricePerDay: booking.pricePerDay,
                totalDays: booking.totalDays,
                totalAmount: booking.totalAmount,
                startDate: booking.startDate,
                endDate: booking.endDate,
                deliveryTimings: booking.deliveryTimings,
                paymentStatus: "paid",
                bookingStatus: "pending",
                status: "active",
                deliveryAddress: booking.deliveryAddress,
              },
            ],
            { session: dbSession },
          );
          await dbSession.commitTransaction();
          console.log(
            `Successfully processed payment for booking ${bookingId}`,
          );
        } catch (transactionError) {
          await dbSession.abortTransaction();
          console.error(
            `Transaction failed for booking ${bookingId}:`,
            transactionError.message,
          );
          throw transactionError;
        } finally {
          dbSession.endSession();
        }
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object;
        const bookingId = session.metadata?.bookingId;
        if (!bookingId) {
          console.warn("Missing bookingId in expired session metadata");
          return res.json({ received: true });
        }
        const booking = await Booking.findById(bookingId);
        if (booking && booking.status === "pending") {
          booking.status = "failed";
          await booking.save();
          console.log(
            `Marked booking ${bookingId} as failed due to session expiry`,
          );
        }
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    res.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", {
      message: error.message,
      stack: error.stack,
      eventType: req.body?.type,
    });
    // Always return 200 to prevent Stripe from retrying with errors
    res.status(200).json({ received: true, error: "Processing failed" });
  }
};
// test only - Manual payment confirmation
const UpdatePaymentStatus = async (req, res) => {
  try {
    const userId = req.user;
    const bookingId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 404, "User not found");
    }
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return Response(res, 404, "Booking not found");
    }
    // Prevent double processing
    if (booking.status === "paid") {
      return Response(res, 400, "Booking already paid");
    }
    // Check for existing active subscription
    const existingSub = await Subscription.findOne({
      userId: booking.userId,
      productId: booking.productId,
      status: "active",
    });
    if (existingSub) {
      return Response(res, 400, "Subscription already active for this product");
    }
    // Use transaction for atomic operations
    const dbSession = await mongoose.startSession();
    dbSession.startTransaction();
    try {
      // Update booking status
      booking.status = "paid";
      await booking.save({ session: dbSession });
      // Create subscription
      await Subscription.create(
        [
          {
            userId: booking.userId,
            vendorId: booking.vendorId,
            productId: booking.productId,
            quantity: booking.quantity,
            unit: booking.unit,
            pricePerDay: booking.pricePerDay,
            totalDays: booking.totalDays,
            totalAmount: booking.totalAmount,
            startDate: booking.startDate,
            endDate: booking.endDate,
            deliveryTimings: booking.deliveryTimings,
            paymentStatus: "paid",
            bookingStatus: "pending",
            status: "active",
            deliveryAddress: booking.deliveryAddress,
          },
        ],
        { session: dbSession },
      );
      await dbSession.commitTransaction(); // save
      // console.log(
      //   `Successfully processed manual payment for booking ${bookingId}`,
      // );
    } catch (transactionError) {
      await dbSession.abortTransaction(); // undo
      console.error(
        `Transaction failed for booking ${bookingId}:`,
        transactionError.message,
      );
      throw transactionError;
    } finally {
      dbSession.endSession();
    }
    return Response(res, 200, "Payment marked as successful", booking);
  } catch (error) {
    console.log("failed to update payment status", error);
    return Response(res, 500, "Internal server error");
  }
};
// vendor all bookings
const VendorAllBookings = async (req, res) => {
  try {
    const userId = req.user;
    let { page = 1, limit = 6, status } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    // check vendor exists or not
    const vendorExists = await Vendor.findById(userId);
    if (!vendorExists) {
      return Response(res, 401, "Vendor not found");
    }
    if (vendorExists.role !== "vendor") {
      return Response(res, 400, "You are not authorized to access this route");
    }
    let filter = { vendorId: vendorExists._id };
    // category filter
    if (status) {
      filter.status = status;
    }
    const bookings = await Booking.find(filter)
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "username phoneNumber email")
      .populate("productId", "productName images");
    const totalBookings = await Booking.countDocuments(filter);
    const totalPages = Math.ceil(totalBookings / limit);
    if (bookings.length === 0) {
      return Response(res, 200, "No Bookings found", []);
    }
    return Response(res, 200, "Bookings found", {
      bookings,
      pagination: {
        totalBookings,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("failed to fetch vendor Bookings", error);
    return Response(res, 500, "Internal server error");
  }
};
// User all bookings
const UserAllBookings = async (req, res) => {
  try {
    const userId = req.user;
    let { page = 1, limit = 6, status } = req.query;
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
    // category filter
    if (status) {
      filter.status = status;
    }
    const bookings = await Booking.find(filter)
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .populate("vendorId", "displayName contactnumbers email")
      .populate("productId", "productName images");
    const totalBookings = await Booking.countDocuments(filter);
    const totalPages = Math.ceil(totalBookings / limit);
    if (bookings.length === 0) {
      return Response(res, 200, "No Bookings found", []);
    }
    return Response(res, 200, "Bookings found", {
      bookings,
      pagination: {
        totalBookings,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("failed to fetch user Bookings", error);
    return Response(res, 500, "Internal server error");
  }
};

module.exports = {
  CreateSubscriptionBooking,
  StripeWebhookHandler,
  UpdatePaymentStatus,
  VendorAllBookings,
  UserAllBookings,
};
