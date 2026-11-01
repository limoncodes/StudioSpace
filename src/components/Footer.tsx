
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  FaInstagram,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

// Static year prevents prerendering issues
const date = new Date();
const COPYRIGHT_YEAR = date.getFullYear();

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About Us", href: "/about" },
];

const studioCategories = [
  { name: "Photography Studios", href: "/studios" },
  { name: "Podcast Studios", href: "/studios" },
  { name: "Music Recording", href: "/studios" },
  { name: "Film & Production", href: "/studios" },
  { name: "Art & Creative Spaces", href: "/studios" },
];

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E] text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">

          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-4">

            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#9CF237]">
                <span className="text-2xl font-black text-[#1E1E1E]">
                  S
                </span>
              </div>

              <span className="text-xl font-bold tracking-tight text-white">
                Studio
                <span className="text-[#9CF237]">Space</span>
              </span>
            </Link>

            {/* Mission Statement */}
            <p className="mt-7 max-w-sm text-sm leading-7 text-white/55">
              Your creative journey starts with the right space.
              Discover, connect, and book inspiring studios designed
              to bring your creative visions to life.
            </p>

            <p className="mt-6 font-serif text-lg italic text-white/85">
              Create more. Imagine bigger.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-7 text-sm font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition-colors duration-200 hover:text-[#9CF237]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Categories */}
          <div className="lg:col-span-3">
            <h3 className="mb-7 text-sm font-bold text-white">
              Explore Studios
            </h3>

            <ul className="space-y-4">
              {studioCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-sm text-white/55 transition-colors duration-200 hover:text-[#9CF237]"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className="font-serif text-2xl font-bold text-white">
              Stay in the Creative Loop.
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/55">
              Get creative inspiration, studio discoveries, and exclusive
              updates delivered straight to your inbox.
            </p>

            {/* Newsletter Input */}
            <div className="mt-6 flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
                className="h-12 rounded-xl border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
              />

              <Button
                type="button"
                className="h-12 w-full rounded-xl bg-[#9CF237] text-sm font-bold text-[#1E1E1E] shadow-none transition-colors duration-200 hover:bg-[#8DE62B]"
              >
                Subscribe Now
                <FaArrowRight className="ml-2" size={14} />
              </Button>
            </div>

            <p className="mt-3 text-xs leading-5 text-white/35">
              By subscribing, you agree to receive updates from StudioSpace.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-7">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

            {/* Copyright */}
            <p className="text-center text-xs text-white/45 md:text-left">
              © {COPYRIGHT_YEAR} StudioSpace. All rights reserved.
            </p>

            {/* Terms & Privacy */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/terms"
                className="text-xs text-white/45 transition-colors hover:text-[#9CF237]"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/privacy"
                className="text-xs text-white/45 transition-colors hover:text-[#9CF237]"
              >
                Privacy Policy
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">

              {/* Instagram */}
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition-all duration-200 hover:border-[#9CF237] hover:bg-[#9CF237] hover:text-[#1E1E1E]"
              >
                <FaInstagram size={18} />
              </a>

              {/* X - New X Logo */}
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition-all duration-200 hover:border-[#9CF237] hover:bg-[#9CF237] hover:text-[#1E1E1E]"
              >
                <FaXTwitter size={17} />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition-all duration-200 hover:border-[#9CF237] hover:bg-[#9CF237] hover:text-[#1E1E1E]"
              >
                <FaYoutube size={19} />
              </a>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
