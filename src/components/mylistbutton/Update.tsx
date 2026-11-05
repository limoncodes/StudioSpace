
"use client";

import { useState, type FormEvent } from "react";
import { FiEdit2 } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import { getTokenFormClient } from "@/lib/getTokenFormClient";

type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageURL: string;
  amenities: string[];
  overview: string;
  owner: {
    name: string;
    email: string;
  };
};

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

const Update = ({ studio }: { studio: Studio }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    studio.amenities ?? []
  );

  // Unique input IDs for each studio
  const fieldId = (name: string) => `${name}-${studio._id}`;

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

    const formData = new FormData(e.currentTarget);

    const updatedData = {
      
      title: String(formData.get("title") || "").trim(),
      category: String(formData.get("category") || ""),
      hourlyRate: Number(formData.get("hourlyRate")),
      securityDeposit: Number(formData.get("securityDeposit")),
      maxCapacity: Number(formData.get("maxCapacity")),
      location: String(formData.get("location") || "").trim(),
      imageURL: String(formData.get("imageURL") || "").trim(),
      amenities: selectedAmenities,
      overview: String(formData.get("overview") || "").trim(),
      owner: {
        name: studio.owner.name,
        email: studio.owner.email,
      },
    };
    const token = await getTokenFormClient()



   
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-studio/${studio._id}`, {
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
    })
    const data = await res.json();
    console.log("Server Response:", data);
    setIsOpen(false)
    
    window.location.reload();
    
  };


  // Keep existing category visible
  const categoryOptions = categories.includes(studio.category)
    ? categories
    : [studio.category, ...categories];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Update Button */}
      <DialogTrigger
        render={
          <Button
            type="button"
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F4F5F6] text-sm font-semibold text-[#1E1E1E] transition-colors hover:border-[#9CF237] hover:bg-[#F4FAEB]"
          >
            <FiEdit2 size={16} />
            Update
          </Button>
        }
      />

      {/* Update Modal */}
      <DialogContent className="max-h-[92dvh] overflow-y-auto rounded-[20px] border border-[#E5E7EB] bg-white p-5 sm:max-w-3xl sm:p-8">

        {/* Header */}
        <DialogHeader className="mb-5 text-left">
          <p className="text-xs font-bold uppercase tracking-[2.5px] text-[#7DBE20]">
            StudioSpace Marketplace
          </p>

          <DialogTitle className="mt-2 font-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">
            Update Your Studio
          </DialogTitle>

          <DialogDescription className="text-sm leading-7 text-[#6B7280]">
            Update your creative space details, pricing, amenities
            and studio information.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-10"
        >
          {/* 01. Studio Information */}
          <section>
            <div className="mb-6 border-b border-[#E5E7EB] pb-4">
              <h2 className="mt-2 font-heading text-2xl font-bold text-[#1E1E1E]">
                Studio Details
              </h2>

              <p className="mt-2 text-sm text-[#6B7280]">
                Update your creative space information.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">

              {/* Studio Title */}
              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor={fieldId("title")}
                  className="text-sm font-semibold text-[#1E1E1E]"
                >
                  Studio Title <span className="text-[#7DBE20]">*</span>
                </label>

                <Input
                  id={fieldId("title")}
                  name="title"
                  defaultValue={studio.title}
                  required
                  placeholder="e.g. Premium Photography Studio"
                  className="h-12 rounded-xl border-[#E5E7EB] focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                />
              </div>

              {/* Category */}
              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor={fieldId("category")}
                  className="text-sm font-semibold text-[#1E1E1E]"
                >
                  Studio Category <span className="text-[#7DBE20]">*</span>
                </label>

                <select
                  id={fieldId("category")}
                  name="category"
                  required
                  defaultValue={studio.category}
                  className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#1E1E1E] outline-none transition-colors focus:border-[#9CF237] focus:ring-2 focus:ring-[#9CF237]/20"
                >
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor={fieldId("location")}
                  className="text-sm font-semibold text-[#1E1E1E]"
                >
                  Location / Full Address{" "}
                  <span className="text-[#7DBE20]">*</span>
                </label>

                <Input
                  id={fieldId("location")}
                  name="location"
                  defaultValue={studio.location}
                  required
                  placeholder="Enter your studio address"
                  className="h-12 rounded-xl border-[#E5E7EB] focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                />
              </div>

            </div>
          </section>

          {/* 02. Pricing & Capacity */}
          <section>
            <div className="mb-6 border-b border-[#E5E7EB] pb-4">
              <h2 className="mt-2 font-heading text-2xl font-bold text-[#1E1E1E]">
                Set Your Pricing
              </h2>

              <p className="mt-2 text-sm text-[#6B7280]">
                Update your hourly rate and booking capacity.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">

              {/* Hourly Rate */}
              <div className="space-y-2">
                <label
                  htmlFor={fieldId("hourlyRate")}
                  className="text-sm font-semibold text-[#1E1E1E]"
                >
                  Hourly Rate ($){" "}
                  <span className="text-[#7DBE20]">*</span>
                </label>

                <Input
                  id={fieldId("hourlyRate")}
                  name="hourlyRate"
                  type="number"
                  min="0.01"
                  step="0.01"
                  defaultValue={studio.hourlyRate}
                  required
                  className="h-12 rounded-xl border-[#E5E7EB] focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                />
              </div>

              {/* Security Deposit */}
              <div className="space-y-2">
                <label
                  htmlFor={fieldId("securityDeposit")}
                  className="text-sm font-semibold text-[#1E1E1E]"
                >
                  Security Deposit ($){" "}
                  <span className="text-[#7DBE20]">*</span>
                </label>

                <Input
                  id={fieldId("securityDeposit")}
                  name="securityDeposit"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={studio.securityDeposit}
                  required
                  className="h-12 rounded-xl border-[#E5E7EB] focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                />
              </div>

              {/* Max Capacity */}
              <div className="space-y-2">
                <label
                  htmlFor={fieldId("maxCapacity")}
                  className="text-sm font-semibold text-[#1E1E1E]"
                >
                  Max Capacity{" "}
                  <span className="text-[#7DBE20]">*</span>
                </label>

                <Input
                  id={fieldId("maxCapacity")}
                  name="maxCapacity"
                  type="number"
                  min="1"
                  step="1"
                  defaultValue={studio.maxCapacity}
                  required
                  className="h-12 rounded-xl border-[#E5E7EB] focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
                />
              </div>

            </div>
          </section>

          {/* 03. Studio Image */}
          <section>
            <div className="mb-6 border-b border-[#E5E7EB] pb-4">
              <h2 className="mt-2 font-heading text-2xl font-bold text-[#1E1E1E]">
                Studio Image
              </h2>
            </div>

            <div className="space-y-2">
              <label
                htmlFor={fieldId("imageURL")}
                className="text-sm font-semibold text-[#1E1E1E]"
              >
                Image URL <span className="text-[#7DBE20]">*</span>
              </label>

              <Input
                id={fieldId("imageURL")}
                name="imageURL"
                type="url"
                defaultValue={studio.imageURL}
                required
                placeholder="https://example.com/studio-image.jpg"
                className="h-12 rounded-xl border-[#E5E7EB] focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
              />

              <p className="text-xs text-[#9CA3AF]">
                Provide a publicly accessible studio image URL.
              </p>
            </div>
          </section>

          {/* 04. Amenities */}
          <section>
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
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm transition-colors ${
                      checked
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
          </section>

          {/* 05. Overview */}
          <section>
            <div className="mb-6 border-b border-[#E5E7EB] pb-4">
              <h2 className="mt-2 font-heading text-2xl font-bold text-[#1E1E1E]">
                Studio Overview
              </h2>
            </div>

            <div className="space-y-2">
              <label
                htmlFor={fieldId("overview")}
                className="text-sm font-semibold text-[#1E1E1E]"
              >
                Detailed Description{" "}
                <span className="text-[#7DBE20]">*</span>
              </label>

              <Textarea
                id={fieldId("overview")}
                name="overview"
                defaultValue={studio.overview}
                required
                placeholder="Describe your studio, facilities, creative environment, and what makes it special..."
                className="min-h-36 resize-y rounded-xl border-[#E5E7EB] p-4 text-sm leading-7 focus-visible:border-[#9CF237] focus-visible:ring-[#9CF237]"
              />
            </div>
          </section>

          {/* 06. Owner Information */}
          <section>
            <div className="mb-6 border-b border-[#E5E7EB] pb-4">
              <h2 className="mt-2 font-heading text-2xl font-bold text-[#1E1E1E]">
                Studio Owner
              </h2>

              <p className="mt-2 text-sm text-[#6B7280]">
                Your account details cannot be changed.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">

              {/* Owner Name */}
              <div className="space-y-2">
                <label
                  htmlFor={fieldId("ownerName")}
                  className="text-sm font-semibold text-[#1E1E1E]"
                >
                  Owner Name
                </label>

                <Input
                  id={fieldId("ownerName")}
                  value={studio.owner.name}
                  readOnly
                  className="h-12 rounded-xl border-[#E5E7EB] bg-[#F4F5F6] text-[#6B7280]"
                />
              </div>

              {/* Owner Email */}
              <div className="space-y-2">
                <label
                  htmlFor={fieldId("ownerEmail")}
                  className="text-sm font-semibold text-[#1E1E1E]"
                >
                  Owner Email
                </label>

                <Input
                  id={fieldId("ownerEmail")}
                  type="email"
                  value={studio.owner.email}
                  readOnly
                  className="h-12 rounded-xl border-[#E5E7EB] bg-[#F4F5F6] text-[#6B7280]"
                />
              </div>

            </div>
          </section>

          {/* Footer Buttons */}
          <div className="border-t border-[#E5E7EB] pt-7">

            <div className="flex flex-col-reverse gap-3 sm:flex-row">

              {/* Cancel Button */}
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 w-full rounded-xl border-[#E5E7EB] text-sm font-semibold text-[#1E1E1E] hover:bg-[#F4F5F6] sm:w-auto sm:min-w-40"
                  >
                    Cancel
                  </Button>
                }
              />

              {/* Save Changes Button */}
              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-[#9CF237] text-sm font-bold text-[#1E1E1E] shadow-none transition-colors hover:bg-[#8DE62B] sm:w-auto sm:min-w-52"
              >
                Save Changes
                <span className="ml-2 text-lg">→</span>
              </Button>

            </div>

            <p className="mt-3 text-xs text-[#9CA3AF]">
              Review your studio information before saving changes.
            </p>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Update;
