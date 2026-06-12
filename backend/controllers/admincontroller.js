const Admin = require("../models/adminmodel");
const Campaign = require("../models/campaignmodel");
const User = require("../models/usermodel");
const Vendor = require("../models/vendormodel");
const calculateOffer = require("../utils/helpers");
const Response = require("../utils/responsehandler");

// get all vendors list
const GetAllVendors = async (req, res) => {
  try {
    const userId = req.user;
    let { page = 1, limit = 5, kycStatus } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    const allowedStatus = ["approved", "rejected", "pending"];
    if (kycStatus && !allowedStatus.includes(kycStatus)) {
      return Response(res, 400, "Invalid kyc status value");
    }
    let query = {
      kycStatus: {$ne:"not_submitted"}
    };
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
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select(
        "kycDetails username email profilePic location city pincode displayName contactnumbers kycStatus milkLabTestImg isKycApproved isActive createdAt",
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
      return Response(
        res,
        400,
        "Status must be either 'approved' or 'rejected'",
      );
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
      vendor.rejectedReason = "";
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
// create campaigns
const CreateCampaign = async (req, res) => {
  try {
    const adminId = req.user;
    let {
      title,
      discountType,
      discountValue,
      maxDiscount,
      minOrderAmount,
      applicableFor,
      startDate,
      endDate,
      isActive,
    } = req.body;
    //  validation
    const allowedFields = [
      "title",
      "discountType",
      "discountValue",
      "startDate",
      "endDate",
    ];

    for (let field of allowedFields) {
      if (!req.body[field]) {
        return Response(res, 400, `${field} is required`);
      }
    }
    //  check admin exists or not
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return Response(res, 401, "Admin not found");
    }
    if (admin.role !== "admin") {
      return Response(res, 400, "You are not authorized to create campaign");
    }
    // discountType validation
    if (!["percentage", "flat"].includes(discountType)) {
      return Response(res, 400, "Invalid discount type");
    }

    if (discountValue <= 0) {
      return Response(res, 400, "Invalid discount value");
    }

    // date validation
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return Response(res, 400, "Invalid date format");
    }

    if (end <= start) {
      return Response(res, 400, "endDate must be after startDate");
    }
    const existing = await Campaign.findOne({
      title,
      startDate,
      endDate,
    });
    if(existing){
      return Response(res, 400,"Campaign already exists")
    }
    // create campaign
    const campaign = await Campaign.create({
      adminId:admin._id,
      title,
      discountType,
      discountValue,
      maxDiscount: maxDiscount || null,
      minOrderAmount: minOrderAmount || 0,
      applicableFor: applicableFor || "all",
      startDate: start,
      endDate: end,
      isActive: isActive ?? true,
    });
    return Response(res, 200, "Campaign create successfully", {
      campaign,
    });
  } catch (error) {
    console.error("failed to create campaign", error);
    return Response(res, 500, "Internal server error");
  }
};
// get all for admin campaigns 
const GetAllCampaigns = async(req,res)=>{
  try {
    const adminId = req.user;
    //  check admin exists or not
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return Response(res, 401, "Admin not found");
    }
    if (admin.role !== "admin") {
      return Response(res, 400, "You are not authorized to access this route");
    }
    const campaigns = await Campaign.find()
    if(campaigns.length === 0){
      return  Response(res,200,"No campaigns",[])
    }
    return Response(res,200,"Campaigns found",{campaigns})
  } catch (error) {
    console.error("failed to get campaigns", error);
    return Response(res, 500, "Internal server error");
  }
}
const ToggleCampaignStatus = async (req, res) => {
  try {
    const adminId = req.user;
    const  campaignId  = req.params.id;
    const admin = await Admin.findById(adminId);
    if (!admin || admin.role !== "admin") {
      return Response(res, 403, "Forbidden");
    }
    const campaign = await Campaign.findById(campaignId);
    // console.log("campaign",campaign)
    if (!campaign) {
      return Response(res, 404, "Campaign not found");
    }
    campaign.isActive = !campaign.isActive;
    await campaign.save();
    return Response(res, 200, "Campaign status updated", {
      isActive: campaign.isActive,
    });
  } catch (error) {
    console.error("Toggle campaign error", error);
    return Response(res, 500, "Internal server error");
  }
};
// Dashboard analytics api
const AdminDashboardStatsCard = async(req,res)=>{
  try {
      const adminId = req.user 
      // check admin exists or not
      const admin = await Admin.findById(adminId)
      if(!admin){
        return Response(res,404,"Admin not found")
      }
      if(admin.role !== "admin"){
          return Response(res, 401, "You are not authorized to access this route")
      }
      const [totalVendors,pendingVendors,approvedVendors] = await Promise.all([
            //totalVendors 
            Vendor.countDocuments(),
            // pending approvals 
            Vendor.countDocuments({
              kycStatus:"pending"
            }),
            // approved Vendors 
            Vendor.countDocuments({
              kycStatus:"approved"
            })
      ])
      // find total campaigns
      const totalCampaigns = await Campaign.countDocuments()
      return Response(res,200,"Dashboard Stats Card",{
        stats:{
          totalVendors:totalVendors,
          pendingVendors:pendingVendors,
          approvedVendors:approvedVendors,
          totalCampaigns:totalCampaigns,
        }
      })
  } catch (error) {
    console.log("Failed to get admin dashboard stats", error);
    return Response(res, 500, "Internal server error");
  }
}

module.exports = { GetAllVendors, ApproveAndRejectVendor, CreateCampaign,GetAllCampaigns,ToggleCampaignStatus,AdminDashboardStatsCard};
