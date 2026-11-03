
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

import AvatorFofile from "../AvatorFofile";

const subscribe = () => () => {};

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About Us", href: "/about" },
];

const Navber = () => {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  // Theme
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#9CF237]">
            <span className="text-2xl font-black text-[#1E1E1E]">
              S
            </span>
          </div>

          <span className="text-xl font-bold tracking-tight text-[#1E1E1E]">
            StudioSpace
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 text-sm font-semibold ${
                  active
                    ? "text-[#1E1E1E]"
                    : "text-[#6B7280] hover:text-[#1E1E1E]"
                }`}
              >
                {link.name}

                {active && (
                  <span className="absolute -bottom-1 left-0 h-0.75 w-full rounded-full bg-[#9CF237]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Profile, Theme & Mobile Menu */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Functional Brand Theme Toggle */}
          <label
            className="relative inline-flex shrink-0 cursor-pointer items-center"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <input
              type="checkbox"
              aria-label="Toggle dark mode"
              checked={isDark}
              disabled={!mounted}
              onChange={(e) =>
                setTheme(e.target.checked ? "dark" : "light")
              }
              className="peer sr-only"
            />

            <div
              className="relative h-9 w-[68px] rounded-full border border-[#DCE6D2] bg-[#9CF237] transition-colors duration-300 after:absolute after:left-1 after:top-1 after:flex after:h-[26px] after:w-[26px] after:items-center after:justify-center after:rounded-full after:bg-white after:text-sm after:content-['☀️'] after:shadow-sm after:transition-transform after:duration-300 peer-checked:border-[#1E1E1E] peer-checked:bg-[#1E1E1E] peer-checked:after:translate-x-8 peer-checked:after:content-['🌙']"
            />

            <span className="ml-2 hidden text-sm font-medium text-[#1E1E1E] sm:inline">
              Theme
            </span>
          </label>

          {/* Profile Avatar */}
          <AvatorFofile />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-[#E5E7EB] lg:hidden"
          >
            <span
              className={`h-0.5 w-5 rounded-full bg-[#1E1E1E] transition-transform ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`h-0.5 w-5 rounded-full bg-[#1E1E1E] transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`h-0.5 w-5 rounded-full bg-[#1E1E1E] transition-transform ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-[#E5E7EB] bg-white px-5 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-semibold ${
                    active
                      ? "bg-[#F4F5F6] text-[#1E1E1E]"
                      : "text-[#6B7280] hover:bg-[#F4F5F6]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navber;
