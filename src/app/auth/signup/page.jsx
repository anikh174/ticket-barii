"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card } from "@heroui/react";
import { Eye, EyeSlash, Person, At, Shield, CircleCheck, TriangleExclamationFill } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client"; 

export default function SignUpPage() {
  const router = useRouter();
  
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UI States
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/", 
      });

      if (authError) {
        setError(authError.message || "Something went wrong. Please try again.");
      } else {
        setSuccess("Account created successfully! Redirecting...");
        setName("");
        setEmail("");
        setPassword("");
        
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        {/* Header Section with Custom TicketBari Logo */}
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <div className="flex items-center space-x-2 text-xl font-bold mb-2">
            <span className="font-extrabold tracking-wide text-gray-900 dark:text-white">
              Ticket<span className="text-blue-600 dark:text-blue-500">Bari</span>
            </span>
          </div>
          <p className="text-small text-default-500 max-w-[280px]">
            Create an account to book your tickets and manage your journeys effortlessly.
          </p>
        </div>
        
        {/* Form Body */}
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          
          {/* Name Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-default-700">Full Name</label>
            <div className="relative flex items-center">
              <Person className="absolute left-3 text-default-400 text-xl pointer-events-none" />
              <input
                type="text"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 pl-10 pr-3 text-sm bg-transparent border-2 border-default-200 hover:border-default-400 focus:border-primary rounded-xl outline-none transition-all"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-default-700">Email Address</label>
            <div className="relative flex items-center">
              <At className="absolute left-3 text-default-400 text-xl pointer-events-none" />
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 pl-10 pr-3 text-sm bg-transparent border-2 border-default-200 hover:border-default-400 focus:border-primary rounded-xl outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-default-700">Password</label>
            <div className="relative flex items-center">
              <Shield className="absolute left-3 text-default-400 text-xl pointer-events-none" />
              <input
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 pl-10 pr-10 text-sm bg-transparent border-2 border-default-200 hover:border-default-400 focus:border-primary rounded-xl outline-none transition-all"
              />
              <button 
                className="absolute right-3 focus:outline-none flex items-center justify-center" 
                type="button" 
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlash className="text-xl text-default-400" />
                ) : (
                  <Eye className="text-xl text-default-400" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message Feedback */}
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-danger bg-danger-50 dark:bg-danger-50/10 rounded-xl border border-danger-200 dark:border-danger-50/20">
              <TriangleExclamationFill className="text-lg flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message Feedback */}
          {success && (
            <div className="flex items-center gap-2 p-3 text-sm text-success bg-success-50 dark:bg-success-50/10 rounded-xl border border-success-200 dark:border-success-50/20">
              <CircleCheck className="text-lg flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            color="primary"
            className="w-full font-semibold h-10 mt-2"
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </form>

        {/* Navigation Option */}
        <div className="text-center mt-6 text-small text-default-500">
          Already have an account?{" "}
          <Link 
            href="/auth/signin" 
            className="text-primary hover:underline font-medium transition-all"
          >
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
}