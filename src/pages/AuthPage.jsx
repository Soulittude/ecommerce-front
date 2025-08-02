import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/authSlice.js";
import { useRegister, useLogin } from "@/hooks/queries.js";
import { useSeoData } from "@/hooks/useSeoData.js";
import Seo from "@/components/Seo.jsx";

const AuthPage = () => {
  const seoData = useSeoData("auth");
  const [activeForm, setActiveForm] = useState("login");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isAgreementsAccepted, setIsAgreementsAccepted] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Call hooks at the top level
  const register = useRegister();
  const login = useLogin();

  const handleBack = () => {
    navigate("/");
  };

  const validateName = (name) => {
    if (name.length < 6) {
      return "Name must be at least 6 characters";
    }
  };

  const validatePassword = (password) => {
    const minLength = 10;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 10 characters";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumber) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form["login-email"].value;
    const password = form["login-password"].value;
    const errors = {};

    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const credentials = await login.mutateAsync({ email, password });
        dispatch(setCredentials(credentials));
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again.";
        setFormErrors({ general: errorMessage });
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form["register-name"].value;
    const email = form["register-email"].value;
    const password = form["register-password"].value;
    const confirmPassword = form["register-confirm-password"].value;
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (!confirmPassword)
      errors.confirmPassword = "Please confirm your password";
    if (!isAgreementsAccepted)
      errors.agreements = "You must accept the agreements";
    if (!isCaptchaVerified) errors.captcha = "Please verify the captcha";

    const nameError = validateName(name);
    if (nameError) errors.name = nameError;

    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await register.mutateAsync({
          name,
          email,
          password,
        });
        // Automatically log in the user after successful registration
        const loginCredentials = await login.mutateAsync({ email, password });
        dispatch(setCredentials(loginCredentials));
        navigate("/");
      } catch (error) {
        console.error("Registration failed:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Registration failed. Please try again.";
        setFormErrors({ general: errorMessage });
      }
    }
  };

  return (
    <>
      <Seo title={seoData.title} description={seoData.description} />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Back Button */}
          <div className="mb-6 flex justify-center">
            <button onClick={handleBack} className="focus:outline-none">
              <img
                src="/vite.svg"
                alt="Company Logo"
                className="h-12 w-12 cursor-pointer"
              />
            </button>
          </div>

          {/* Form Tabs */}
          <Tabs
            value={activeForm}
            onValueChange={setActiveForm}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showLoginPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p className="text-red-500 text-sm">
                      {formErrors.password}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="login-remember" />
                  <Label htmlFor="login-remember">Remember me</Label>
                </div>
                <div className="text-right mb-4">
                  <button
                    type="button"
                    className="text-sm text-primary underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Name</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Enter your name"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm">{formErrors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showRegisterPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowRegisterPassword(!showRegisterPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showRegisterPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p className="text-red-500 text-sm">
                      {formErrors.password}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="register-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {formErrors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Agreement Checkboxes */}
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="register-agreements"
                      checked={isAgreementsAccepted}
                      onCheckedChange={setIsAgreementsAccepted}
                    />
                    <Label htmlFor="register-agreements" className="text-sm">
                      <span className="break-words">
                        I accept the{" "}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="link"
                              className="p-0 h-auto text-primary underline inline"
                            >
                              Privacy Policy
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Privacy Policy</DialogTitle>
                            </DialogHeader>
                            <p className="text-sm text-muted-foreground">
                              [Privacy Policy content goes here. This is a
                              placeholder text.]
                            </p>
                          </DialogContent>
                        </Dialog>
                        ,{" "}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="link"
                              className="p-0 h-auto text-primary underline inline"
                            >
                              Membership Agreement
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Membership Agreement</DialogTitle>
                            </DialogHeader>
                            <p className="text-sm text-muted-foreground">
                              [Membership Agreement content goes here. This is a
                              placeholder text.]
                            </p>
                          </DialogContent>
                        </Dialog>
                        , and{" "}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="link"
                              className="p-0 h-auto text-primary underline inline"
                            >
                              Personal Data Usage
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Personal Data Usage</DialogTitle>
                            </DialogHeader>
                            <p className="text-sm text-muted-foreground">
                              [Personal Data Usage content goes here. This is a
                              placeholder text.]
                            </p>
                          </DialogContent>
                        </Dialog>
                      </span>
                    </Label>
                  </div>
                  {formErrors.agreements && (
                    <p className="text-red-500 text-sm">
                      {formErrors.agreements}
                    </p>
                  )}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="register-notifications" />
                    <Label htmlFor="register-notifications">
                      I want to be notified about latest sales and promotions
                    </Label>
                  </div>
                </div>

                {/* Captcha */}
                <div className="space-y-2">
                  <Label>Captcha</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="register-captcha"
                      checked={isCaptchaVerified}
                      onCheckedChange={setIsCaptchaVerified}
                    />
                    <Label htmlFor="register-captcha">I'm not a robot</Label>
                  </div>
                  {formErrors.captcha && (
                    <p className="text-red-500 text-sm">{formErrors.captcha}</p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Social Login Buttons */}
          <div className="mt-6 space-y-3">
            <Button variant="outline" className="w-full">
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full">
              Continue with Facebook
            </Button>
            <Button variant="outline" className="w-full">
              Continue with Apple
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
