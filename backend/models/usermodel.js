const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    firebaseUid: { type: String, required: true, unique: true },
    profilePic: { url: { type: String, default: null }, fileId: { type: String, default: null } },
   addresses: [
    {
    label: { type: String, default: "home", lowercase: true, trim: true },
    addressLine: { type: String, trim: true, lowercase: true },
    city: { type: String, trim: true, lowercase: true },
    state: { type: String, trim: true, lowercase: true },
    pincode: {
      type: String,
      match: [/^[0-9]{6}$/, "Invalid pincode"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number], // [lng, lat]
      },
    },
  },
],
    phoneNumber: {
      type: String,
      default: "",
      match: [/^[6-9]\d{9}$/, "Invalid Indian phone number"],
    },
    secondPhoneNumber: { type: String, default: "",match: [/^[6-9]\d{9}$/, "Invalid Indian phone number"]},
    isActive: { type: Boolean, default: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true },
);

userSchema.index({ "addresses.location": "2dsphere" });
userSchema.index({ firebaseUid: 1 });
const User = mongoose.model("User", userSchema);
module.exports = User;
