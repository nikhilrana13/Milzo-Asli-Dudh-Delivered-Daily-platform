const Response = require("../utils/responsehandler")
const jwt = require("jsonwebtoken")



const AuthMiddleware = async(req,res,next)=>{
            const authheader = req.headers.authorization 
            if(!authheader || !authheader.startsWith("Bearer ")){
                return Response(res,401,"Unauthorized token missing")
            }
            try {
                const token = authheader.split(" ")[1]
                const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
                // console.log(decoded);
                req.user = decoded.id 
                // console.log("req.user",req.user)
                req.role =  decoded.role 
                // console.log("req.role",req.role)
                next()                
            } catch (error) {
                console.log("error in authMiddleware",error)
                return Response(res,500,"Internal server error")
            }
}

module.exports = AuthMiddleware