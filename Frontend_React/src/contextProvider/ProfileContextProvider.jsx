import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ProfileContext = createContext();

function ProfileContextProvider({ children }) {
  const [profileInfo, setProfileInfo] = useState({});
useEffect(()=>{
console.log("Profile Info changed : ", profileInfo) 
localStorage.setItem("basicInfo", JSON.stringify(profileInfo)); 
// const result =  axios.get(`${process.env.VITE_BASE_ADDRESS}/profile`)

},[profileInfo])
  return (
    <ProfileContext.Provider value={{ profileInfo, setProfileInfo }}>
      {children}
    </ProfileContext.Provider>
  );
}

// Custom hook for easier consumption
function useProfileInfo() {
  return useContext(ProfileContext);
}

export { ProfileContextProvider, useProfileInfo };
