const stripe = require("stripe");

const StripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
module.exports = StripeInstance; 
