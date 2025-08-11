import { authContext } from "@/context/AuthContext";
import { useContext, useState } from "react";

 
 function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    return (
        <authContext.Provider value={{user, setUser}}>
            {children}
        </authContext.Provider>
    );  
} 


function useAuthProvider() {
    let context=useContext(authContext) 

    // if(!context || !context.user) {
    //     throw new Error("Login required");
    // }
return context;
} 


export { AuthProvider, useAuthProvider };