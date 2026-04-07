const express = require("express")
const bodyParser = require("body-parser") 
const { StripeWebhookHandler } = require("../controllers/bookingcontroller")
const router = express.Router()

router.post("/stripe/webhook",bodyParser.raw({type:"application/json"}),StripeWebhookHandler)

module.exports = router 
