const express = require("express")
const IsGoogleAuth = require("../middlewares/isGoogleAuth")
const {body} = require("express-validator")
const {LoginWithGoogle, RegisterVendor, LoginVendor, adminLogin, Logout} = require("../controllers/authcontroller")
const router = express.Router() 


// auth routes 
// for user
router.post("/google-login",IsGoogleAuth,LoginWithGoogle)
// for vendor
router.post("/vendor-register",[
    body("email").notEmpty().withMessage("Email is Required").isEmail().withMessage("please provide a valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required").isLength({min:6}).withMessage("password must be at least 6 characters long"),
    body("username").notEmpty().trim().escape().withMessage("Username is required")
],RegisterVendor)
// for vendor
router.post("/vendor-login",[
    body("email").notEmpty().withMessage("Email is Required").isEmail().withMessage("please provide a valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required").isLength({min:6}).withMessage("password must be at least 6 characters long")
],LoginVendor)
// for admin
router.post("/admin-login",adminLogin)
// logout for all
router.get("/logout",Logout)


// for testing only 
router.post("/test-google",async (req, res) => {
  try {
    const fakeDecodedUser = {
      uid: "testuid123",
      email: "test@gmail.com",
      name: "Test User",
      picture: "test.jpg"
    };
    req.user = fakeDecodedUser;
    return LoginWithGoogle(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Test failed" });
  }
});


module.exports = router