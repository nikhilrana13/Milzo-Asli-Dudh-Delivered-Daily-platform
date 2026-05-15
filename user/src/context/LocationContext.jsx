import { createContext, useContext, useEffect, useState } from "react";






export const LocationContext = createContext()

// Get Browser Coordinates
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
     return reject("Geolocation not supported")
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
      },
      (err) => reject(err)
    )
  })
}

//  Helper Reverse Geocode
const getCityFromCoords = async (lat, lng) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
  )
  const data = await res.json()
  const addr = data?.address || {}
  return {
    city: addr.city || addr.town || addr.state_district || "Unknown",
    state: addr.state || addr.country || "Unknown",
    pincode:addr.postcode || ""
  }
}

export const LocationProvider = ({children})=>{
     const [selectedLocation,setSelectedLocation] = useState({
        city:"",        
        state:"",
        pincode:"",
        lat:"",
        lng:""
     })

    const fetchUserCurrentLocation = async()=>{
        try {
            const {lat,lng} = await getUserLocation()
            const detected = await getCityFromCoords(lat,lng)
            const locationdata = {...detected,lat,lng}
            setSelectedLocation(locationdata) 
            // console.log("location",locationdata)
            localStorage.setItem("selectedLocation",JSON.stringify(locationdata))
            return locationdata
        } catch (error) {
            console.error("failed to fetch current location",error)
        }
    }
    // runs when app loads
    useEffect(()=>{
        const savedLocation = localStorage.getItem("selectedLocation")
        if(savedLocation){
            setSelectedLocation(JSON.parse(savedLocation))
        }
    },[])

    return(
        <LocationContext.Provider value={{selectedLocation,setSelectedLocation,fetchUserCurrentLocation,getUserLocation}}>
            {children}
        </LocationContext.Provider>
    )
}


export const useUserLocation  = ()=> useContext(LocationContext)



