import {initializeApp} from "firebase/app"
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// const firebaseConfig = {
//     apiKey: import.meta.env.apiKey,
//     authDomain: import.meta.env.authDomain,
//     projectId: import.meta.env.projectId,
//     appId: import.meta.env.appId,
// };

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCr2tKkBt3znMs_YOGMe_x-MYrEkCYqwN8",
//   authDomain: "ai-resume-builder-app-a61a3.firebaseapp.com",
//   projectId: "ai-resume-builder-app-a61a3",
//   storageBucket: "ai-resume-builder-app-a61a3.firebasestorage.app",
//   messagingSenderId: "1048514726810",
//   appId: "1:1048514726810:web:756030b6d62d14fef10823",
//   measurementId: "G-MSPWK3JFK2"
// };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };