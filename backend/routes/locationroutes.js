const express = require("express")
const { GetLocationFromCoords, fetchLocationSuggesstions } = require("../utils/geolocations")
const router = express.Router()


router.get("/fetch-location-from-coords",GetLocationFromCoords)
router.get("/fetch-suggestions",fetchLocationSuggesstions)


module.exports = router