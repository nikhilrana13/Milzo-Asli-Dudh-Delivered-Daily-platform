const Response = require("../utils/responsehandler");



const IsUser = async(req,res,next)=>{
     if(req.role !== "user"){
         return Response(res, 403, "Access denied: User only");
     }
     next()
}

module.exports = IsUser