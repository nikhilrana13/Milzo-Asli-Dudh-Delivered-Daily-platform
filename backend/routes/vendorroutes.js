const express = require("express")
const router = express.Router()
const multer = require("multer")
const AuthMiddleware = require("../middlewares/authmiddleware")
const IsVendor = require("../middlewares/isvendor")
const FileFilter = require("../utils/multervalidation")
const { ApplyKyc, UpdateVendorProfile, FindVendors, FetchVendorAllproducts, FetchVendorDetails } = require("../controllers/vendorcontroller")
const IsUser = require("../middlewares/isuser")
//multer config
const storage = multer.memoryStorage()
const upload = multer({storage,limits:{
    fileSize: 11 * 1024 * 1024 // 11 mb max
},fileFilter:FileFilter})

router.post("/vendor/apply-kyc",AuthMiddleware,IsVendor,upload.fields([
    {name:"images",maxCount:5},
    {name:"videos",maxCount:2},
    { name:"aadharImages", maxCount: 2 },
    { name:"milkLabTestImg", maxCount: 1 },
]),ApplyKyc)
router.put("/vendor/update-profile",AuthMiddleware,IsVendor,upload.fields([
    {name:"images",maxCount:5},
    {name:"videos",maxCount:2},
    {name:"profilePic",maxCount:1}
]),UpdateVendorProfile)
router.get("/vendors/find",FindVendors)
router.get("/vendor/products",FetchVendorAllproducts)
router.get("/vendor/:id",FetchVendorDetails)


module.exports = router