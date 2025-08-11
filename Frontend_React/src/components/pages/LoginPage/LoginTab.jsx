import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import { useAuthProvider } from "@/contextProvider/AuthProvider";
import { LogInWithEmailAndPassword } from "@/SignupWithEmailAndPass";
import { useState } from "react";
import { useForm } from "react-hook-form";



function LoginTab() {

//setting user in the global context; 

const {setUser} = useAuthProvider()
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);

 const {register , handleSubmit , formState:{errors}} = useForm({
        mode:"onChange", 
        reValidateMode:"onBlur"
    }) 


const handleLogin = async (data) => {
  setIsLoading(true);
  try {
    const res = await LogInWithEmailAndPassword(data.email, data.password);


    if (res.success) {
      setUser(res.user);
    } else {
        res.message = res.message.replace("Firebase: Error", "");
        res.message = "Enter Correct Credentials" + res.message;
      setError(res.message);
      setTimeout(() => setError(null), 5000);
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};




   const { loginWithGoogle } = useGoogleLogin();

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      setUser(user);
      console.log("Logged in user:", user);
    } catch (err) {
      alert("Google login failed.");
    }
  };
  
    return (
       <> 
       <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <Card className="bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-md rounded-xl">
          {error ? <CardAction className="flex justify-content center text-red-500">{error}</CardAction> : null}
             <CardHeader>
              <CardTitle className="text-black dark:text-white">Login</CardTitle>
              <CardDescription className="text-gray-700 dark:text-gray-300">
                Access your account securely.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black dark:text-white">
                  Email
                </Label>

<Input id="email" type="email" {...register("email", { required: "Email is required" , pattern:{value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address"} })} />
                     {errors.email && <CardAction className="text-red-500">{errors.email.message}</CardAction>}              </div>
              <div className="space-y-2">
                <Label htmlFor="password"  className="text-black dark:text-white" >
                  Password
                </Label>
<Input id="password" 
               {...register("password", { required: "Password is required",
               pattern:{ value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/, message: "Must include 1 uppercase, 1 number, and 1 special character."
 },
                })} 
               type="password" />
               {errors.password && <CardAction className="text-sm  !text-start text-red-700">{errors.password.message}</CardAction>}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging In..." : "Login"}
              </Button>
              <Button type="button" onClick={handleGoogleLogin} variant="secondary" className="w-full flex gap-2 items-center justify-center">
                <FcGoogle size={20} />
                Continue with Google
              </Button>
            </CardContent>
          </Card>
          </form>
       </>
    );
} 


export default LoginTab;