const Admin = require("../models/adminmodel");
const Vendor = require("../models/vendormodel");
const Response = require("../utils/responsehandler");

// get all vendors list
const GetAllVendors = async (req, res) => {
  try {
    const userId = req.user;
    let { page = 1, limit = 5, kycStatus } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    const allowedStatus = ["approved", "rejected", "pending", "not_submitted"];
    if (kycStatus && !allowedStatus.includes(kycStatus)) {
      return Response(res, 400, "Invalid kyc status value");
    }
    let query = {};
    if (kycStatus) {
      query.kycStatus = kycStatus;
    }
    // check admin exists or not
    const adminExists = await Admin.findById(userId);
    if (!adminExists) {
      return Response(res, 401, "Admin not found");
    }
    if (adminExists.role !== "admin") {
      return Response(res, 400, "You are not authorized to access this route");
    }
    const vendors = await Vendor.find(query)
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .select(
        "kycDetails username email profilePic location city pincode displayName contactnumbers kycStatus milkLabTestImg isKycApproved isActive",
      );
    const totalVendors = await Vendor.countDocuments(query);
    const totalPages = Math.ceil(totalVendors / limit);

    if (vendors.length === 0) {
      return Response(res, 200, "No Vendors found", []);
    }
    return Response(res, 200, "All Vendors List", {
      vendors,
      pagination: {
        totalPages,
        currentPage: page,
        totalVendors,
        limit,
      },
    });
  } catch (error) {
    console.error("failed to get All vendors list", error);
    return Response(res, 500, "Internal server error");
  }
};
// approve or reject vendor kyc 
const ApproveAndRejectVendor = async (req, res) => {
  try {
    const adminId = req.user;
    const { vendorId, status, rejectedReason } = req.body;
    if (!vendorId || !status) {
      return Response(res, 400, "vendor ID and status are required");
    }
    if (!["approved", "rejected"].includes(status)) {
      return Response(res,400,"Status must be either 'approved' or 'rejected'");
    }
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return Response(res, 404, "Admin not found");
    }
    if (admin.role !== "admin") {
      return Response(res, 403, "Access denied Admin only");
    }
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return Response(res, 404, "Vendor not found");
    }
    if (vendor.kycStatus !== "pending") {
      return Response(res, 400, "This vendor has already been processed");
    }
    // handle status approvel
    if (status === "approved") {
      vendor.isActive = true;
      vendor.kycStatus = "approved";
      vendor.isKycApproved = true;
      vendor.rejectedReason = ""
    }
    if (status === "rejected") {
      if (!rejectedReason) {
        return Response(res, 400, "Rejected reason is required");
      }
      vendor.isActive = false;
      vendor.kycStatus = "rejected";
      vendor.isKycApproved = false;
      vendor.rejectedReason = rejectedReason;
    }
    await vendor.save();
    const updatedStatus = status;
    return Response(res, 200, `Vendor Kyc ${status} successfully`, {
      vendorId,
      updatedStatus,
    });
  } catch (error) {
    console.error("failed to approve or reject vendor", error);
    return Response(res, 500, "Internal server error");
  }
};




module.exports = { GetAllVendors,ApproveAndRejectVendor};
