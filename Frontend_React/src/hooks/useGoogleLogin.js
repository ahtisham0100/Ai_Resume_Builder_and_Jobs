// src/hooks/useGoogleLogin.js
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

import axios from "axios"; // to send token to backend
const baseAddress = import.meta.env.VITE_BASE_ADDRESS;
const postAddress = baseAddress + "api/auth";
console.log(postAddress);

export const useGoogleLogin = () => {
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userEmail = user.email;
      const idToken = await user.getIdToken();
      console.log("user is  : ", user.email, "\ntoken is :", idToken);

      //setting token as default header for backend posts for user verification on backend.
      axios.defaults.headers.common["Authorization"] = `Bearer ${idToken}`;
      return {
        success: true,
        idToken,
        email: userEmail,
        imgUrl: user.photoURL,
      };
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  };

  return { loginWithGoogle };
};
