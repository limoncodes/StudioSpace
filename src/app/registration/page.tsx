
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { authClient } from "@/lib/auth-client";
import { createAuthClient } from "better-auth/react";

const Register = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Password Requirements
  const passwordChecks = [
    {
      label: "At least one uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "At least one lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "Minimum 6 characters",
      valid: password.length >= 6,
    },
  ];

  // Form Submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setFormMessage(null);
    setPasswordError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();

    // Profile image is optional
    const photoURL = String(formData.get("photoURL") || "").trim();

    const enteredPassword = String(formData.get("password") || "");

    // Required Fields (Image is not required)
    if (!name || !email || !enteredPassword) {
      setFormMessage({
        type: "error",
        text: "Please fill in all the required fields.",
      });
      return;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setFormMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    // Optional Image URL Validation
    if (photoURL) {
      try {
        const url = new URL(photoURL);

        if (url.protocol !== "http:" && url.protocol !== "https:") {
          throw new Error("Invalid URL");
        }
      } catch {
        setFormMessage({
          type: "error",
          text: "Please enter a valid image URL.",
        });
        return;
      }
    }

    // Password Validation
    const errors: string[] = [];

    if (!/[A-Z]/.test(enteredPassword)) {
      errors.push("At least one uppercase letter is required.");
    }

    if (!/[a-z]/.test(enteredPassword)) {
      errors.push("At least one lowercase letter is required.");
    }

    if (enteredPassword.length < 6) {
      errors.push("Password must contain at least 6 characters.");
    }

    if (errors.length > 0) {
      setPasswordError(errors.join(" "));

      setFormMessage({
        type: "error",
        text: "Your password does not meet the requirements.",
      });

      return;
    }

    try {
      setIsSubmitting(true);

      // Better Auth Registration
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password: enteredPassword,
        ...(photoURL ? { image: photoURL } : {}),
        callbackURL: "/",
      });

      // Handle Registration Error
      if (error) {
        setFormMessage({
          type: "error",
          text: error.message || "Registration failed. Please try again.",
        });
        return;
      }

      // Never log the user's password
      console.log("StudioSpace Registration:", {
        name,
        email,
        image: photoURL || "No profile image provided",
      });

      // Reset Form
      form.reset();
      setPassword("");
      setPasswordError("");

      // Redirect after successful signup with session
      if (data?.token) {
        router.replace("/");
        router.refresh();
        return;
      }

      // Email verification may be required
      setFormMessage({
        type: "success",
        text: "Account created successfully! Please check your email if verification is required.",
      });

    } catch (error) {
      console.error("Registration Error:", error);

      setFormMessage({
        type: "error",
        text: "An error occurred during registration. Please try again.",
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  // Social Login 
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
              Welcome to StudioSpace
            </p>

            <h1 className="font-heading max-w-md text-4xl font-bold leading-tight text-white sm:text-5xl">
              Your Creative Journey Starts Here.
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-8 text-white/55">
              Discover inspiring spaces, connect with creative minds,
              and turn your next big idea into reality.
            </p>
          </div>

          {/* Bottom Message */}
          <div className="relative mt-12 border-t border-white/10 pt-6">
            <p className="font-heading text-lg italic text-white/80">
              One space. Endless possibilities.
            </p>
          </div>
        </div>

        {/* Right Registration Form */}
        <Card className="rounded-[28px] border border-[#E5E7EB] bg-white shadow-[0_15px_50px_rgba(0,0,0,0.05)]">
          <CardContent className="p-6 sm:p-9 lg:p-11">

            {/* Form Heading */}
            <div className="mb-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[#7DBE20]">
                Create Your Account
              </p>

              <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1E1E1E] sm:text-4xl">
                Join StudioSpace
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                Create your account and start exploring creative spaces.
              </p>
            </div>

            {/* Form Message */}
            {formMessage && (
              <div
                role={formMessage.type === "error" ? "alert" : "status"}
                aria-live="polite"
                className={`mb-6 rounded-xl border p-3 text-sm ${formMessage.type === "success"
                    ? "border-[#DDF4C2] bg-[#F4FAEB] text-[#477D16]"
                    : "border-red-200 bg-red-50 text-red-700"
                  }`}
              >
                {formMessage.text}
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* Name and Email */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-[#1E1E1E]"
                  >
                    Full Name <span className="text-[#7DBE20]">*</span>
                  </label>

                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="h-12 rounded-xl border-[#E5E7EB] bg-white px-4 text-sm focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-[#1E1E1E]"
                  >
                    Email Address <span className="text-[#7DBE20]">*</span>
                  </label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-12 rounded-xl border-[#E5E7EB] bg-white px-4 text-sm focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                  />
                </div>
              </div>

              {/* Optional Photo URL */}
              <div className="space-y-2">
                <label
                  htmlFor="photoURL"
                  className="text-sm font-semibold text-[#1E1E1E]"
                >
                  Profile Photo URL{" "}
                  <span className="font-normal text-[#9CA3AF]">
                    (Optional)
                  </span>
                </label>

                <Input
                  id="photoURL"
                  name="photoURL"
                  type="url"
                  placeholder="https://example.com/profile.jpg"
                  className="h-12 rounded-xl border-[#E5E7EB] bg-white px-4 text-sm focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                />

                <p className="text-xs text-[#9CA3AF]">
                  Add a profile image URL or leave this field empty.
                </p>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#1E1E1E]"
                >
                  Password <span className="text-[#7DBE20]">*</span>
                </label>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                    setFormMessage(null);
                  }}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  className="h-12 rounded-xl border-[#E5E7EB] bg-white px-4 text-sm focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                />

                {/* Password Requirements */}
                <div className="space-y-2 rounded-xl bg-[#F4F5F6] p-4">
                  <p className="mb-2 text-xs font-semibold text-[#6B7280]">
                    Password requirements:
                  </p>

                  {passwordChecks.map((check) => (
                    <div
                      key={check.label}
                      className={`flex items-center gap-2 text-xs ${check.valid
                          ? "text-[#477D16]"
                          : "text-[#6B7280]"
                        }`}
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px]">
                        {check.valid ? "✓" : "•"}
                      </span>

                      {check.label}
                    </div>
                  ))}
                </div>

                {passwordError && (
                  <p className="text-xs leading-5 text-red-600" role="alert">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-xl bg-[#9CF237] text-sm font-bold text-[#1E1E1E] shadow-none transition-colors hover:bg-[#8DE62B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  "Creating Account..."
                ) : (
                  <>
                    Create Account
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

            {/* Social Login */}
            <div className="grid grid-cols-1 ">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                className="h-12 rounded-xl border-[#E5E7EB] bg-white text-sm font-semibold text-[#1E1E1E] hover:bg-[#F4F5F6]"
              >
                <FcGoogle size={20} />
                Google
              </Button>

              
            </div>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-[#6B7280]">
              Already have an account?{" "}
              <Link
                href="/log-in"
                className="font-bold text-[#1E1E1E] underline decoration-[#9CF237] decoration-2 underline-offset-4 hover:text-[#6B9F1F]"
              >
                Login
              </Link>
            </p>

            {/* Demo Notice */}
            <p className="mt-5 text-center text-[11px] leading-5 text-[#9CA3AF]">
              Your registration details are securely submitted to StudioSpace.
              Your password is never printed in the browser console.
            </p>

          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Register;
