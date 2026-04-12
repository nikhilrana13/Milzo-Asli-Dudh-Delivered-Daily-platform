const Product = require("../models/productmodel");
const Review = require("../models/reviewmodel");
const Subscription = require("../models/subscriptionmodel");
const User = require("../models/usermodel");
const Vendor = require("../models/vendormodel");
const Response = require("../utils/responsehandler");

// add review
const AddReview = async (req, res) => {
  try {
    const userId = req.user;
    let { productId, vendorId, rating, comment } = req.body;
    const requiredFields = ["productId", "vendorId"];
    // validation
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return Response(res, 400, `${field} is required`);
      }
    }
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 403, "User not found");
    }
    if (user.role !== "user") {
      return Response(res, 401, "You are not authorized to access this route");
    }
    // check review already exists or not
    const existingReview = await Review.findOne({
      userId,
      productId,
    });
    if (existingReview) {
      return Response(res, 400, "You already reviewed this product");
    }
    const product = await Product.findById(productId);
    if (!product || product.vendorId.toString() !== vendorId) {
      return Response(res, 400, "Invalid product/vendor");
    }
    const subscription = await Subscription.findOne({
      userId,
      productId,
      status: "completed",
    });

    if (!subscription) {
      return Response(res, 400, "You can review only after subscription ends");
    }
    if (rating < 1 || rating > 5) {
      return Response(res, 400, "Rating must be between 1 and 5");
    }

    // create review
    const review = await Review.create({
      userId: user._id,
      productId,
      vendorId,
      rating,
      comment,
    });
    // update product rating
    const newRating =
      (product.rating * product.totalReviews + rating) /
      (product.totalReviews + 1);

    await Product.findByIdAndUpdate(productId, {
      rating: newRating || 0,
      totalReviews: product.totalReviews + 1,
    });
    return Response(res, 200, "Thankyou for your feedback", { review });
  } catch (error) {
    console.error("failed to add review", error);
    return Response(res, 500, "Internal server error");
  }
};
// get each product review
const GetProductReviews = async (req, res) => {
  try {
    const vendorId = req.user;
    const { productId } = req.params.id;
    let { page = 1, limit = 10, rating } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    // vendor check
    const vendor = await Vendor.findById(vendorId);
    if (!vendor || vendor.role !== "vendor") {
      return Response(res, 403, "Forbidden");
    }
    // product check
    const product = await Product.findById(productId);
    if (!product || product.vendorId.toString() !== vendorId) {
      return Response(res, 400, "Invalid product");
    }
    // filter build
    let filter = { productId };
    if (rating) {
      filter.rating = Number(rating);
    }
    //  fetch reviews
    const reviews = await Review.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("userId", "username email");
    // total count
    const totalReviews = await Review.countDocuments(filter);
    const totalPages = Math.ceil(totalReviews / limit);
    return Response(res, 200, "Reviews fetched successfully", {
      reviews,
      pagination: {
        totalReviews,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("Get reviews error", error);
    return Response(res, 500, "Internal server error");
  }
};

module.exports = {AddReview,GetProductReviews}



