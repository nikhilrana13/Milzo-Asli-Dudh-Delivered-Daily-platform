const express = require("express")
const router = express.Router()
const multer = require("multer")
const AuthMiddleware = require("../middlewares/authmiddleware")
const IsVendor = require("../middlewares/isvendor")
const FileFilter = require("../utils/multervalidation")
const { ApplyKyc } = require("../controllers/vendorcontroller")
//multer config
const storage = multer.memoryStorage()
const upload = multer({storage,limits:{
    fileSize: 10 * 1024 * 1024 // 10 mb max
},fileFilter:FileFilter})


router.post("/apply-kyc",AuthMiddleware,IsVendor,upload.fields([
    {name:"images",maxCount:5},
    {name:"videos",maxCount:2},
    { name:"aadharImages", maxCount: 2 },
    { name:"milkLabTestImg", maxCount: 1 },
]),ApplyKyc)


module.exports = router