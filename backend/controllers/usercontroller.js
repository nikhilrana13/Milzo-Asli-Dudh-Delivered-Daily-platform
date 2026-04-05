const User = require("../models/usermodel");
const Response = require("../utils/responsehandler");
const { deleteFromImageKit, uploadToImageKit } = require("../utils/upload");
const { safeParse } = require("../utils/validations");
const { getCityFromCoords } = require("../utils/geolocations");

// update user profile
const UpdateUserProfile = async (req, res) => {
  try {
    const userId = req.user;
    const { username, phoneNumber, secondPhoneNumber } = req.body;
    const profilePic = req.file;
    //check user exists or not
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 401, "User not found");
    }
    if (user.role !== "user") {
      return Response(res, 401, "You are not authorized to access this route");
    }
    let uploadedFiles = [];
    // upload profile pic
    let profilePicUrl = user.profilePic?.url || null; // Keep existing if not uploading
    let profilePicFileId = user.profilePic?.fileId || null;
    if (profilePic) {
      // Upload new profilePic
      const uploaded = await uploadToImageKit(
        profilePic,
        "/milzo/users/profileimages",
      );
      uploadedFiles.push(uploaded);
      // Delete old profilePic from ImageKit if it exists
      if (profilePicFileId) {
        try {
          await deleteFromImageKit([{ fileId: profilePicFileId }]);
          console.log("Old profilePic deleted from ImageKit");
        } catch (err) {
          console.error("Failed to delete old profilePic:", err);
        }
      }
      profilePicUrl = uploaded.url;
      profilePicFileId = uploaded.fileId;
    }
    let updateData = {};
    if (username) updateData.username = username;
    if (phoneNumber) {
      // Validate Indian phone number (10 digits starting with 6-9)
      const indianPhoneRegex = /^[6-9]\d{9}$/;
      if (!indianPhoneRegex.test(phoneNumber)) {
        return Response(res, 400, "Invalid Indian phone number");
      }
      updateData.phoneNumber = phoneNumber;
    }
    if (secondPhoneNumber) {
      const indianPhoneRegex = /^[6-9]\d{9}$/;
      if (!indianPhoneRegex.test(secondPhoneNumber)) {
        return Response(res, 400, "Invalid Indian phone number");
      }
      updateData.secondPhoneNumber = secondPhoneNumber;
    }
    updateData.profilePic = { url: profilePicUrl, fileId: profilePicFileId };
    // update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true },
    );
    return Response(res, 200, "Profile updated successfully", {
      user: updatedUser,
    });
  } catch (error) {
    console.error("failed to update user profile", error);
    return Response(res, 500, "Internal server error");
  }
};
// add new address
const AddnewAddress = async (req, res) => {
  try {
    const userId = req.user;
    const { newaddress } = req.body;
    if (!newaddress || typeof newaddress !== "object") {
      return Response(res, 400, "Address is required and must be object");
    }
    const { label, addressLine, city, state, pincode, lat, lng } = newaddress;
     if (!label) {
      return Response(res, 400, "Label is required");
    }
    // check user
    const user = await User.findById(userId).select("addresses role");
    if (!user || user.role !== "user") {
      return Response(res, 401, "Unauthorized");
    }
    if (user.addresses.length >= 5) {
      return Response(res, 400, "Max 5 addresses allowed");
    }
    // check if address already exists
     let addressData = {
      label: label.trim().toLowerCase(),
      addressLine: addressLine ? addressLine.trim().toLowerCase() : "",
      city: city.trim().toLowerCase(),
      state: state.trim().toLowerCase(),
      pincode: pincode.trim(),
    };
    const alreadyExists = user.addresses.find((addr) =>
        addr.pincode === addressData.pincode && addr.city === addressData.city,
    );
    if (alreadyExists) {
      return Response(res, 200, "Address already exists", alreadyExists);
    }
    if (!city || !state || !pincode) {
      return Response(res, 400, "City, state, and pincode are required");
    }
    if (!/^[0-9]{6}$/.test(pincode)) {
      return Response(res, 400, "Invalid pincode");
    }
    addressData.city = city.trim().toLowerCase();
    addressData.state = state.trim().toLowerCase();
    addressData.pincode = pincode.trim();
    // optional
    // geo location
    if (
      lat !== undefined &&
      lng !== undefined &&
      !isNaN(lat) &&
      !isNaN(lng)
    ) {
      addressData.location = {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)],
      };
    }
    // push address
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          addresses: addressData,
        },
      },
      { new: true, runValidators: true },
    );
    return Response(res, 200, "Address added successfully", {
      addresses: updatedUser.addresses,
    });
  } catch (error) {
    console.error("failed to add new address", error);
    return Response(res, 500, "Internal server error");
  }
};
// update address
const UpdateAddress = async (req, res) => {
  try {
    const userId = req.user;
    const { addressId, label, addressLine, city, state, pincode, lat, lng } =
      req.body;
    if (!addressId) {
      return Response(res, 400, "Address ID is required");
    }
    if (pincode && !/^[0-9]{6}$/.test(pincode)) {
      return Response(res, 400, "Invalid pincode");
    }
    // check user
    const user = await User.findById(userId).select("addresses role");
    if (!user || user.role !== "user") {
      return Response(res, 401, "Unauthorized");
    }
    // find address index
    const addressIndex = user.addresses.findIndex(
      (addr) => addr._id.toString() === addressId,
    );
    if (addressIndex === -1) {
      return Response(res, 404, "Address not found");
    }
    // update only provided fields (partial update)
    if (label) user.addresses[addressIndex].label = label.toLowerCase().trim();
    if (addressLine !== undefined)
      user.addresses[addressIndex].addressLine = addressLine
        ? addressLine.trim().toLowerCase()
        : "";
    if (city) user.addresses[addressIndex].city = city.trim().toLowerCase();
    if (state) user.addresses[addressIndex].state = state.trim().toLowerCase();
    if (pincode) user.addresses[addressIndex].pincode = pincode.trim();
    // optional location update
    if (lat !== undefined && lng !== undefined) {
      user.addresses[addressIndex].location = {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)],
      };
    }
    await user.save();
    return Response(res, 200, "Address updated successfully", {
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("failed to update address", error);
    return Response(res, 500, "Internal server error");
  }
};
// get user all address
const GetUserAddresses = async (req, res) => {
  try {
    const userId = req.user;
    // check user
    const user = await User.findById(userId);
    if (!user || user.role !== "user") {
      return Response(res, 401, "Unauthorized");
    }
    return Response(res, 200, "Addresses fetched successfully", {
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("failed to fetch addresses", error);
    return Response(res, 500, "Internal server error");
  }
};
// delete address
const DeleteAddress = async (req, res) => {
  try {
    const userId = req.user;
    const { addressId } = req.body;
    if (!addressId) {
      return Response(res, 400, "Address ID is required");
    }
    // check user
    const user = await User.findById(userId);
    // console.log("user",user)
    if (!user || user.role !== "user") {
      return Response(res, 401, "Unauthorized");
    }
    // check address exists
    const addressExists = user.addresses.some(
      (addr) => addr._id.toString() === addressId,
    );
    if (!addressExists) {
      return Response(res, 404, "Address not found");
    }
    // remove address
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: addressId } } },
      { new: true },
    );
    return Response(res, 200, "Address deleted successfully", {
      addresses: updatedUser.addresses,
    });
  } catch (error) {
    console.error("failed to delete address", error);
    return Response(res, 500, "Internal server error");
  }
};
// add address from coordinates (reverse geocoding) fetch city state pincode automatically
const AddAddressFromCoords = async (req, res) => {
  try {
    const userId = req.user;
    const { lat, lng, label = "home" } = req.body;
    if (!lat === undefined || !lng === undefined) {
      return Response(res, 400, "Latitude and longitude are required");
    }
    // check user
    const user = await User.findById(userId);
    if (!user || user.role !== "user") {
      return Response(res, 401, "Unauthorized");
    }
    if (lat === undefined || lng === undefined) {
      return Response(res, 400, "Latitude and longitude are required");
    }
    const safeLabel = label?.toLowerCase().trim() || "home";
    if (user.addresses.length >= 5) {
      return Response(res, 400, "Maximum 5 addresses allowed");
    }
    // reverse geocode
    const geoData = await getCityFromCoords(lat, lng);
    if (!geoData) {
      return Response(res, 400, "Unable to geocode coordinates");
    }
    const { city, state, pincode } = geoData;
    // create address object
    const newAddress = {
      label: safeLabel,
      city,
      state,
      pincode,
      location: {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)], // [lng, lat]
      },
    };
    // add to user addresses
    user.addresses.push(newAddress);
    await user.save();
    return Response(res, 200, "Address added successfully", {
      city,
      state,
      pincode,
    });
  } catch (error) {
    console.error("Failed to add address from coords", error);
    return Response(res, 500, "Internal server error");
  }
};
module.exports = {
  UpdateUserProfile,
  AddnewAddress,
  UpdateAddress,
  GetUserAddresses,
  DeleteAddress,
  AddAddressFromCoords,
};
