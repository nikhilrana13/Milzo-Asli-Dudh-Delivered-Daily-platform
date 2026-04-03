const VendorMapper = (vendor)=>({
    _id:vendor._id,
    username: vendor.username,
    email: vendor.email,
    role: vendor.role,
    displayName:vendor.displayName,
    profilePic:vendor.profilePic?.url || null,
    isActive:vendor.isActive,
    kycStatus:vendor.kycStatus,
    isKycApproved:vendor.isKycApproved,
})
module.exports = VendorMapper