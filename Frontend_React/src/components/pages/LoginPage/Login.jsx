// components/Login.tsx
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import LoginTab from "./LoginTab";
import SignupTab from "./SignupTab";
function Login() {
    
  //for tracking and setting active classes of tabs
  const [activeTab, setActiveTab] = useState("login"); 


  return (
    <div className="flex  justify-center items-center  rounded-xl bg-gradient-to-br from-white  transition-colors ">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-[400px] rounded-2xl bg-white/800 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-xl"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4 rounded-xl bg-white/30 dark:bg-white/10 backdrop-blur-sm">
       
       <TabsTrigger
  value="login"
  className={`
    py-2 font-medium rounded-xl 
    ${activeTab === "login"
      ? "text-white  dark:bg-white/20 active"
      : "my-[5px] !bg-transparent hover:bg-white text-black !border-black"}
  `}
>
  Login
</TabsTrigger>

<TabsTrigger
  value="signup"
  className={`
    py-2 font-medium rounded-xl transition-colors
    ${activeTab === "signup"
      ? "bg-black/50 dark:bg-white/20 active"
      : "my-[5px] !bg-transparent hover:bg-white text-black !border-black"}
  `}
>
  Sign Up
</TabsTrigger>

        </TabsList>

        <TabsContent value="login">
         <LoginTab/>
        </TabsContent>

        <TabsContent value="signup">
         <SignupTab/>
        </TabsContent>
      </Tabs>
    </div>
  );
  }

export default Login;
