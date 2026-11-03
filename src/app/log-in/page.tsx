
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { createAuthClient } from "better-auth/react";

const LogIN = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Email & Password Login
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    
    // ================================== console log for debugging ==========================================
    

    if (!email || !password) {
      setFormMessage({
        type: "error",
        text: "Please enter your email and password.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setFormMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
        rememberMe: true,
      });

      if (error) {
        setFormMessage({
          type: "error",
          text: error.message || "Invalid email or password.",
        });
        return;
      }

      router.push("/");
      router.refresh();

    } catch (error) {
      console.error("Login Error:", error);

      setFormMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Google & GitHub Social Login
 const handleGoogleLogin = async () => {
   const authClient = createAuthClient()
    const data = await authClient.signIn.social({
     provider: "google",
   });
   console.log(data)
   
  
 };

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-[#F4F5F6] px-4 py-10 font-body sm:px-6 lg:py-16">

      <div className="mx-auto grid max-w-6xl items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr]">

        {/* Left Branding Panel */}
        <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[28px] bg-[#1E1E1E] p-8 sm:p-12 lg:min-h-full">

          {/* Background Decoration */}
          <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#9CF237]/10 blur-[90px]" />

          {/* Logo */}
          <Link href="/" className="relative flex w-fit items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#9CF237]">
              <span className="text-2xl font-black text-[#1E1E1E]">
                S
              </span>
            </div>

            <span className="text-xl font-bold tracking-tight text-white">
              Studio<span className="text-[#9CF237]">Space</span>
            </span>
          </Link>

          {/* Brand Content */}
          <div className="relative mt-12 lg:mt-20">
            <p className="mb-5 text-xs font-bold uppercase tracking-[3px] text-[#9CF237]">
              Welcome Back
            </p>

            <h1 className="font-heading max-w-md text-4xl font-bold leading-tight text-white sm:text-5xl">
              Your Creative World Awaits.
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-8 text-white/55">
              Sign in to discover inspiring studios, manage your bookings,
              and continue creating extraordinary things.
            </p>
          </div>

          {/* Bottom Message */}
          <div className="relative mt-12 border-t border-white/10 pt-6">
            <p className="font-heading text-lg italic text-white/80">
              One space. Endless possibilities.
            </p>
          </div>
        </div>

        {/* Right Login Form */}
        <Card className="rounded-[28px] border border-[#E5E7EB] bg-white shadow-[0_15px_50px_rgba(0,0,0,0.05)]">
          <CardContent className="p-6 sm:p-9 lg:p-11">

            {/* Form Heading */}
            <div className="mb-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[#7DBE20]">
                Welcome Back
              </p>

              <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1E1E1E] sm:text-4xl">
                Sign In to StudioSpace
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                Enter your credentials to access your account and
                continue your creative journey.
              </p>
            </div>

            {/* Error / Success Message */}
            {formMessage && (
              <div
                role={formMessage.type === "error" ? "alert" : "status"}
                aria-live="polite"
                className={`mb-6 rounded-xl border p-3 text-sm ${
                  formMessage.type === "success"
                    ? "border-[#DDF4C2] bg-[#F4FAEB] text-[#477D16]"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {formMessage.text}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#1E1E1E]"
                >
                  Email Address
                </label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="h-12 rounded-xl border-[#E5E7EB] bg-white px-4 text-sm focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#1E1E1E]"
                >
                  Password
                </label>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="h-12 rounded-xl border-[#E5E7EB] bg-white px-4 text-sm focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                />

                {/* Forgot Password */}
                <div className="flex justify-end pt-1">
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#6B7280] transition-colors hover:text-[#477D16]"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading || socialLoading !== null}
                className="h-12 w-full rounded-xl bg-[#9CF237] text-sm font-bold text-[#1E1E1E] shadow-none transition-colors hover:bg-[#8DE62B] disabled:opacity-60"
              >
                {loading ? (
                  "Signing In..."
                ) : (
                  <>
                    Login to Account
                    <span className="ml-2 text-lg">→</span>
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs text-[#9CA3AF]">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">

              {/* Google Login */}
              <Button
                type="button"
                variant="outline"
                disabled={loading || socialLoading !== null}
                onClick={handleGoogleLogin}
                className="h-12 rounded-xl border-[#E5E7EB] bg-white text-sm font-semibold text-[#1E1E1E] transition-colors hover:bg-[#F4F5F6] disabled:opacity-60"
              >
                {socialLoading === "google" ? (
                  "Connecting..."
                ) : (
                  <>
                    <FcGoogle size={21} />
                    Continue with Google
                  </>
                )}
              </Button>

              {/* GitHub Login */}
             

            </div>

            {/* Register Link */}
            <p className="mt-8 text-center text-sm text-[#6B7280]">
              Don't have an account?{" "}
              <Link
                href="/registration"
                className="font-bold text-[#1E1E1E] underline decoration-[#9CF237] decoration-2 underline-offset-4 transition-colors hover:text-[#6B9F1F]"
              >
                Create Account
              </Link>
            </p>

            {/* Bottom Notice */}
            <p className="mt-5 text-center text-[11px] leading-5 text-[#9CA3AF]">
              By signing in, you agree to StudioSpace's Terms & Conditions
              and Privacy Policy.
            </p>

          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LogIN;
