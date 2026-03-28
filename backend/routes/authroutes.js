const express = require("express")
const IsGoogleAuth = require("../middlewares/isGoogleAuth")
const LoginWithGoogle = require("../controllers/authcontroller")
const router = express.Router() 


// routes 
router.post("/google-login",IsGoogleAuth,LoginWithGoogle)





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