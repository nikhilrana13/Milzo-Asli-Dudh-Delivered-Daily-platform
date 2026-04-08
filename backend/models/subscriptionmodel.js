const mongoose = require("mongoose");
const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    vendorId: { type: mongoose.Types.ObjectId, ref: "Vendor", required: true },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    unit: { type: String, enum: ["ml", "litre", "g", "kg"], required: true },
    pricePerDay: { type: Number, required: true },
    totalDays: { type: Number, default: 30 },
    totalAmount: { type: Number, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    status: {
      type: String,
      enum: ["active", "paused", "cancelled", "completed"],
      default: "active",
    },
    deliveryTimings: {
      type: [
        {
          slot: { type: String, enum: ["morning", "evening"] },
          time: {
            type: String,
            match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"],
            default: null,
          },
        },
      ],
      default: [
        { slot: "morning", time: null },
        { slot: "evening", time: null },
      ],
    },
    expiryDate: { type: Date },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "cancelled", "confirmed"],
      default: "pending",
    },
    bookingId: { type: mongoose.Types.ObjectId, ref: "Booking" },
    deliveryAddress: {
      label: String,
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
      location: {
        type: { type: String, enum: ["Point"] },
        coordinates: [Number],
      },
    },
    pauseStartDate: {type:Date,default:null},
    totalPausedDays: {type:Number,default:0}
  },{ timestamps: true });

subscriptionSchema.index({ userId: 1, status: 1 });

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
