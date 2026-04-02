const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Types.ObjectId, ref: "Vendor", required: true },
    productName: { type: String, required: true, trim: true, maxlength: 40,lowercase:true},
    description: { type: String, required: true, maxlength: 150 },
    category: {
      type: String,
      enum: ["milk", "paneer", "curd", "lassi", "butter"],
      default: "milk",
    },
    priceOptions: [
      {
        unit: {
          type: String,
          enum: ["ml", "litre", "g", "kg"],
          required: true,
        },
        quantity: {
          type: Number, // e.g. 500ml, 1kg
          required: true,
        },
        mrp: {
          type: Number,
          required: true,
          min: 1,
        },
        sellingPrice: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    isAvailable: { type: Boolean, default: true },
    images: [{ url:{type:String},fileId:{type:String} }],
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
  { timestamps: true },
);
// for query optimization
productSchema.index({ vendorId: 1 });
productSchema.index({ category: 1 });
const Product = mongoose.model("Product", productSchema);
module.exports = Product;

