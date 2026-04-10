const express = require("express")
const router = express.Router()
const multer = require("multer")
const AuthMiddleware = require("../middlewares/authmiddleware")
const IsUser = require("../middlewares/isuser")
const { UpdateUserProfile, AddnewAddress, UpdateAddress, GetUserAddresses, DeleteAddress, AddAddressFromCoords } = require("../controllers/usercontroller")
const FileFilter = require("../utils/multervalidation")
const { ApplyOffer, GetAllCampaigns } = require("../controllers/admincontroller")
//multer config
const storage = multer.memoryStorage()
const upload = multer({storage,limits:{
    fileSize: 11 * 1024 * 1024 // 11 mb max
},fileFilter:FileFilter})


router.put("/update-profile",AuthMiddleware,IsUser,upload.single("profilePic"),UpdateUserProfile)
router.put("/add-address", AuthMiddleware, IsUser, AddnewAddress)
router.put("/update-address",AuthMiddleware,IsUser,UpdateAddress)
router.get("/all-address",AuthMiddleware,IsUser,GetUserAddresses)
router.delete("/address-delete",AuthMiddleware,IsUser,DeleteAddress)
// user offers 
router.get("/apply-offer",AuthMiddleware,IsUser,ApplyOffer)
router.get("/offers",AuthMiddleware,IsUser,GetAllCampaigns)



module.exports = router

