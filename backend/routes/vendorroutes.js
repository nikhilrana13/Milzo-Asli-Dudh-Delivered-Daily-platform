const express = require("express")
const router = express.Router()
const multer = require("multer")
const AuthMiddleware = require("../middlewares/authmiddleware")
const IsVendor = require("../middlewares/isvendor")
const FileFilter = require("../utils/multervalidation")
const { ApplyKyc, UpdateVendorProfile, FindVendors, FetchVendorAllproducts, FetchVendorDetails, VendorDashboardStats, VendorRevenueOverview, VendorSubscriptionStats, VendorBookingStats } = require("../controllers/vendorcontroller")
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
// public routes
router.get("/vendors/find",FindVendors)
router.get("/vendor/products",FetchVendorAllproducts)
router.get("/vendor/:id",FetchVendorDetails)
// vendor dashboard routes 
router.get("/vendor/dashboard/stats",AuthMiddleware,IsVendor,VendorDashboardStats)
router.get("/vendor/dashboard/revenue-overview",AuthMiddleware,IsVendor,VendorRevenueOverview)
router.get("/vendor/subscriptions/stats",AuthMiddleware,IsVendor,VendorSubscriptionStats)
router.get("/vendor/bookings/stats",AuthMiddleware,IsVendor,VendorBookingStats) 


module.exports = router