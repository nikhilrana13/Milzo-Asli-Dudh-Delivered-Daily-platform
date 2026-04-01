const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const configure  = require("./config/db")
const authRoute = require("./routes/authroutes")
const vendorRoute = require("./routes/vendorroutes")
const adminRoute = require("./routes/adminroutes")
const productRoute = require("./routes/productroutes")
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

// routes 
app.use("/api/auth",authRoute)
app.use("/api/vendor",vendorRoute)
app.use("/api/admin",adminRoute)
app.use("/api/products",productRoute)





// connect to db
configure()

// app.use("/",(req,res)=>{
//     res.send("hello server is running")
// })
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

