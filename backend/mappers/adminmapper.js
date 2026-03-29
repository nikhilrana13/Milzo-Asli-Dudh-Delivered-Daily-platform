const AdminMapper = (admin)=>({
    _id:admin._id,
    name: admin.Mcname,
    email: admin.email,
    role: admin.role,
    profilePic:admin.profilePic,
    isActive: admin.isActive, 
})
module.exports = AdminMapper