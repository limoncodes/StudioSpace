
"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Add New Studio",
    href: "/add-studio",
  },
  {
    name: "My Studio Listings",
    href: "/my-listing",
  },
  {
    name: "My Bookings",
    href: "/my-bookings",
  },
];

const AvatorFofile = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const user = session?.user;

  // Loading State
  if (isPending) {
    return (
      <div className="h-10 w-10 animate-pulse rounded-full bg-[#F4F5F6]" />
    );
  }

  // Not Authenticated
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/log-in"
          className="hidden h-10 items-center justify-center rounded-xl border border-[#E5E7EB] px-4 text-sm font-semibold text-[#1E1E1E] hover:border-[#9CF237] hover:bg-[#F4FAEB] sm:inline-flex"
        >
          Log In
        </Link>

        <Link
          href="/registration"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-[#9CF237] px-4 text-sm font-semibold text-[#1E1E1E] shadow-none hover:bg-[#8DE62B]"
        >
          Registration
        </Link>
      </div>
    );
  }

  const displayName = user.name?.trim() || "StudioSpace User";

  const userInitial =
    user.name?.trim().charAt(0).toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    "U";

  // Active Route
  const isRouteActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Logout
  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      setLogoutError("");

      const { error } = await authClient.signOut();

      if (error) {
        setLogoutError(
          error.message || "Unable to log out. Please try again."
        );
        return;
      }

      router.replace("/");
      router.refresh();

    } catch (error) {
      console.error("Logout Error:", error);

      setLogoutError("Something went wrong. Please try again.");

    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <DropdownMenu>

      {/* Profile Trigger */}
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="h-auto gap-2 rounded-full p-1 pr-3 hover:bg-[#F4F5F6]"
            aria-label="Open profile menu"
          />
        }
      >
        <Avatar className="h-10 w-10 border border-[#E5E7EB]">
          <AvatarImage
            src={user.image || undefined}
            alt={displayName}
          />

          <AvatarFallback className="bg-[#9CF237] font-bold text-[#1E1E1E]">
            {userInitial}
          </AvatarFallback>
        </Avatar>

        <span className="hidden max-w-32 truncate text-sm font-semibold text-[#1E1E1E] sm:block">
          {displayName}
        </span>

        <span className="hidden text-xs text-[#6B7280] sm:block">
          ▾
        </span>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-64 rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-[0_15px_40px_rgba(0,0,0,0.10)]"
      >

        {/* User Information */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-3">
            <div className="flex items-center gap-3">

              <Avatar className="h-11 w-11 border border-[#E5E7EB]">
                <AvatarImage
                  src={user.image || undefined}
                  alt={displayName}
                />

                <AvatarFallback className="bg-[#9CF237] font-bold text-[#1E1E1E]">
                  {userInitial}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[#1E1E1E]">
                  {displayName}
                </p>

                <p className="truncate text-xs font-normal text-[#6B7280]">
                  {user.email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-[#E5E7EB]" />

        {/* Navigation Links */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-2 text-[10px] font-bold uppercase tracking-[1.5px] text-[#9CA3AF]">
            Workspace
          </DropdownMenuLabel>

          {menuLinks.map((link) => {
            const active = isRouteActive(link.href);

            return (
              <DropdownMenuItem
                key={link.href}
                onClick={() => router.push(link.href)}
                aria-current={active ? "page" : undefined}
                className={`cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium ${
                  active
                    ? "bg-[#F4FAEB] text-[#1E1E1E]"
                    : "text-[#6B7280]"
                } data-[highlighted]:bg-[#F4F5F6] data-[highlighted]:text-[#1E1E1E]`}
              >
                {link.name}

                {active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-[#9CF237]" />
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-[#E5E7EB]" />

        {/* Logout */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={isLoggingOut}
            onClick={handleLogout}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-semibold text-[#1E1E1E] data-[highlighted]:bg-[#F4FAEB] data-[highlighted]:text-[#1E1E1E]"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
            <span className="ml-auto text-base">↗</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* Logout Error */}
        {logoutError && (
          <p
            role="alert"
            className="px-3 py-2 text-xs text-red-600"
          >
            {logoutError}
          </p>
        )}

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatorFofile;
