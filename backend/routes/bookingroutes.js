const express = require("express")
const AuthMiddleware = require("../middlewares/authmiddleware")
const IsUser = require("../middlewares/isuser")
const { CreateSubscriptionBooking, UpdatePaymentStatus, VendorAllBookings, UserAllBookings } = require("../controllers/bookingcontroller")
const IsVendor = require("../middlewares/isvendor")
const router = express.Router() 

// user route
router.post("/booking/create-booking",AuthMiddleware,IsUser,CreateSubscriptionBooking)
router.get("/bookings/user",AuthMiddleware,IsUser,UserAllBookings)
// vendor routes
router.get("/bookings/vendor",AuthMiddleware,IsVendor,VendorAllBookings)
router.put("/booking/mark-success/:id", AuthMiddleware, IsUser, UpdatePaymentStatus)




module.exports = router 