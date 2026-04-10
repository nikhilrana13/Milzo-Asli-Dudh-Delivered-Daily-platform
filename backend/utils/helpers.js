const Campaign = require("../models/campaignmodel");
const { uploadToImageKit } = require("./upload");

// helper: upload multiple files
const uploadFiles = async (files, folder, uploadedFiles) => {
  const results = [];
  for (let file of files) {
    const uploaded = await uploadToImageKit(file, folder);
    uploadedFiles.push(uploaded);
    results.push({
      url: uploaded.url,
      fileId: uploaded.fileId,
    });
  }
  return results;
};
// helper: parse existing media
const parseExisting = (existing, oldMedia) => {
  if (!existing) {
    return oldMedia.map((m) => m.url);
  }
  return JSON.parse(existing);
};
// helper: build final media
const buildMedia = (oldMedia, existingUrls, newMedia) => {
  return [
    ...oldMedia.filter((m) => existingUrls.includes(m.url)),
    ...newMedia,
  ];
};

const calculateOffer = async ({
  userId,
  campaignId,
  totalAmount,
}) => {
  let finalAmount = totalAmount;
  let discountAmount = 0;
  let appliedCampaign = null;

  if (!campaignId) {
    return { finalAmount, discountAmount, appliedCampaign };
  }
  const campaign = await Campaign.findById(campaignId);

  if (!campaign || !campaign.isActive) {
    throw new Error("Invalid or inactive offer");
  }
  const now = new Date();
  if (now < campaign.startDate || now > campaign.endDate) {
    throw new Error("Offer expired or not started");
  }
  // min order
  if (campaign.minOrderAmount && totalAmount < campaign.minOrderAmount) {
    throw new Error("Minimum order amount not met");
  }
  // first subscription
  if (campaign.applicableFor === "first_subscription") {
    const existingSub = await Subscription.findOne({
      userId,
      status: { $in: ["active", "paused"] },
    });
    if (existingSub) {
      throw new Error("Offer valid only for first subscription");
    }
  }
  let discount = 0;
  if (campaign.discountType === "percentage") {
    discount = (totalAmount * campaign.discountValue) / 100;
    if (campaign.maxDiscount) {
      discount = Math.min(discount, campaign.maxDiscount);
    }
  } else {
    discount = campaign.discountValue;
  }
  discountAmount = Math.round(discount);
  finalAmount = Math.max(0, Math.round(totalAmount - discount));
  appliedCampaign = campaign._id;

  return {
    finalAmount,
    discountAmount,
    appliedCampaign,
    campaign,
  };
};

module.exports = calculateOffer;

module.exports = {uploadFiles,parseExisting,buildMedia}