const express = require("express")
const AuthMiddleware = require("../middlewares/authmiddleware")
const { AddReview, GetProductReviews } = require("../controllers/reviewcontroller")
const IsUser = require("../middlewares/isuser")
const IsVendor = require("../middlewares/isvendor")
const router = express.Router() 

// for users
router.post("/add-review",AuthMiddleware,IsUser,AddReview)
// for vendor
router.get("/reviews/product/:id",AuthMiddleware,IsVendor,GetProductReviews)


module.exports = router


