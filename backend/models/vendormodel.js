const mongoose = require("mongoose");
const vendorSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, maxlength: 20 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    role: { type: String, default: "vendor",enum:["vendor"]},
    password: { type: String, required: true },
    profilePic: { type: String, default: null },
    displayName: { type: String, default: "", maxlength: 100 },
    location: { type: String, default: "", trim: true },
    city: { type: String, default: "", trim: true },
    pincode: {
      type: String,
      default: "",
      match: [/^[0-9]{6}$/, "Invalid pincode"],
    },
    contactnumbers: [{ type: String, default:""}],
    dairyImages: [{ type: String }],
    dairyVideos: [{ type: String }],
    isActive: { type: Boolean, default: false },
    isKycApproved: { type: Boolean, default: false },
    kycDetails: {
      aadharNumber: { type: String},
      aadharImages: [{ type: String }],
      bankAccountNumber: { type: String, default: ""},
      ifscCode: { type: String, default: "" },
    },
    milkLabTestImg: { type: String, default: "" },
    kycStatus: {
      type: String,
      enum: ["approved", "rejected", "pending","not_submitted"],
      default: "not_submitted",
    },
    rejectedReason: { type: String, default: "" },
    deliveryTimings: {
      type: [
        {
          slot: { type: String, enum: ["morning", "evening"] },
          time: {
            type: String,
            match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"],
          },
        },
      ],
      default: [
        { slot: "morning", time: "" },
        { slot: "evening", time: "" },
      ],
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// for query optimization
vendorSchema.index({ city: 1, pincode: 1 });

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
