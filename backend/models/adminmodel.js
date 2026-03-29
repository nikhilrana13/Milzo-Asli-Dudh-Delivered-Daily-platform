const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
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
    password: { type: String, required: true },
    profilePic: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true },
);
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
