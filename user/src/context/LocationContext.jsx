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
          lon: pos.coords.longitude
        })
      },
      (err) => reject(err)
    )
  })
}

//  Helper Reverse Geocode
const getCityFromCoords = async (lat, lon) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
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
        lon:""
     })

    const fetchUserCurrentLocation = async()=>{
        try {
            const {lat,lon} = await getUserLocation()
            const detected = await getCityFromCoords(lat,lon)
            const locationdata = {...detected,lat,lon}
            setSelectedLocation(locationdata) 
            localStorage.setItem("selectedLocation",JSON.stringify(locationdata))
        } catch (error) {
            console.error("failed to fetch current location",error)
        }
    }
    // runs when app loads
    useEffect(()=>{
        const savedLocation = localStorage.getItem("selectedLocation")
        if(savedLocation){
            setSelectedLocation(JSON.parse(savedLocation))
        }else{
            fetchUserCurrentLocation()
        }
    },[])

    return(
        <LocationContext.Provider value={{selectedLocation,setSelectedLocation,fetchUserCurrentLocation}}>
            {children}
        </LocationContext.Provider>
    )
}


export const useUserLocation  = ()=> useContext(LocationContext)


