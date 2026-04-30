const User = require("../models/usermodel")
const Response = require("../utils/responsehandler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Vendor = require("../models/vendormodel")
const VendorMapper = require("../mappers/vendormapper")
const Admin = require("../models/adminmodel")
const AdminMapper = require("../mappers/adminmapper")
const { validationResult } = require("express-validator")



// login with google for users 
const LoginWithGoogle = async(req,res)=>{
    try {
         const {uid,name,email,picture} = req.user
        // check user already exists 
        let user = await User.findOne({email})
        if(!user){
            user = await User.create({
                firebaseUid:uid,
                username:name,
                profilePic:{ url: picture, fileId: null },
                email:email
            })
            return Response(res,201,"Login Successfully",{user})
        }else{
            // update existing
            user.firebaseUid = uid,
            user.username = name,
            user.profilePic = { url: picture, fileId: null },
            user.email = email
            await user.save()
        }
        // generate jwt token 
        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:"1day"})
        res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"none"})
        return Response(res,200,"Login Sucessfully",{user,token})
        
    } catch (error) {
        console.error("failed to login with google",error)
        return Response(res,500,"Internal server error",error)
    }
}
// for vendor register
const RegisterVendor = async(req,res)=>{
    try {
         const {username,email,password} = req.body 
        //check validation errors 
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return Response(res,400,"Validation errors",errors.array())
        }
        // check if vendor exists 
        const Existingvendor = await Vendor.findOne({email})
        if(!Existingvendor){
              const hashpassword = await bcrypt.hash(password,10)
              const vendor = await Vendor.create({
                 username,
                 email,
                 password:hashpassword,
              })
              return Response(res,201,"Register successfully")
        }else{
            return Response(res,400,"Vendor already exists")
        }
    } catch (error) {
        console.error("failed to register vendor",error)
        return Response(res,500,"Internal server error")
    }
}
// for vendor login 
const LoginVendor = async(req,res)=>{
    try {
        const {email,password} = req.body 
         //check validation errors 
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return Response(res,400,"Validation errors",errors.array())
        }
        // check vendor exits or not 
        const vendor = await Vendor.findOne({email})
        if(vendor){
              const isMatch = await bcrypt.compare(password,vendor.password)
              if(!isMatch){
                return Response(res,403,"Invalid credentials")
              }
              // generate token 
              const token = jwt.sign({id:vendor._id,role:vendor.role},process.env.JWT_SECRET_KEY,{expiresIn:"1day"})
              res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"})
              return Response(res,200,"Login successfully",{user:VendorMapper(vendor),token})
        }else{
            return Response(res,403,"Vendor not found ! Please register first")
        }
    } catch (error) {
        console.error("failed to login",error)
        return Response(res,500,"Internal server error")
    }
} 
// for admin login 
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || admin.role !== "admin") {
      return Response(res, 401, "Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return Response(res, 401, "Invalid credentials");
    }
    const token = jwt.sign({ id: admin._id, role:admin.role },process.env.JWT_SECRET_KEY,{ expiresIn: "1d" });
    res.cookie("token", token, {httpOnly: true,secure:true,sameSite: "none"});

    return Response(res, 200, "Admin login successful",{admin:AdminMapper(admin),token});

  } catch (error) {
    return Response(res, 500, "Internal server error");
  }
};
// logout
const Logout = async(req,res)=>{
    try {
        res.clearCookie("token",{httpOnly:true,secure:true,sameSite:"none"})
         return Response(res,200,"Logout successfully")
    } catch (error) {
         console.error("failed to logout",error)
        return Response(res,500,"Internal server error")
    }
}

module.exports = {LoginWithGoogle,RegisterVendor,LoginVendor,Logout,adminLogin}
