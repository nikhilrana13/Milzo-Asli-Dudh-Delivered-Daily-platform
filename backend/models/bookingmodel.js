const mongoose = require("mongoose")
const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Types.ObjectId, ref: "Product" },
  vendorId: { type: mongoose.Types.ObjectId, ref: "Vendor" },
  quantity: Number,
  unit: String,
  pricePerDay: Number,
  totalDays: Number,
  totalAmount: Number,
  startDate: Date,
  endDate: Date,
  deliveryTimings: Array,
  status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  stripeSessionId: String,
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
}
}, { timestamps: true });

const Booking = mongoose.model("Booking",bookingSchema)
module.exports = Booking