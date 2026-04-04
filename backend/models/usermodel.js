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
        label:{type:String,default:"home",lowercase:true,trim:true},
        address:{ type: String,default:"",trim:true,lowercase:true},
        city:{type: String,default:"",trim:true,lowercase:true},
        pincode:{type: String,default:"",match: [/^[0-9]{6}$/, "Invalid pincode"]},
      }
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


userSchema.index({ firebaseUid: 1 });
const User = mongoose.model("User", userSchema);
module.exports = User;
