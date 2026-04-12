const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const configure  = require("./config/db")
const authRoute = require("./routes/authroutes")
const vendorRoute = require("./routes/vendorroutes")
const adminRoute = require("./routes/adminroutes")
const productRoute = require("./routes/productroutes")
const userRoute = require("./routes/userroutes")
const locationRoute = require("./routes/locationroutes")
const WebhookRoute = require("./routes/stripewebhookroute")
const BookingRoute = require("./routes/bookingroutes")
const SubscriptionRoute = require("./routes/subscriptionroutes")
const ReviewRoute = require("./routes/reviewroutes")

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
// stripe webhook 
app.use("/api",WebhookRoute)
app.set("trust proxy", 1);

// middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

// routes 
app.use("/api/auth",authRoute)
app.use("/api",vendorRoute)
app.use("/api/admin",adminRoute)
app.use("/api/products",productRoute)
app.use("/api/user",userRoute)
app.use("/api/location",locationRoute)
app.use("/api",BookingRoute)
app.use("/api/subscriptions",SubscriptionRoute)
app.use("/api",ReviewRoute)



// connect to db
configure()

// app.use("/",(req,res)=>{
//     res.send("hello server is running")
// })
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

