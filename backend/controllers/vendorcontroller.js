const VendorMapper = require("../mappers/vendormapper");
const Vendor = require("../models/vendormodel");
const Product = require("../models/productmodel");
const { getCoordinates } = require("../utils/geolocations");
const { uploadFiles, parseExisting, buildMedia } = require("../utils/helpers");
const Response = require("../utils/responsehandler");
const { uploadToImageKit, deleteFromImageKit } = require("../utils/upload");
const {
  safeParse,
  validateContacts,
  validateDeliveryTimings,
  validateKycDetails,
} = require("../utils/validations");
const Subscription = require("../models/subscriptionmodel");
const mongoose = require("mongoose");
const Booking = require("../models/bookingmodel");

// apply kyc
const ApplyKyc = async (req, res) => {
  try {
    const userId = req.user;
    let {
      displayName,
      city,
      pincode,
      kycDetails,
      description,
      deliveryTimings,
      contactnumbers,
    } = req.body;
    console.log("req.body",req.body)
    // Extract uploaded files with safe fallback
    const dairyImages = req.files?.images || [];
    const dairyVideos = req.files?.videos || [];
    const aadharImages = req.files?.aadharImages || [];
    const milkLabTestImg = req.files?.milkLabTestImg?.[0];

    // check vendor exists or not
    const vendorexists = await Vendor.findById(userId);
    if (!vendorexists) {
      return Response(res, 404, "Vendor not found");
    }
    if (vendorexists.role !== "vendor") {
      return Response(res, 401, "You are not authorized to access this route");
    }
    // prevents reapply kyc when vendor kycstatus already pending or approved only allow to not_submitted or rejected kycstatus
    if (["pending", "approved"].includes(vendorexists.kycStatus)) {
      return Response(res, 400, `KYC already ${vendorexists.kycStatus}`);
    }
    // Required basic fields validation
    const allowedFields = ["displayName", "city", "pincode"];
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
          return {
            url: uploaded.url,
            fileId: uploaded.fileId,
          };
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
          return {
            url: uploaded.url,
            fileId: uploaded.fileId,
          };
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
      const coords = await getCoordinates(city, pincode);
      if (!coords || !coords.lat || !coords.lng) {
        return Response(res, 400, "Unable to fetch location coordinates");
      }
      //  Save updated vendor data in DB
      const vendor = await Vendor.findByIdAndUpdate(
        userId,
        {
          displayName,
          location: {
            type: "Point",
            coordinates: [coords.lng, coords.lat],
          },
          city,
          description,
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
      city,
      pincode,
      description,
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
      return Response(res, 404, "Vendor not found");
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
    if (email) {
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
    // geo update only when needed
    let coords = null;
    if (city && pincode) {
      coords = await getCoordinates(city, pincode);
      // console.log(coords)
      if (!coords || !coords.lat || !coords.lng) {
        return Response(res, 400, "Unable to fetch location coordinates");
      }
      updateData.location = {
        type: "Point",
        coordinates: [coords.lng, coords.lat],
      };
    }
    if (displayName) updateData.displayName = displayName;
    if (city) updateData.city = city;
    if (pincode) updateData.pincode = pincode;
    if (description) updateData.description = description;
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
    return Response(res, 200, "Vendor updated", {
      user: VendorMapper(updatedVendor),
    });
  } catch (error) {
    console.error("failed to update vendor profile", error);
    return Response(res, 500, "Internal server error");
  }
};
// find nearby vendors based on user selected location
const FindVendors = async (req, res) => {
  try {
    let { lat, lng, page = 1, limit = 10, toprated, maxDistance } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    if (lat === undefined || lng === undefined || isNaN(lat) || isNaN(lng)) {
      return Response(res, 400, "User location is required");
    }
    let query = { isActive: true, kycStatus: "approved" };
    // top rated filter
    if (toprated === "true") {
      query.rating = { $gte: 4 };
    }
    const distanceInKm = maxDistance ? parseFloat(maxDistance) : 15; // default 15km
    // Use aggregation with $geoNear for geospatial query
    const pipeline = [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          distanceField: "distance",
          distanceMultiplier: 0.001, // meters -> km
          maxDistance: distanceInKm * 1000, // default 15 km
          query: query,
          spherical: true,
        },
      },
      { $sort: { distance: 1, rating: -1 } }, // show nearest vendor first same distance => high rating first
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          displayName: 1,
          rating: 1,
          totalReviews: 1,
          city: 1,
          pincode: 1,
          dairyVideos: 1,
          distance: { $round: ["$distance", 2] },
          dairyImages: 1,
          city: 1,
        },
      },
    ];
    const vendors = await Vendor.aggregate(pipeline);
    // For total count, use aggregation
    const countPipeline = [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          distanceField: "distance",
          distanceMultiplier: 0.001, // meters -> km
          maxDistance: distanceInKm * 1000, // default 15 km
          query: query,
          spherical: true,
        },
      },
      { $count: "total" },
    ];
    const countResult = await Vendor.aggregate(countPipeline);
    const totalVendors = countResult[0]?.total || 0;
    const totalPages = Math.ceil(totalVendors / limit);
    if (vendors.length === 0) {
      return Response(res, 200, "No Vendors found Please change location", []);
    }
    return Response(res, 200, "Vendors found", {
      vendors,
      pagination: {
        totalPages,
        currentPage: page,
        totalVendors,
        limit,
      },
    });
  } catch (error) {
    console.error("failed to find vendors", error);
    return Response(res, 500, "Internal server error");
  }
};
// find vendor all products
const FetchVendorAllproducts = async (req, res) => {
  try {
    let { page = 1, limit = 5, category, vendorId } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    if (!vendorId) {
      return Response(res, 400, "VendorId is required");
    }
    // check vendor exists or not
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return Response(res, 404, "Vendor not found");
    }
    // Build query
    let query = { vendorId };
    if (category) {
      query.category = category;
    }
    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);
    if (products.length === 0) {
      return Response(res, 200, "No Products found", []);
    }
    return Response(res, 200, "Products fetched successfully", {
      products,
      pagination: {
        totalPages,
        currentPage: page,
        totalProducts,
        limit,
      },
    });
  } catch (error) {
    console.error("Failed to fetch vendor products", error);
    return Response(res, 500, "Internal server error");
  }
};
// find vendor details
const FetchVendorDetails = async (req, res) => {
  try {
    const vendorId = req.params.id;
    if (!vendorId) {
      return Response(res, 400, "VendorId is Required");
    }
    // check vendor exists or not
    const vendor = await Vendor.findById(vendorId).select(
      "displayName rating totalReviews description kycStatus dairyImages dairyVideos",
    );
    if (!vendor) {
      return Response(res, 404, "Vendor not found");
    }
    return Response(res, 200, { vendorDetails: vendor });
  } catch (error) {
    console.error("failed to fetch vendor details", error);
    return Response(res, 500, "Internal server error");
  }
};
// vendor dashboard stats
const VendorDashboardStats = async (req, res) => {
  try {
    const vendorId = req.user;
    // check vendor exists or not
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return Response(res, 404, "Vendor not found");
    }
    if (vendor.role !== "vendor") {
      return Response(res, 401, "You are not authorized to access this route");
    }
    const vendorObjectId = new mongoose.Types.ObjectId(vendorId);
    const startOfMonth = new Date(new Date().toISOString().slice(0, 7) + "-01");

    const [totalCustomersAgg, activeSubs, monthlyRevenue, pendingBookings] =
      await Promise.all([
        // total customers
        Subscription.aggregate([
          { $match: { vendorId: vendorObjectId } },
          { $group: { _id: "$userId" } },
          { $count: "totalCustomers" },
        ]),
        // active subs
        Subscription.countDocuments({
          vendorId: vendorObjectId,
          status: "active",
        }),
        // monthly revenue
        Subscription.aggregate([
          {
            $match: {
              vendorId: vendorObjectId,
              paymentStatus: "paid",
              createdAt: { $gte: startOfMonth },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$totalAmount" },
            },
          },
        ]),
        // pending bookings
        Subscription.countDocuments({
          vendorId: vendorObjectId,
          bookingStatus: "pending",
        }),
      ]);
    return Response(res, 200, "Dashboard stats", {
      stats: {
        totalCustomers: totalCustomersAgg[0]?.totalCustomers || 0,
        activeSubscriptions: activeSubs,
        monthlyRevenue: monthlyRevenue[0]?.total || 0,
        pendingBookings,
      },
    });
  } catch (error) {
    console.log("Failed to get dashboard stats", error);
    return Response(res, 500, "Internal server error");
  }
};
// revenue overview
const VendorRevenueOverview = async (req, res) => {
  try {
    const vendorId = req.user;
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return Response(res, 404, "Vendor not found");
    }
    const vendorObjectId = new mongoose.Types.ObjectId(vendorId);
    const range = parseInt(req.query.range) || 12;
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - range);

    const monthlyRevenue = await Subscription.aggregate([
      {
        $match: {
          vendorId: vendorObjectId,
          paymentStatus: "paid",
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const monthNames = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthsMap = {};
    monthlyRevenue.forEach((item) => {
      const name = monthNames[item._id.month];
      monthsMap[name] = item.revenue;
    });
    const finalRevenue = [];
    const now = new Date();
    for (let i = range - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const name = monthNames[d.getMonth() + 1];

      finalRevenue.push({
        month: name,
        revenue: monthsMap[name] || 0,
      });
    }
    const currentMonth = finalRevenue.at(-1)?.revenue || 0;
    const lastMonth = finalRevenue.at(-2)?.revenue || 0;
    let growth = 0;
    if (lastMonth > 0) {
      growth = ((currentMonth - lastMonth) / lastMonth) * 100;
    } else if (currentMonth > 0) {
      growth = 100;
    }
    return Response(res, 200, "Revenue analytics fetched", {
      monthlyRevenue: finalRevenue,
      growth: Number(growth.toFixed(1)),
    });
  } catch (error) {
    console.error("Revenue analytics error", error);
    return Response(res, 500, "Internal server error");
  }
};
// subscriptions stats
const VendorSubscriptionStats = async (req, res) => {
  try {
    const vendorId = req.user;
    // check vendor exists or not
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return Response(res, 404, "Vendor not found");
    }
    if (vendor.role !== "vendor") {
      return Response(res, 401, "You are not authorized to access this route");
    }
    const vendorObjectId = new mongoose.Types.ObjectId(vendorId);
    const [
      totalSubs,
      activeSubs,
      cancelledSubs,
      completedSubs,
      pausedSubs,
      pendingBookings,
    ] = await Promise.all([
      // total subs
      Subscription.countDocuments({
        vendorId: vendorObjectId,
      }),
      // active subs
      Subscription.countDocuments({
        vendorId: vendorObjectId,
        status: "active",
      }),
      // cancelled
      Subscription.countDocuments({
        vendorId: vendorObjectId,
        status: "cancelled",
      }),
      // completed
      Subscription.countDocuments({
        vendorId: vendorObjectId,
        status: "completed",
      }),
      // paused
      Subscription.countDocuments({
        vendorId: vendorObjectId,
        status: "paused",
      }),
      // pending Subs
      Subscription.countDocuments({
        vendorId: vendorObjectId,
        bookingStatus: "pending",
      }),
    ]);
    return Response(res, 200, "Vendor Subscription stats", {
    stats:{
      totalSubs: totalSubs || 0,
      activeSubs: activeSubs || 0,
      cancelledSubs: cancelledSubs || 0,
      completedSubs: completedSubs || 0,
      pausedSubs: pausedSubs || 0,
      pendingBookings: pendingBookings || 0,
    }
    });
  } catch (error) {
    console.log("Failed to get vendor subscription stats", error);
    return Response(res, 500, "Internal server error");
  }
};
// Booking status
const VendorBookingStats = async (req, res) => {
  try {
    const vendorId = req.user;
    // check vendor exists or not
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return Response(res, 404, "Vendor not found");
    }
    if (vendor.role !== "vendor") {
      return Response(res, 401, "You are not authorized to access this route");
    }
    const vendorObjectId = new mongoose.Types.ObjectId(vendorId);
    const [totalBookings, paidBookings, failedBookings, pendingBookings] =
      await Promise.all([
        // total Booking
        Booking.countDocuments({
          vendorId: vendorObjectId,
        }),
        // paid booking
        Booking.countDocuments({
          vendorId: vendorObjectId,
          status: "paid",
        }),
        // cancelled
        Booking.countDocuments({
          vendorId: vendorObjectId,
          status: "failed",
        }),
        // pending
        Booking.countDocuments({
          vendorId: vendorObjectId,
          status: "pending",
        }),
      ]);
    return Response(res, 200, "Vendor Booking stats", {
      totalBookings: totalBookings || 0,
      paidBookings: paidBookings || 0,
      failedBookings: failedBookings || 0,
      pendingBookings: pendingBookings || 0,
    });
  } catch (error) {
    console.log("Failed to get vendor booking stats", error);
    return Response(res, 500, "Internal server error");
  }
};

module.exports = {
  ApplyKyc,
  UpdateVendorProfile,
  FindVendors,
  FetchVendorAllproducts,
  FetchVendorDetails,
  VendorDashboardStats,
  VendorRevenueOverview,
  VendorSubscriptionStats,
  VendorBookingStats,
};
