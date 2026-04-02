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
    // upload images to imagekit
    let uploadedFiles = [];
    for (let file of files) {
      try {
        const uploaded = await uploadToImageKit(
          file,
          "/milzo/vendor/products/images",
        );
        uploadedFiles.push({
          url: uploaded.url,
          fileId: uploaded.fileId,
        });
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
      images: uploadedFiles,
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
    let filter = { vendorId: vendorExists._id };
    // category filter
    if (category) {
      filter.category = category;
    }
    const products = await Product.find(filter)
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    if (products.length === 0) {
      return Response(res, 200, "No products found");
    }
    return Response(res, 200, "Products found", {
      products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("failed to fetch vendor products", error);
    return Response(res, 500, "Internal server error");
  }
};
// update products details
const UpdateProductDetails = async (req, res) => {
  try {
    const userId = req.user;
    const productId = req.params.id;
    const { productName, description, category, priceOptions, existingImages } =
      req.body;
    const files = req?.files || [];
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
        "You are not authorized to update Product please Complete kyc",
      );
    }
    // check product belongs to this vendor
    const product = await Product.findOne({
      _id: productId,
      vendorId: vendorexists._id,
    });
    if (!product) {
      return Response(res, 400, "Product not found and unauthorized");
    }
    //Safe parsing
    const parsedPriceoptions = priceOptions ? safeParse(priceOptions) : null;
    if (parsedPriceoptions) {
      // price validation
      const validatePrice =
        AddProductPriceOptionsValidation(parsedPriceoptions);
      if (validatePrice) {
        return Response(res, 400, validatePrice);
      }
    }
    // product images validation
    if (files.length > 5) {
      return Response(res, 400, "Max 5 images allowed");
    }
    //  prepare update object
    let updateData = {};
    if (productName) updateData.productName = productName;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (priceOptions) updateData.priceOptions = parsedPriceoptions;
    // upload new images to ImageKit
    let newUploadedImages = [];
    if (files.length > 0) {
      for (let file of files) {
        try {
          const uploaded = await uploadToImageKit(
            file,
            "/milzo/vendor/products/images",
          );
          // store full object (url + fileId)
          newUploadedImages.push({
            url: uploaded.url,
            fileId: uploaded.fileId,
          });
        } catch (error) {
          console.error("Upload failed:", error);
          // rollback delete already uploaded images
          if (newUploadedImages.length > 0) {
            await deleteFromImageKit(newUploadedImages);
          }
          return Response(res, 500, "Upload failed, please try again");
        }
      }
    }
    //  old images from DB
    const oldImages = product.images || [];
    /* 
            existingImages (from frontend):
            - array of image URLs
            - represents FINAL state of images after edit
            - i.e. which images user wants to KEEP
            Example:
            DB: [A, B, C]
            existingImages: [A, C]
            => keep: A, C
            => remove: B
            */
    let parsedExistingImages = [];
    //  parse existing images sent from frontend
    if (existingImages) {
      try {
        parsedExistingImages = JSON.parse(existingImages);
      } catch (err) {
        return Response(res, 400, "Invalid existing images format");
      }
    } else {
    //  if not provided: assume user didn't modify images => keep all existing images
     parsedExistingImages = oldImages.map((img) => img.url); 
    }
    // total images after update
    const totalImagesCount = parsedExistingImages.length + files.length;
    // validation
    if (totalImagesCount > 5) {
      return Response(res, 400, "Max 5 images allowed");
    }
    /* find images removed by user  (images in DB but NOT in existingImages => removed) */
    const removedImages = oldImages.filter(
      (img) => !parsedExistingImages.includes(img.url),
    );
    // update images (merge old + new)  keep selected old images  append newly uploaded images
    if (existingImages !== undefined || files.length > 0) {
      updateData.images = [
        // keep only images that user still wants
        ...oldImages.filter((img) => parsedExistingImages.includes(img.url)),
        ...newUploadedImages, //  // add newly uploaded images
      ];
    }
    // update to db
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true },
    );
    // delete removed images from imagekit
    const validRemovedImages = removedImages.filter((img) => img.fileId);
    if (validRemovedImages.length > 0) {
      try {
        await deleteFromImageKit(validRemovedImages);
      } catch (err) {
        console.error("Failed to delete old images", err);
      }
    }
    return Response(res, 200, "Product updated successfully", {
      updatedProduct,
    });
  } catch (error) {
    console.error("failed to update the product details", error);
    return Response(res, 500, "Internal server error");
  }
};
// Delete Product
const DeleteProduct = async (req, res) => {
  try {
    const userId = req.user;
    const productId = req.params.id;
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
        "You are not authorized to update Product please Complete kyc",
      );
    }
    // check product belongs to this vendor
    const product = await Product.findOne({
      _id: productId,
      vendorId: vendorexists._id,
    });
    if (!product) {
      return Response(res, 400, "Product not found and unauthorized");
    }
    // delete images from ImageKit
    const images = product.images || [];
    const validImages = images.filter((img) => img.fileId);
    // console.log("Valid images:", validImages);
    if (validImages.length > 0) {
      try {
        await deleteFromImageKit(validImages);
      } catch (err) {
        console.error("Failed to delete product images", err);
      }
    }
    await Product.findByIdAndDelete(productId);
    return Response(res, 200, "Product deleted Successfully");
  } catch (error) {
    console.error("failed to delete product", error);
    return Response(res, 500, "Internal server error");
  }
};
// update product status

module.exports = {
  Addproduct,
  VendorAllProducts,
  UpdateProductDetails,
  DeleteProduct,
};
