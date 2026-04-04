const VendorMapper = require("../mappers/vendormapper");
const Vendor = require("../models/vendormodel");
const { uploadFiles, parseExisting, buildMedia } = require("../utils/helpers");
const Response = require("../utils/responsehandler");
const { uploadToImageKit, deleteFromImageKit } = require("../utils/upload");
const {safeParse,validateContacts,validateDeliveryTimings,validateKycDetails} = require("../utils/validations");

// apply kyc
const ApplyKyc = async (req, res) => {
  try {
    const userId = req.user;
    let {
      displayName,
      location,
      city,
      pincode,
      kycDetails,
      deliveryTimings,
      contactnumbers,
    } = req.body;
    // console.log("req.body",req.body)
    // Extract uploaded files with safe fallback
    const dairyImages = req.files?.images || [];
    const dairyVideos = req.files?.videos || [];
    const aadharImages = req.files?.aadharImages || [];
    const milkLabTestImg = req.files?.milkLabTestImg?.[0];

    // check vendor exists or not
    const vendorexists = await Vendor.findById(userId);
    if (!vendorexists) {
      return Response(res, 401, "Vendor not found");
    }
    if (vendorexists.role !== "vendor") {
      return Response(res, 401, "You are not authorized to access this route");
    }
    // prevents reapply kyc when vendor kycstatus already pending or approved only allow to not_submitted or rejected kycstatus
    if (["pending", "approved"].includes(vendorexists.kycStatus)) {
      return Response(res, 400, `KYC already ${vendorexists.kycStatus}`);
    }
    // Required basic fields validation
    const allowedFields = ["displayName", "location", "city", "pincode"];
    for (let field of allowedFields) {
      if (!req.body[field]) {
        return Response(res, 400, `${field} is Required`);
      }
    }
    //  Safe parsing (handles string → object conversion)
    const parsedContacts = safeParse(contactnumbers);
    const parsedTimings = safeParse(deliveryTimings);
    const parsedKyc = safeParse(kycDetails);

    //Validate contact numbers
    const contactError = validateContacts(parsedContacts);
    if (contactError) {
      return Response(res, 400, contactError);
    }
    // Validate delivery timings
    const TimingError = validateDeliveryTimings(parsedTimings);
    if (TimingError) {
      return Response(res, 400, TimingError);
    }
    //  Validate KYC details (aadhaar, bank, IFSC)
    const kycError = validateKycDetails(parsedKyc);
    if (kycError) {
      return Response(res, 400, kycError);
    }
    // check kyc details already exists or not
    const existingKyc = await Vendor.findOne({
      $or: [
        { "kycDetails.aadharNumber": parsedKyc.aadharNumber },
        { "kycDetails.bankAccountNumber": parsedKyc.bankAccountNumber },
      ],
    });
    if (existingKyc && existingKyc._id.toString() !== userId) {
      return Response(
        res,
        400,
        "KYC details match with already used by another vendor",
      );
    }
    // Dairy images validation
    if (dairyImages.length === 0) {
      return Response(res, 400, "At least 1 image required");
    }
    if (dairyImages.length > 5) {
      return Response(res, 400, "Max 5 images allowed");
    }
    // Aadhar images validation
    if (aadharImages.length === 0) {
      return Response(res, 400, "Aadhaar images required");
    }
    if (aadharImages.length > 2) {
      return Response(res, 400, "Max 2 Aadhaar images allowed");
    }
    // Milk Lab Test image validation
    if (!milkLabTestImg) {
      return Response(res, 400, "Milk Lab test image is Required");
    }
    // Video validation
    if (dairyVideos.length > 2) {
      return Response(res, 400, "Max 2 videos allowed");
    }
    //  Store uploaded files  for rollback (cleanup if error occurs)
    let uploadedFiles = [];
    try {
      // Images
      const imageUrls = await Promise.all(
        dairyImages.map(async (file) => {
          const uploaded = await uploadToImageKit(
            file,
            "/milzo/vendors/images",
          );
          // store full object (url + fileId)
          uploadedFiles.push({
            url: uploaded.url,
            fileId: uploaded.fileId,
          });
        }),
      );
      // Videos
      const videoUrls = await Promise.all(
        dairyVideos.map(async (file) => {
          const uploaded = await uploadToImageKit(
            file,
            "/milzo/vendors/videos",
          );
          uploadedFiles.push({
            url: uploaded.url,
            fileId: uploaded.fileId,
          });
        }),
      );
      // Aadhaar Images
      const uploadedAadharImages = await Promise.all(
        aadharImages.map(async (file) => {
          const uploaded = await uploadToImageKit(file, "/milzo/vendors/kyc");
          uploadedFiles.push(uploaded);
          return uploaded.url;
        }),
      );
      // Milk Lab Test
      const uploaded = await uploadToImageKit(
        milkLabTestImg,
        "/milzo/vendors/lab",
      );
      let milkLabTestImgUrl = uploaded.url;
      uploadedFiles.push(uploaded);
      //  Save updated vendor data in DB
      const vendor = await Vendor.findByIdAndUpdate(
        userId,
        {
          displayName,
          location,
          city,
          pincode,
          kycDetails: { ...parsedKyc, aadharImages: uploadedAadharImages },
          deliveryTimings: parsedTimings,
          contactnumbers: parsedContacts,
          milkLabTestImg: milkLabTestImgUrl,
          dairyImages: imageUrls,
          dairyVideos: videoUrls,
          isActive: false,
          kycStatus: "pending",
          rejectedReason: "",
          isKycApproved: false,
        },
        { new: true },
      );
      return Response(
        res,
        200,
        "Kyc Submitted Wait for 48 hours to be apporved",
      );
    } catch (error) {
      console.error("Upload failed:", error);
      // Cleanup already uploaded files
      if (uploadedFiles.length > 0) {
        await deleteFromImageKit(uploadedFiles);
      }
      return Response(res, 500, "Upload failed, please try again");
    }
  } catch (error) {
    console.error("failed to submit kyc", error);
    return Response(res, 500, "Internal server error");
  }
};
// update vendor profile
const UpdateVendorProfile = async (req, res) => {
  try {
    const userId = req.user;
    const {
      username,
      email,
      displayName,
      location,
      city,
      pincode,
      contactnumbers,
      deliveryTimings,
      existingImages,
      existingVideos,
    } = req.body;
    const dairyImages = req.files?.images || [];
    const dairyVideos = req.files?.videos || [];
    const profilePic = req.files?.profilePic?.[0];
    // console.log("all files:", Object.keys(req.files || {}))
    // check vendor exists or not
    const vendor = await Vendor.findById(userId);
    if (!vendor) {
      return Response(res, 401, "Vendor not found");
    }
    if (vendor.role !== "vendor") {
      return Response(res, 401, "You are not authorized to access this route");
    }
    //  Safe parsing (handles string → object conversion)
    const parsedContacts = contactnumbers ? safeParse(contactnumbers) : null;
    const parsedTimings = deliveryTimings ? safeParse(deliveryTimings) : null;
  
    let uploadedFiles = [];
    // upload profile pic
    let profilePicUrl = vendor.profilePic?.url || null; // Keep existing if not uploading
    let profilePicFileId = vendor.profilePic?.fileId || null;
    if (profilePic) {
      // Delete old profilePic from ImageKit if it exists
      if (profilePicFileId) {
        try {
          await deleteFromImageKit([{ fileId: profilePicFileId }]);
          console.log("Old profilePic deleted from ImageKit");
        } catch (err) {
          console.error("Failed to delete old profilePic:", err);
        }
      }
      // Upload new profilePic
      const uploaded = await uploadToImageKit(
        profilePic,
        "/milzo/vendors/profileimages",
      );
      uploadedFiles.push(uploaded);
      profilePicUrl = uploaded.url;
      profilePicFileId = uploaded.fileId;
    }
    // upload images & videos
    let newImages = [];
    let newVideos = [];
    try {
      newImages = await uploadFiles(
        dairyImages,
        "/milzo/vendors/images",
        uploadedFiles,
      );
      newVideos = await uploadFiles(
        dairyVideos,
        "/milzo/vendors/videos",
        uploadedFiles,
      );
    } catch (error) {
      if (uploadedFiles.length > 0) {
        await deleteFromImageKit(uploadedFiles);
      }
      return Response(res, 500, "Upload failed");
    }
    // old media
    const oldImages = vendor.dairyImages || [];
    const oldVideos = vendor.dairyVideos || [];
    // parse existing
    const existingImageUrls = parseExisting(existingImages, oldImages);
    const existingVideoUrls = parseExisting(existingVideos, oldVideos);
    // validations
    if (existingImageUrls.length + newImages.length > 5) {
      return Response(res, 400, "Max 5 images allowed");
    }
    if (existingVideoUrls.length + newVideos.length > 2) {
      return Response(res, 400, "Max 2 videos allowed");
    }
    // find removed
    const removedImages = oldImages.filter(
      (img) => !existingImageUrls.includes(img.url),
    );
    const removedVideos = oldVideos.filter(
      (vid) => !existingVideoUrls.includes(vid.url),
    );
    // build final media
    const finalImages = buildMedia(oldImages, existingImageUrls, newImages);
    const finalVideos = buildMedia(oldVideos, existingVideoUrls, newVideos);

    let updateData = {};
    if (username) updateData.username = username;
    if (email){
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return Response(res, 400, "Invalid Email");
      }
      // Check duplicate email
      const existingEmail = await Vendor.findOne({
        email,
        _id: { $ne: vendor._id },
      });
      if (existingEmail) {
        return Response(res, 400, "Email already in use");
      }
      updateData.email = email;
    }
    if (displayName) updateData.displayName = displayName;
    if (location) updateData.location = location;
    if (city) updateData.city = city;
    if (pincode) updateData.pincode = pincode;
    if (parsedContacts) updateData.contactnumbers = parsedContacts;
    if (parsedTimings) updateData.deliveryTimings = parsedTimings;

    updateData.profilePic = { url: profilePicUrl, fileId: profilePicFileId };
    updateData.dairyImages = finalImages;
    updateData.dairyVideos = finalVideos;
    // update
    const updatedVendor = await Vendor.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true },
    );
    // cleanup removed files
    try {
      await deleteFromImageKit([
        ...removedImages.filter((i) => i.fileId),
        ...removedVideos.filter((v) => v.fileId),
      ]);
    } catch (err) {
      console.error("Cleanup failed", err);
    }
    return Response(res, 200, "Vendor updated", {user:VendorMapper(updatedVendor)});
  } catch (error) {
    console.error("failed to update vendor profile", error);
    return Response(res, 500, "Internal server error");
  }
};

module.exports = { ApplyKyc,UpdateVendorProfile};


