const express = require("express")
const router = express.Router()
const AuthMiddleware = require("../middlewares/authmiddleware")
const IsUser = require("../middlewares/isuser")
const { UserSubscriptions, ConfirmOrCancelSubs, PauseOrActiveSubscription, VendorAllSubscriptions, CancelSubscription } = require("../controllers/subscriptioncontroller")
const IsVendor = require("../middlewares/isvendor")

// user routes
router.get("/my",AuthMiddleware,IsUser,UserSubscriptions)
router.patch("/:id/pause-or-active",AuthMiddleware,IsUser,PauseOrActiveSubscription)
router.patch("/:id/cancel",AuthMiddleware,IsUser,CancelSubscription)

// vendor routes
router.patch("/:id/confirm-or-cancel",AuthMiddleware,IsVendor,ConfirmOrCancelSubs)
router.get("/vendor",AuthMiddleware,IsVendor,VendorAllSubscriptions)


module.exports = router

