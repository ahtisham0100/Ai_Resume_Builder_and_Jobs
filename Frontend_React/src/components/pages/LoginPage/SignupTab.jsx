import { useAuthProvider } from "@/contextProvider/AuthProvider";
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
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import { signUpWithEmailAndPassword } from "@/SignupWithEmailAndPass";
import { useState } from "react";
import { set } from "date-fns";

function SignupTab() {
  const { setUser } = useAuthProvider()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur"
  })

  const handleSignUp = async (data) => {
    setIsLoading(true);
    try {
      const res = await signUpWithEmailAndPassword(data.email, data.password);

      if (res?.user) {
        setUser(res.user);
      } else {
        res.message = res.message.replace("Firebase: Error", "");
        setError(res.message);
      }
    } catch (err) {
      setError("Sign up failed. Please try again.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };




  /**
   * login with google 
   */

  const { loginWithGoogle } = useGoogleLogin();

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle()
        .then(user => {
          setUser(user);
          console.log("Logged in user email:", user.email, "token :", user.token);
        });
    } catch (err) {
      alert("Google login failed.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
        <Card className="bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="text-black dark:text-white">Create an Account</CardTitle>
            <CardDescription className="text-gray-700 dark:text-gray-300">
              Join and get started.
            </CardDescription>
          </CardHeader>
          <CardAction className="flex justify-content center text-red-500">{error}</CardAction>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-email" className="text-black dark:text-white">
                Email
              </Label>
              <Input id="signup-email" type="email" {...register("email", {
                required: "Email is required", pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address"
                }
              })} />
              {errors.email && <CardAction className="text-red-500">{errors.email.message}</CardAction>}

            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password" className="text-black dark:text-white">
                Password
              </Label>
              <Input id="signup-password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/, message: "Must include 1 uppercase, 1 number, and 1 special character."
                  },
                })}
                type="password" />
              {errors.password && <CardAction fontVariant="destructive" className="text-sm  !text-start text-red-700">{errors.password.message}</CardAction>}
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
            <Button type="button" onClick={handleGoogleLogin} variant="secondary" className="w-full flex gap-2 items-center justify-center">
              <FcGoogle size={20} />
              Sign Up with Google
            </Button>
          </CardContent>
        </Card>
      </form>
    </>
  )
}

export default SignupTab;