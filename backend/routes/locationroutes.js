const express = require("express")
const {fetchLocationSuggesstions, FetchLocationFromCoords } = require("../utils/geolocations")
const router = express.Router()


router.get("/fetch-location-from-coords",FetchLocationFromCoords)
router.get("/fetch-suggestions",fetchLocationSuggesstions)


module.exports = router 