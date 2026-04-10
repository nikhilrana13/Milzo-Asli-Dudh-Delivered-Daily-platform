const  mongoose = require("mongoose")
const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  discountType: {type: String, enum: ["percentage", "flat"], required: true,},
  discountValue: { type: Number, required: true },
  maxDiscount: { type: Number, default: null }, // for % cap
  minOrderAmount: { type: Number, default: 0 },
  applicableFor: {type: String,enum: ["all", "first_subscription"],default: "all"},
  applicableDays: { type: Number, default: null }, // e.g. 30 days only
  vendorId: { type: mongoose.Types.ObjectId, ref: "Vendor", default: null },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Campaign = mongoose.model("Campaign",campaignSchema)
module.exports = Campaign 




