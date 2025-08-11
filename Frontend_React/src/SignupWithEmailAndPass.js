import { } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase"
import axios from "axios";

async function signUpWithEmailAndPassword(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        return {
            success: true,
            token,
            user: {
                name: userCredential.user.displayName || "Anonymous",
                email: userCredential.user.email,
                imgUrl:userCredential.user.photoURL
            }
        };

    } catch (error) {
        return { success: false, message: error.message }
    }
}

// sign in with E/p

async function LogInWithEmailAndPassword(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("user credentials :", userCredential)
        const token = await userCredential.user.getIdToken(); 
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        return {
            success: true,
            token,
            user: {
                name: userCredential.user.displayName || "Anonymous",
                email: userCredential.user.email, 
                imgUrl: userCredential.user.photoURL
            }

        };
    } catch (error) {
        return { success: false, message: error.message }
    }
}


//signOut function

async function logOut() {
    try {
        await signOut(auth);
        return "User signed out";
    } catch (error) {
        return error.message;
    }
}


export { LogInWithEmailAndPassword, signUpWithEmailAndPassword, signOut }