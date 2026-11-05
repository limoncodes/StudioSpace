
"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiUsers, FiEdit2, FiTrash2 } from "react-icons/fi";
import Update from "@/components/mylistbutton/Update";
import MylistingDelete from "@/components/mylistbutton/MylistingDelete";
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

const MyListing = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [listings, setListings] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    

    const fetchListings = async () => {
      const token = await getTokenFormClient()
      
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/my-listings/${encodeURIComponent(user.email)}`
        ,{
          headers:{
             Authorization: `Bearer ${token}`,
          }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch listings");
        }

        const data: Studio[] = await res.json();

        setListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#9CF237]" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-[var(--font-playfair)] text-3xl font-semibold text-[#1E1E1E] sm:text-4xl">
                My Listings
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Manage your creative spaces and studio information.
              </p>
            </div>

            <p className="text-sm text-gray-500">
              Total Studios:{" "}
              <span className="font-semibold text-[#1E1E1E]">
                {listings.length}
              </span>
            </p>
          </div>
        </div>

        {/* Studio Cards */}
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {listings.map((studio) => (
              <article
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-[#F4F5F6]">
                  <Image
                    src={studio.imageURL}
                    alt={studio.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#1E1E1E]">
                    {studio.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5">

                  <h2 className="line-clamp-1 font-[var(--font-playfair)] text-xl font-semibold text-[#1E1E1E]">
                    {studio.title}
                  </h2>

                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <FiMapPin size={15} className="shrink-0" />
                    <span className="line-clamp-1">
                      {studio.location}
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="my-5 grid grid-cols-2 gap-4 border-y border-[#E5E7EB] py-4">
                    <div>
                      <p className="text-xs text-gray-500">
                        Hourly Rate
                      </p>

                      <p className="mt-1 text-xl font-semibold text-[#1E1E1E]">
                        ${studio.hourlyRate}
                        <span className="ml-1 text-xs font-normal text-gray-500">
                          / hour
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Security Deposit
                      </p>

                      <p className="mt-1 text-xl font-semibold text-[#1E1E1E]">
                        ${studio.securityDeposit}
                      </p>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                    <FiUsers size={16} />
                    <span>Up to {studio.maxCapacity} guests</span>
                  </div>

                  {/* Amenities */}
                  <div className="mb-5 flex min-h-7 flex-wrap gap-2">
                    {studio.amenities?.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full bg-[#F4F5F6] px-3 py-1.5 text-xs text-gray-600"
                      >
                        {amenity}
                      </span>
                    ))}

                    {studio.amenities?.length > 3 && (
                      <span className="rounded-full bg-[#F4F5F6] px-3 py-1.5 text-xs text-gray-500">
                        +{studio.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Update & Delete */}
                  <div className="grid grid-cols-2 gap-3 border-t border-[#E5E7EB] pt-4">

                    <Update studio={studio}/>
                    <MylistingDelete
                      studio={studio}
                      onDeleted={() =>
                        setListings((current) =>
                          current.filter((listing) => listing._id !== studio._id)
                        )
                      }
                    />
                   

                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-[#F4F5F6]/50 px-5 py-16 text-center">
            <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-[#1E1E1E]">
              No Listings Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              You haven't added any studio listings yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyListing;
