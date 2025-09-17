import React, { createContext } from 'react'
import { useState } from 'react';
export const userDataContext=createContext();
import axios from "axios"
import { useEffect } from 'react';

function UserContext({children}) {
    const serverUrl="http://localhost:8000"
    const [userData,setUserData]=useState(null)
    const [frontendImage,setFrontendImage]=useState(null)
    const [backendImage,setBackendImage]=useState(null)
    const [selectedImage,setSelectedImage]=useState(null)
   
    const handleCurrentUser=async ()=>{
      try {
        const result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})  
        setUserData(result.data)
        console.log(result.data) 

      } catch (error) {
        console.log(error)        
      }
    }
    //fetching the gemini response
    const getGeminiResponse=async (command)=>{
      try {
        const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
        return result.data;

      } catch (error) {
        console.log(error);        
      }
    }
   useEffect(() => {
  handleCurrentUser();
}, []); // empty dependency array

    const val={
        serverUrl,userData,setUserData,frontendImage,setFrontendImage,backendImage,setBackendImage,selectedImage,setSelectedImage,getGeminiResponse
    }
  return (
    <div>
        <userDataContext.Provider value={val}>
            {children}             
        </userDataContext.Provider> 
    </div>
  )
}

export default UserContext
