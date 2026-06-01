const cron = require("node-cron")
const moment = require("moment-timezone")
const Subscription = require("../models/subscriptionmodel")



// Subscription Status Cron Job
// - Runs every midnight (IST)
// - Finds expired subscriptions with confirmed bookings
// - Updates active/paused subscriptions to completed
const SubscriptionStatusUpdater = ()=>{
    // run every midnight
    cron.schedule("0 0 * * *",async()=>{
        console.log("[CRON] Running subscription status updater...");
        try {
            // get today's date in IST and normalize to start of day
            const todayDate = moment().tz("Asia/Kolkata").startOf("day").toDate()
            const result = await Subscription.updateMany({
                // update only expired confirmed subscriptions
                status:{$in:["active","paused"]},
                bookingStatus: "confirmed",
                // subscription end date must be before today
                endDate:{$ne:null,$lt:todayDate}
            }, { $set: { status: "completed" } })
              console.log(`[CRON] Subscription status update completed. Modified: ${result.modifiedCount}`)
        } catch (error) {
            console.error("failed to update subscription status",error)
        }
    })
}

module.exports = SubscriptionStatusUpdater