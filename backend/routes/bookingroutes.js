const express = require("express")
const AuthMiddleware = require("../middlewares/authmiddleware")
const IsUser = require("../middlewares/isuser")
const { CreateSubscriptionBooking, UpdatePaymentStatus } = require("../controllers/bookingcontroller")
const router = express.Router() 


router.post("/create-booking",AuthMiddleware,IsUser,CreateSubscriptionBooking)
router.put("/mark-success/:id", AuthMiddleware, IsUser, UpdatePaymentStatus)


module.exports = router 