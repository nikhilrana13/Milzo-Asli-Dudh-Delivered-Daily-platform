const express = require("express")
const router = express.Router()
const multer = require("multer")
const AuthMiddleware = require("../middlewares/authmiddleware")
const IsUser = require("../middlewares/isuser")
const { UpdateUserProfile, AddnewAddress, UpdateAddress, GetUserAddresses, DeleteAddress, AddAddressFromCoords } = require("../controllers/usercontroller")
const FileFilter = require("../utils/multervalidation")
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



module.exports = router

