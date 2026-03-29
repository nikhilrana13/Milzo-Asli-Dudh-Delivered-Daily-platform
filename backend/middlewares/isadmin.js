const Response = require("../utils/responsehandler");


const IsAdmin = async(req,res,next)=>{
     if(!req.role !== "admin"){
         return Response(res, 403, "Access denied: admin only");
     }
     next()
}

module.exports = IsAdmin