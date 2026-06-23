"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"; // useSearchParams ইমপোর্ট করা হয়েছে
import { Button, Card } from "@heroui/react";
import { Label, Radio, RadioGroup } from "@heroui/react";
import {
  Eye,
  EyeSlash,
  Person,
  At,
  Shield,
  CircleCheck,
  TriangleExclamationFill,
  Xmark,
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // searchParams ইনিশিয়ালাইজ করা হয়েছে

  // ইউআরএল থেকে callbackUrl নেওয়া হচ্ছে, না থাকলে হোম ("/") এ যাবে
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

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

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        role,
        callbackURL: callbackUrl, // ডাইনামিক callbackUrl সেট করা হয়েছে
      });

      if (authError) {
        setError(
          authError.message || "Something went wrong. Please try again.",
        );
      } else {
        setName("");
        setEmail("");
        setPassword("");

        const duration = 4000;

        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } relative max-w-md w-full bg-white dark:bg-gray-900 shadow-xl rounded-2xl pointer-events-auto flex flex-col ring-1 ring-black/5 dark:ring-white/10 overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-300`}
            >
              <div className="flex p-4 pb-5">
                <div className="flex-1 w-0 flex items-center">
                  <div className="flex-shrink-0 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl">
                    <CircleCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Account Created Successfully!
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      Welcome to TicketBari. Redirecting to home...
                    </p>
                  </div>
                </div>

                <div className="ml-4 flex-shrink-0 flex border-l border-gray-100 dark:border-gray-800 pl-4 items-center">
                  <button
                    type="button"
                    onClick={() => toast.dismiss(t.id)}
                    className="p-1 flex items-center justify-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                  >
                    <Xmark className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 w-full h-1 bg-gray-100 dark:bg-gray-800">
                <div
                  className="h-full bg-emerald-500"
                  style={{
                    animation: `shrinkWidth ${duration}ms linear forwards`,
                    transformOrigin: "left",
                  }}
                />
              </div>
            </div>
          ),
          {
            duration: duration,
            position: "top-center",
          },
        );

        setTimeout(() => {
          // window.location.href এর পরিবর্তে Next.js router দিয়ে ডাইনামিক রিডাইরেক্ট করা হলো
          router.push(callbackUrl);
          router.refresh();
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
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <div className="flex items-center space-x-2 text-xl font-bold mb-2">
            <span className="font-extrabold tracking-wide text-gray-900 dark:text-white">
              Ticket
              <span className="text-blue-600 dark:text-blue-500">Bari</span>
            </span>
          </div>
          <p className="text-small text-default-500 max-w-[280px]">
            Create an account to book your tickets and manage your journeys
            effortlessly.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-default-700">
              Full Name
            </label>
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

          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-default-700">
              Email Address
            </label>
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

          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-default-700">
              Password
            </label>
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
          
          <div className="flex flex-col gap-4">
            <Label>Select your role</Label>
            <RadioGroup
              onChange={value => setRole(value)}
              defaultValue="user"
              name="plan-orientation"
              orientation="horizontal"
            >
              <Radio value="user">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  User
                </Radio.Content>
              </Radio>
              <Radio value="vendor">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  Vendor
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-danger bg-danger-50 dark:bg-danger-50/10 rounded-xl border border-danger-200 dark:border-danger-50/20">
              <TriangleExclamationFill className="text-lg flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 text-sm text-success bg-success-50 dark:bg-success-50/10 rounded-xl border border-success-200 dark:border-success-50/20">
              <CircleCheck className="text-lg flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <Button
            type="submit"
            color="primary"
            className="w-full font-semibold h-10 mt-2"
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </form>

        {/* এখানে লিঙ্কটির সাথে callbackUrl জুড়ে চেইন করা হয়েছে যাতে ব্যাক করা যায় */}
        <div className="text-center mt-6 text-small text-default-500">
          Already have an account?{" "}
          <Link
            href={`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="text-primary hover:underline font-medium transition-all"
          >
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
}