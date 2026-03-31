const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Types.ObjectId, ref: "Product" },
  vendorId: { type: mongoose.Types.ObjectId, ref: "Vendor" },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String, maxlength: 200 }
}, { timestamps: true });

const Review = mongoose.model("Review",reviewSchema)
module.exports = Review