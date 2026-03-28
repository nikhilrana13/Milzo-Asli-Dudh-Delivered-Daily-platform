const User = require("../models/usermodel")
const Response = require("../utils/responsehandler")
const jwt = require("jsonwebtoken")




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
                profilePic:picture,
                email:email
            })
            return Response(res,201,"Login Successfully",{user})
        }else{
            // update existing
            user.firebaseUid = uid,
            user.username = name,
            user.profilePic = picture,
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


module.exports = LoginWithGoogle
