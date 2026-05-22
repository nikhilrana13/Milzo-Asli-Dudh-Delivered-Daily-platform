const Campaign = require("../models/campaignmodel");
const User = require("../models/usermodel");
const Response = require("../utils/responsehandler");
const { calculateOffer } = require("../utils/helpers");

// get all campaigns for user
const GetAllCampaignsForUser = async (req, res) => {
  try {
    const userId = req.user;
    //  check user exists or not
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 401, "User not found");
    }
    const campaigns = await Campaign.find({ isActive: true });
    if (campaigns.length === 0) {
      return Response(res, 200, "No campaigns", []);
    }
    return Response(res, 200, "Campaigns found", { campaigns });
  } catch (error) {
    console.log("failed to get campaigns", error);
    return Response(res, 500, "Internal server error");
  }
};

const ApplyOffer = async (req, res) => {
  try {
    const userId = req.user;
    const {
      productId,
      vendorId,
      quantity,
      pricePerDay,
      startDate,
      endDate,
      campaignId,
    } = req.body;
    // console.log("req body", req.body);
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 403, "User not found");
    }
    // basic validation
    if (
      !productId ||
      !vendorId ||
      !quantity ||
      !pricePerDay ||
      !endDate ||
      !campaignId
    ) {
      return Response(res, 400, "Missing required fields");
    }
    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(pricePerDay);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return Response(res, 400, "Invalid quantity");
    }
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return Response(res, 400, "Invalid price");
    }
    // date calculation
    const start = new Date(startDate + "T00:00:00");
    const end = new Date(endDate + "T00:00:00");

    if (end <= start) {
      return Response(res, 400, "Invalid date range");
    }

    const totalDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1,
    );

    const totalAmount = parsedPrice * parsedQuantity * totalDays;

    // apply offer
    let result;
    try {
      result = await calculateOffer({
        userId,
        campaignId,
        totalAmount,
      });
    } catch (err) {
      return Response(res, 400, err.message);
    }
    // console.log("result",result)
    return Response(res, 200, "Offer applied successfully", {
      totalAmount,
      discountAmount: result.discountAmount,
      finalAmount: result.finalAmount,
      campaign: {
        id: result.appliedCampaign,
        title: result.campaign?.title,
      },
    });
  } catch (error) {
    console.error("Apply Offer error", error);
    return Response(res, 500, "Internal server error");
  }
};

module.exports = { GetAllCampaignsForUser, ApplyOffer };
