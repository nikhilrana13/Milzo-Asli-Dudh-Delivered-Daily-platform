const Response = require("../utils/responsehandler");

const IsVendor = async (req, res, next) => {
  if (req.role !== "vendor") {
    return Response(res, 403, "Access denied: Vendor only");
  }
  next();
};

module.exports = IsVendor;
