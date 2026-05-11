import React, { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
import { api } from '@/services/api';

const useSearchLocation = () => {
       const [query,setQuery] = useState("")
       const [suggestions,setSuggestions] = useState([])
       const [loading,setLoading] = useState(false)
       const [showSuggestions,setShowSuggestions] = useState(false)
       const [hasSearched,setHasSearched] = useState(false)

    const DebounceValue = useDebounce(query,500)
    // console.log("suggestions",suggestions)
    useEffect(()=>{
        if(!DebounceValue || DebounceValue.length < 1){
            setSuggestions([])
            setLoading(false)
            setShowSuggestions(false)
            setHasSearched(false)
            return
        }
        const fetchLocationSuggestions = async()=>{
            try {
                 setLoading(true)
                 setHasSearched(true)
                 const response = await api.get(`/api/location/fetch-suggestions?query=${DebounceValue}`)
                //  console.log("response",response)
                 if(response){
                    const fetchedsuggestions = response?.data?.suggestions || []
                    setSuggestions(fetchedsuggestions)
                    setShowSuggestions(fetchedsuggestions.length > 0)
                 }
            } catch (error) {
                console.error("failed to find location suggestions",error)
                setSuggestions([])
                setShowSuggestions(false)
            }finally{
                setLoading(false)
            }
        }
        fetchLocationSuggestions()
    },[DebounceValue])

  return {query,setQuery,loading,suggestions,showSuggestions,setShowSuggestions,hasSearched}
}

export default useSearchLocation;
