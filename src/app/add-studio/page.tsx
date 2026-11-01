
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bounce, toast } from "react-toastify";

const categories = [
    "Photo Studio",
    "Film Stage",
    "Podcast Lounge",
    "Music Suite",
    "Creative Workshop",
    "Dance Studio",
    "Event Space",
    "Other",
];

const amenitiesList = [
    "High-Speed Wi-Fi",
    "Air Conditioning",
    "Natural Lighting",
    "Professional Lighting",
    "Soundproofing",
    "Photography Backdrops",
    "Green Screen",
    "Parking",
    "Restroom",
    "Kitchen",
    "Props & Furniture",
    "Changing Room",
];

const AddStudio = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [formMessage, setFormMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    // Amenities Selection
    const handleAmenityChange = (
        amenity: string,
        checked: boolean
    ) => {
        setSelectedAmenities((current) =>
            checked
                ? [...current, amenity]
                : current.filter((item) => item !== amenity)
        );
    };




    // Form Submit
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFormMessage(null);

        // Authentication Check
        if (!user) {
            setFormMessage({
                type: "error",
                text: "Please login before adding a new studio.",
            });
            return;
        }

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Form Values
        const title = String(formData.get("title") || "").trim();
        const category = String(formData.get("category") || "");
        const hourlyRateValue = String(formData.get("hourlyRate") || "");
        const securityDepositValue = String(
            formData.get("securityDeposit") || ""
        );
        const maxCapacityValue = String(formData.get("maxCapacity") || "");
        const location = String(formData.get("location") || "").trim();
        const imageURL = String(formData.get("imageURL") || "").trim();
        const overview = String(formData.get("overview") || "").trim();

        // Required Fields Validation
        if (
            !title ||
            !category ||
            !hourlyRateValue ||
            !securityDepositValue ||
            !maxCapacityValue ||
            !location ||
            !imageURL ||
            !overview
        ) {
            setFormMessage({
                type: "error",
                text: "Please complete all required fields.",
            });
            return;
        }

        // Number Validation
        const hourlyRate = Number(hourlyRateValue);
        const securityDeposit = Number(securityDepositValue);
        const maxCapacity = Number(maxCapacityValue);

        if (!Number.isFinite(hourlyRate) || hourlyRate <= 0) {
            setFormMessage({
                type: "error",
                text: "Hourly rate must be greater than zero.",
            });
            return;
        }

        if (!Number.isFinite(securityDeposit) || securityDeposit < 0) {
            setFormMessage({
                type: "error",
                text: "Please enter a valid security deposit.",
            });
            return;
        }

        if (
            !Number.isInteger(maxCapacity) ||
            maxCapacity < 1
        ) {
            setFormMessage({
                type: "error",
                text: "Maximum capacity must be at least 1.",
            });
            return;
        }

        // Image URL Validation
        try {
            const url = new URL(imageURL);

            if (url.protocol !== "http:" && url.protocol !== "https:") {
                throw new Error("Invalid image URL");
            }
        } catch {
            setFormMessage({
                type: "error",
                text: "Please enter a valid studio image URL.",
            });
            return;
        }

        // Complete Studio Data
        const studioData = {
            title,
            category,
            hourlyRate,
            securityDeposit,
            maxCapacity,
            location,
            imageURL,
            amenities: selectedAmenities,
            overview,

            owner: {
                name: user.name,
                email: user.email,
            },
        };

        

        // ==========================================
        const res = await fetch("http://localhost:5000/add-studio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(studioData),
        })
        const data = await res.json();
        console.log("Server Response:", data);

        // alart
        toast.success('Studio form submitted successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });


        setFormMessage({
            type: "success",
            text: "Studio form submitted successfully! ",
        });
    };

    return (
        <section className="min-h-screen bg-[#F4F5F6] px-4 py-10 font-body sm:px-6 lg:py-16">

            <div className="mx-auto max-w-5xl">

                {/* Page Heading */}
                <div className="mb-10">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[2.5px] text-[#7DBE20]">
                        StudioSpace Marketplace
                    </p>

                    <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1E1E1E] sm:text-4xl lg:text-5xl">
                        Add Your Creative Space
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6B7280] sm:text-base">
                        Share your creative space with the community. Add your studio
                        details, pricing, amenities, and availability information.
                    </p>
                </div>

                {/* Form Card */}
                <Card className="overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_15px_50px_rgba(0,0,0,0.04)]">

                    <CardContent className="p-5 sm:p-8 lg:p-10">

                        {/* Form Message */}
                        {formMessage && (
                            <div
                                role={formMessage.type === "error" ? "alert" : "status"}
                                aria-live="polite"
                                className={`mb-8 rounded-xl border p-4 text-sm ${formMessage.type === "success"
                                    ? "border-[#DDF4C2] bg-[#F4FAEB] text-[#477D16]"
                                    : "border-red-200 bg-red-50 text-red-700"
                                    }`}
                            >
                                {formMessage.text}
                            </div>
                        )}

                        {/* Login Required */}
                        {!isPending && !user && (
                            <div className="mb-8 rounded-xl border border-[#E5E7EB] bg-[#F4F5F6] p-4">
                                <p className="text-sm text-[#1E1E1E]">
                                    Please{" "}
                                    <Link
                                        href="/log-in"
                                        className="font-bold underline decoration-[#9CF237] underline-offset-4"
                                    >
                                        login
                                    </Link>{" "}
                                    to add your studio.
                                </p>
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="space-y-10"
                        >

                            {/* 01. Studio Information */}
                            <div>
                                <div className="mb-6 border-b border-[#E5E7EB] pb-4">


                                    <h2 className="mt-2 font-heading text-2xl font-bold text-[#1E1E1E]">
                                        Studio Details
                                    </h2>

                                    <p className="mt-2 text-sm text-[#6B7280]">
                                        Tell us about your creative space.
                                    </p>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">

                                    {/* Studio Title */}
                                    <div className="space-y-2 sm:col-span-2">
                                        <label
                                            htmlFor="title"
                                            className="text-sm font-semibold text-[#1E1E1E]"
                                        >
                                            Studio Title <span className="text-[#7DBE20]">*</span>
                                        </label>

                                        <Input
                                            id="title"
                                            name="title"
                                            required
                                            placeholder="e.g. Premium Photography Studio"
                                            className="h-12 rounded-xl border-[#E5E7EB] focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                                        />
                                    </div>

                                    {/* Category */}
                                    <div className="space-y-2 sm:col-span-2">
                                        <label
                                            htmlFor="category"
                                            className="text-sm font-semibold text-[#1E1E1E]"
                                        >
                                            Studio Category <span className="text-[#7DBE20]">*</span>
                                        </label>

                                        <select
                                            id="category"
                                            name="category"
                                            required
                                            defaultValue=""
                                            className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#1E1E1E] outline-none transition-colors focus:border-[#9CF237] focus:ring-2 focus:ring-[#9CF237]/20"
                                        >
                                            <option value="" disabled>
                                                Select studio category
                                            </option>

                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Location */}
                                    <div className="space-y-2 sm:col-span-2">
                                        <label
                                            htmlFor="location"
                                            className="text-sm font-semibold text-[#1E1E1E]"
                                        >
                                            Location / Full Address{" "}
                                            <span className="text-[#7DBE20]">*</span>
                                        </label>

                                        <Input
                                            id="location"
                                            name="location"
                                            required
                                            placeholder="Enter your studio address"
                                            className="h-12 rounded-xl border-[#E5E7EB] focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                                        />
                                    </div>

                                </div>
                            </div>

                            {/* 02. Pricing & Capacity */}
                            <div>
                                <div className="mb-6 border-b border-[#E5E7EB] pb-4">


                                    <h2 className="mt-2 font-heading text-2xl font-bold text-[#1E1E1E]">
                                        Set Your Pricing
                                    </h2>

                                    <p className="mt-2 text-sm text-[#6B7280]">
                                        Provide your hourly rate and booking capacity.
                                    </p>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-3">

                                    {/* Hourly Rate */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="hourlyRate"
                                            className="text-sm font-semibold text-[#1E1E1E]"
                                        >
                                            Hourly Rate ($){" "}
                                            <span className="text-[#7DBE20]">*</span>
                                        </label>

                                        <Input
                                            id="hourlyRate"
                                            name="hourlyRate"
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            required
                                            placeholder="50"
                                            className="h-12 rounded-xl border-[#E5E7EB] focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                                        />
                                    </div>

                                    {/* Security Deposit */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="securityDeposit"
                                            className="text-sm font-semibold text-[#1E1E1E]"
                                        >
                                            Security Deposit ($){" "}
                                            <span className="text-[#7DBE20]">*</span>
                                        </label>

                                        <Input
                                            id="securityDeposit"
                                            name="securityDeposit"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            required
                                            placeholder="100"
                                            className="h-12 rounded-xl border-[#E5E7EB] focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                                        />
                                    </div>

                                    {/* Max Capacity */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="maxCapacity"
                                            className="text-sm font-semibold text-[#1E1E1E]"
                                        >
                                            Max Capacity{" "}
                                            <span className="text-[#7DBE20]">*</span>
                                        </label>

                                        <Input
                                            id="maxCapacity"
                                            name="maxCapacity"
                                            type="number"
                                            min="1"
                                            step="1"
                                            required
                                            placeholder="10"
                                            className="h-12 rounded-xl border-[#E5E7EB] focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                                        />
                                    </div>

                                </div>
                            </div>

                            {/* 03. Studio Image */}
                            <div>
                                <div className="mb-6 border-b border-[#E5E7EB] pb-4">


                                    <h2 className="mt-2 font-heading text-2xl font-bold text-[#1E1E1E]">
                                        Studio Image
                                    </h2>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="imageURL"
                                        className="text-sm font-semibold text-[#1E1E1E]"
                                    >
                                        Image URL <span className="text-[#7DBE20]">*</span>
                                    </label>

                                    <Input
                                        id="imageURL"
                                        name="imageURL"
                                        type="url"
                                        required
                                        placeholder="https://example.com/studio-image.jpg"
                                        className="h-12 rounded-xl border-[#E5E7EB] focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                                    />

                                    <p className="text-xs text-[#9CA3AF]">
                                        Provide a publicly accessible studio image URL.
                                    </p>
                                </div>
                            </div>

                            {/* 04. Amenities */}
                            <div>
                                <div className="mb-6 border-b border-[#E5E7EB] pb-4">


                                    <h2 className="mt-2 font-heading text-2xl font-bold text-[#1E1E1E]">
                                        Amenities & Facilities
                                    </h2>

                                    <p className="mt-2 text-sm text-[#6B7280]">
                                        Select all facilities available in your studio.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {amenitiesList.map((amenity) => {
                                        const checked = selectedAmenities.includes(amenity);

                                        return (
                                            <label
                                                key={amenity}
                                                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm transition-colors ${checked
                                                    ? "border-[#9CF237] bg-[#F4FAEB] text-[#1E1E1E]"
                                                    : "border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#9CF237]"
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={(e) =>
                                                        handleAmenityChange(
                                                            amenity,
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="h-4 w-4 shrink-0 cursor-pointer accent-[#86CF28]"
                                                />

                                                <span className="font-medium">{amenity}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* 05. Overview */}
                            <div>
                                <div className="mb-6 border-b border-[#E5E7EB] pb-4">


                                    <h2 className="mt-2 font-heading text-2xl font-bold text-[#1E1E1E]">
                                        Studio Overview
                                    </h2>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="overview"
                                        className="text-sm font-semibold text-[#1E1E1E]"
                                    >
                                        Detailed Description{" "}
                                        <span className="text-[#7DBE20]">*</span>
                                    </label>

                                    <Textarea
                                        id="overview"
                                        name="overview"
                                        required
                                        placeholder="Describe your studio, facilities, creative environment, and what makes it special..."
                                        className="min-h-36 resize-y rounded-xl border-[#E5E7EB] p-4 text-sm leading-7 focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                                    />
                                </div>
                            </div>

                            {/* 06. Owner Information */}
                            <div>
                                <div className="mb-6 border-b border-[#E5E7EB] pb-4">

                                    <h2 className="mt-2 font-heading text-2xl font-bold text-[#1E1E1E]">
                                        Studio Owner
                                    </h2>

                                    <p className="mt-2 text-sm text-[#6B7280]">
                                        Your account details are automatically populated.
                                    </p>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">

                                    {/* Owner Name */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="ownerName"
                                            className="text-sm font-semibold text-[#1E1E1E]"
                                        >
                                            Owner Name
                                        </label>

                                        <Input
                                            id="ownerName"
                                            value={user?.name || ""}
                                            readOnly
                                            disabled={isPending || !user}
                                            placeholder="Your account name"
                                            className="h-12 rounded-xl bg-[#F4F5F6] text-[#6B7280] disabled:opacity-70 hover:bg-[#F4F5F6] focus:bg-[#F4F5F6] focus:outline-none focus:ring-0 focus-visible:ring-0"
                                        />
                                    </div>

                                    {/* Owner Email */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="ownerEmail"
                                            className="text-sm font-semibold text-[#1E1E1E]"
                                        >
                                            Owner Email
                                        </label>

                                        <Input
                                            id="ownerEmail"
                                            type="email"
                                            value={user?.email || ""}
                                            readOnly
                                            disabled={isPending || !user}
                                            placeholder="Your account email"
                                            className="h-12 rounded-xl bg-[#F4F5F6] text-[#6B7280] disabled:opacity-70 hover:bg-[#F4F5F6] focus:bg-[#F4F5F6] focus:outline-none focus:ring-0 focus-visible:ring-0"
                                        />
                                    </div>

                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="border-t border-[#E5E7EB] pt-7">
                                <Button
                                    type="submit"
                                    disabled={isPending || !user}
                                    className="h-13 w-full rounded-xl bg-[#9CF237] text-sm font-bold text-[#1E1E1E] shadow-none transition-colors hover:bg-[#8DE62B] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-52"
                                >
                                    {isPending
                                        ? "Checking Account..."
                                        : !user
                                            ? "Login Required"
                                            : "Submit Studio Details"}

                                    <span className="ml-2 text-lg">→</span>
                                </Button>

                                <p className="mt-3 text-xs text-[#9CA3AF]">
                                    Your studio information will be submitted for review.
                                </p>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default AddStudio;
