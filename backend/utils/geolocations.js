const axios = require("axios");
const Response = require("./responsehandler");

// fetch lat lon based on vendor city pincode
const getCoordinates = async (city, pincode) => {
  try {
    const query = `${pincode}, ${city}`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Milzo-Vendor-App/1.0 (https://milzo.com)',
      },
    });
    if (!response.data || response.data.length === 0) return null;
    return {
      lat: parseFloat(response.data[0].lat),
      lng: parseFloat(response.data[0].lon),
    };
  } catch (error) {
    console.error("Geocoding failed", error);
    return null;
  }
};
//  Helper Reverse Geocode
const getCityFromCoords = async (lat, lon) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Milzo-Vendor-App/1.0 (https://milzo.com)',
      },
    });
    const data = response.data;
    const addr = data?.address || {};
    const city = addr.city || addr.town || addr.village || addr.hamlet || addr.suburb || '';
    const state = addr.state || addr.state_district || '';
    const pincode = addr.postcode || '';
    return { city, state, pincode };
  } catch (error) {
    console.error("Reverse geocoding failed", error);
    return null;
  }
};
// fetch location's suggestions based on search query
const fetchLocationSuggesstions = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== "string" || !query.trim()) {
      return Response(res, 400, "Search value is required");
    }
    const encodedValue = encodeURIComponent(query.trim());
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedValue}&format=json&addressdetails=1&limit=10&countrycodes=in`;
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Milzo-Vendor-App/1.0 (https://milzo.com)",
      },
    });
    const suggestions = (response.data || []).map((item) => {
      const addr = item.address || {};
      const city =
        addr.city ||
        addr.town ||
        addr.village ||
        addr.hamlet ||
        addr.suburb ||
        "";
      if (!city) return null; // skip useless dat
      let state = addr.state || addr.state_district || "";
      const pincode = addr.postcode || "";
      if (!state) {
        state = city;
      }
      return {
        display_name: item.display_name,
        city: city.toLowerCase(),
        state: state.toLowerCase(),
        pincode,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      };
    }).filter(Boolean)
    return Response(res, 200, "Location suggestions fetched", {
      suggestions,
    });
  } catch (error) {
    console.error("failed to fetch location suggestions", error);
    return Response(res, 500, "Internal server error");
  }
};
// fetch city state pincode automatically
const FetchLocationFromCoords = async (req, res) => {
  try {
    const { lat, lng} = req.body;
    if (lat === undefined || lng === undefined) {
      return Response(res, 400, "Latitude and longitude are required");
    }
    // reverse geocode
    const geoData = await getCityFromCoords(lat, lng);
    if (!geoData) {
      return Response(res, 400, "Unable to geocode coordinates");
    }
    const { city, state, pincode } = geoData;
    // create address object
    const locationdetails = {
      city,
      state,
      pincode,
      location: {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)], // [lng, lat]
      },
    };
    return Response(res, 200, "location details fetch successfully", {locationdetails});
  } catch (error) {
    console.error("Failed to fetch from coords", error);
    return Response(res, 500, "Internal server error");
  }
};

module.exports = {getCoordinates,getCityFromCoords,fetchLocationSuggesstions,FetchLocationFromCoords};

