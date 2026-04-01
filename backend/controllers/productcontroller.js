const Product = require("../models/productmodel");
const Vendor = require("../models/vendormodel");
const Response = require("../utils/responsehandler");
const { uploadToImageKit, deleteFromImageKit } = require("../utils/upload");
const {
  safeParse,
  AddProductPriceOptionsValidation,
} = require("../utils/validations");

// Add product
const Addproduct = async (req, res) => {
  try {
    const userId = req.user;
    const { productName, description, category, priceOptions } = req.body;
    const files = req?.files || [];
    // allowed fields
    const allowedFields = ["productName", "description", "category"];
    for (let field of allowedFields) {
      if (!req.body[field]) {
        return Response(res, 400, `${field} is Required`);
      }
    }
    // check vendor exists or not
    const vendorexists = await Vendor.findById(userId);
    if (!vendorexists) {
      return Response(res, 401, "Vendor not found");
    }
    if (vendorexists.role !== "vendor") {
      return Response(res, 401, "You are not authorized to access this route");
    }
    // allow only approved vendors
    if (vendorexists.kycStatus !== "approved") {
      return Response(
        res,
        401,
        "You are not authorized to add Product please Complete kyc",
      );
    }
    //  Safe parsing (handles string → object conversion)
    const parsedPriceoptions = safeParse(priceOptions);
    // price validation
    const validatePrice = AddProductPriceOptionsValidation(parsedPriceoptions);
    if (validatePrice) {
      return Response(res, 400, validatePrice);
    }
    // product images validation
    if (files.length === 0) {
      return Response(res, 400, "At least 1 image required");
    }
    if (files.length > 5) {
      return Response(res, 400, "Max 5 images allowed");
    }
    // updload images to imagekit
    let uploadedFiles = [];
    let imagesUrl = [];
    for (let file of files) {
      try {
        const uploaded = await uploadToImageKit(
          file,
          "/milzo/vendor/products/images",
        );
        uploadedFiles.push(uploaded);
        imagesUrl.push(uploaded.url);
      } catch (error) {
        console.error("Upload failed:", error);
        // Cleanup already uploaded files
        if (uploadedFiles.length > 0) {
          await deleteFromImageKit(uploadedFiles);
        }
        return Response(res, 500, "Upload failed, please try again");
      }
    }
    // check product already exists
    const existingProduct = await Product.findOne({
      vendorId: userId,
      productName: productName.toLowerCase(),
    });

    if (existingProduct) {
      return Response(res, 400, "Product already exists");
    }
    // save product
    const product = await Product.create({
      vendorId: vendorexists._id,
      productName,
      description,
      category,
      priceOptions: parsedPriceoptions,
      images: imagesUrl,
    });
    return Response(res, 201, "Product Added Successfully", { product });
  } catch (error) {
    console.error("failed to add Product", error);
    return Response(res, 500, "Internal server error");
  }
};
// get vendor all products
const VendorAllProducts = async (req, res) => {
  try {
    const userId = req.user;
    let { page = 1, limit = 6, category } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    // check vendor exists or not
    const vendorExists = await Vendor.findById(userId);
    if (!vendorExists) {
      return Response(res, 401, "Vendor not found");
    }
    if (vendorExists.role !== "vendor") {
      return Response(res, 400, "You are not authorized to access this route");
    }
    let filter = {vendorId:vendorExists._id};
    // category filter
    if (category) {
      filter.category = category;
    }
    const products = await Product.find(filter).sort({createdAt:1}).skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments(filter)
    const totalPages = Math.ceil(totalProducts / limit) 
    if(products.length === 0){
        return Response(res,200,"No products found")
    }
    return Response(res,200,"Products found",{products,pagination:{
        totalProducts,
        totalPages,
        currentPage:page,
        limit
    }})
  } catch (error) {
    console.error("failed to fetch vendor products", error);
    return Response(res, 500, "Internal server error");
  }
};
// update products details 


module.exports = { Addproduct,VendorAllProducts};
