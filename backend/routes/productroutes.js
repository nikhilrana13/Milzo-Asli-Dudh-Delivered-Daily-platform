const express = require("express")
const router = express.Router() 
const multer = require("multer")
const AuthMiddleware = require("../middlewares/authmiddleware")
const IsVendor = require("../middlewares/isvendor")
const { Addproduct, VendorAllProducts, UpdateProductDetails, DeleteProduct } = require("../controllers/productcontroller")
const FileFilter = require("../utils/multervalidation")
//multer config
const storage = multer.memoryStorage()
const upload = multer({storage,limits:{
    fileSize: 10 * 1024 * 1024 // 10 mb max
},fileFilter:FileFilter})

// vendors route
router.post("/add-product",AuthMiddleware,IsVendor,upload.array("images",5),Addproduct)
router.get("/vendor",AuthMiddleware,IsVendor,VendorAllProducts)
router.put("/update/:id",AuthMiddleware,IsVendor,upload.array("images",5),UpdateProductDetails)
router.delete("/delete/:id",AuthMiddleware,IsVendor,DeleteProduct)

module.exports = router 

