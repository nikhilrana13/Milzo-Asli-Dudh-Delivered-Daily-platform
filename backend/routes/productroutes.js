const express = require("express")
const router = express.Router() 
const multer = require("multer")
const AuthMiddleware = require("../middlewares/authmiddleware")
const IsVendor = require("../middlewares/isvendor")
const { Addproduct, VendorAllProducts } = require("../controllers/productcontroller")
const FileFilter = require("../utils/multervalidation")
//multer config
const storage = multer.memoryStorage()
const upload = multer({storage,limits:{
    fileSize: 10 * 1024 * 1024 // 10 mb max
},fileFilter:FileFilter})

// vendors route
router.post("/add-product",AuthMiddleware,IsVendor,upload.array("images",5),Addproduct)
router.get("/vendor",AuthMiddleware,IsVendor,VendorAllProducts)


module.exports = router 

