const User = require("../models/usermodel");
const Response = require("../utils/responsehandler");
const { deleteFromImageKit, uploadToImageKit } = require("../utils/upload");
const { safeParse } = require("../utils/validations");

// update user profile
const UpdateUserProfile = async (req, res) => {
  try {
    const userId = req.user;
    const { username, addresses, phoneNumber, secondPhoneNumber } = req.body;
    const profilePic = req.file;
    //check user exists or not
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 401, "User not found");
    }
    if (user.role !== "user") {
      return Response(res, 401, "You are not authorized to access this route");
    }
    // parse address
    let parsedaddress = null;
    if (addresses) {
      try {
        parsedaddress = safeParse(addresses);
      } catch (err) {
        return Response(res, 400, "Invalid address format");
      }
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
    if (parsedaddress) updateData.addresses = parsedaddress;
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
    const { label, address, city, pincode } = newaddress;
    // validation
    if (!label || !address || !city || !pincode) {
      return Response(res, 400, "All fields are required");
    }
    if (!/^[0-9]{6}$/.test(pincode)) {
      return Response(res, 400, "Invalid pincode");
    }
    // check user
    const user = await User.findById(userId).select("addresses role");
    if (!user || user.role !== "user") {
      return Response(res, 401, "Unauthorized");
    }
    if (user.addresses.length >= 5) {
      return Response(res, 400, "Max 5 addresses allowed");
    }
    // push address
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          addresses: {
            label: label.toLowerCase().trim(),
            address: address.trim().toLowerCase(),
            city: city.trim().toLowerCase(),
            pincode: pincode.trim(),
          },
        },
      },
      { new: true, runValidators: true },
    );
    return Response(res, 200, "Address added successfully", {addresses: updatedUser.addresses});
  } catch (error) {
    console.error("failed to add new address", error);
    return Response(res, 500, "Internal server error");
  }
};
// update address
const UpdateAddress = async (req, res) => {
  try {
    const userId = req.user;
    const { addressId, label, address, pincode, city } = req.body;
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
      (addr) => addr._id.toString() === addressId
    );
    if (addressIndex === -1) {
      return Response(res, 404, "Address not found");
    }
    // update only provided fields (partial update)
    if (label) user.addresses[addressIndex].label = label.toLowerCase().trim();
    if (address) user.addresses[addressIndex].address = address.trim();
    if (city) user.addresses[addressIndex].city = city.trim();
    if (pincode) user.addresses[addressIndex].pincode = pincode.trim();
    await user.save();
    return Response(res, 200, "Address updated successfully",{addresses: user.addresses});
  } catch (error) {
    console.error("failed to update address",error) 
    return Response(res,500,"Internal server error")
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
      (addr) => addr._id.toString() === addressId
    );
    if (!addressExists) {
      return Response(res, 404, "Address not found");
    }
    // remove address
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );
    return Response(res, 200, "Address deleted successfully", {
      addresses: updatedUser.addresses,
    });
  } catch (error) {
    console.error("failed to delete address", error);
    return Response(res, 500, "Internal server error");
  }
};

module.exports = { UpdateUserProfile, AddnewAddress,UpdateAddress,GetUserAddresses,DeleteAddress};
