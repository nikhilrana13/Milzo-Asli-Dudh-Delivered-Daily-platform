const express = require("express")
const router = express.Router() 
const AuthMiddleware = require("../middlewares/authmiddleware")
const IsAdmin = require("../middlewares/isadmin")
const { GetAllVendors, ApproveAndRejectVendor, CreateCampaign} = require("../controllers/admincontroller")

router.get("/allvendors",AuthMiddleware,IsAdmin,GetAllVendors)
router.put("/vendor/kycverify",AuthMiddleware,IsAdmin,ApproveAndRejectVendor) 
router.post("/create-campaign",AuthMiddleware,IsAdmin,CreateCampaign)



module.exports = router
