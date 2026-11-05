
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  imageURL?: string;
  rating?: number | null;
}

// Loading Skeleton
const FeaturedStudioSkeleton = () => {
  return (
    <section className="bg-white px-5 py-16 font-body sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[2.5px] text-[#7DBE20]">
              <span className="h-2 w-2 rounded-full bg-[#9CF237]" />
              HANDPICKED CREATIVE SPACES
            </p>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1E1E1E] sm:text-4xl lg:text-5xl">
              Featured Studios
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B7280] sm:text-base">
              Explore inspiring creative workspaces and discover the perfect
              place to bring your next big idea to life.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <div className="h-4 w-28 animate-pulse rounded bg-[#F4F5F6]" />

            <Link
              href="/studios"
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 text-xs font-bold text-[#1E1E1E] transition-all hover:border-[#9CF237] hover:bg-[#F8FCEF]"
            >
              View All Studios
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <article
              key={item}
              className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
            >
              <div className="aspect-[4/3] animate-pulse bg-[#F4F5F6]" />

              <div className="space-y-4 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-[#F4F5F6]" />

                <div className="h-4 w-1/2 animate-pulse rounded bg-[#F4F5F6]" />

                <div className="h-4 w-1/3 animate-pulse rounded bg-[#F4F5F6]" />

                <div className="flex items-center justify-between gap-3 border-t border-[#E5E7EB] pt-5">
                  <div className="h-8 w-24 animate-pulse rounded bg-[#F4F5F6]" />

                  <div className="h-10 w-28 animate-pulse rounded-xl bg-[#F4F5F6]" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Featured Studios Data Component
const FeaturedStudioContent = async () => {
  let studios: Studio[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studiolimit`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch featured studios: ${res.status}`);
    }

    const data = await res.json();

    studios = Array.isArray(data) ? data : [];

    console.log("Featured Studios:", studios);
  } catch (error) {
    console.error("Featured Studio Error:", error);

    return (
      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-heading text-2xl font-bold text-[#1E1E1E]">
            Unable to Load Featured Studios
          </h2>

          <p className="mt-3 text-sm text-[#6B7280]">
            Please check your backend connection.
          </p>
        </div>
      </section>
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(price || 0);

  return (
    <section className="bg-white px-5 py-16 font-body sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[2.5px] text-[#7DBE20]">
              <span className="h-2 w-2 rounded-full bg-[#9CF237]" />
              HANDPICKED CREATIVE SPACES
            </p>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1E1E1E] sm:text-4xl lg:text-5xl">
              Featured Studios
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B7280] sm:text-base">
              Explore inspiring creative workspaces and discover the
              perfect place to bring your next big idea to life.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <p className="text-sm text-[#6B7280]">
              <span className="font-bold text-[#1E1E1E]">
                {studios.length}
              </span>{" "}
              Featured Spaces
            </p>

            <Link
              href="/studios"
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 text-xs font-bold text-[#1E1E1E] transition-all hover:border-[#9CF237] hover:bg-[#F8FCEF]"
            >
              View All Studios
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Featured Studio Grid */}
        {studios.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {studios.map((studio) => (
              <article
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#D3ECA9] hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
              >
                {/* Image */}
                <Link
                  href={`/studios/${studio._id}`}
                  className="relative block aspect-[4/3] overflow-hidden bg-[#F4F5F6]"
                >
                  {studio.imageURL ? (
                    <Image
                      src={studio.imageURL}
                      alt={studio.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-heading text-xl text-[#9CA3AF]">
                        StudioSpace
                      </span>
                    </div>
                  )}

                  {/* Category */}
                  <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#1E1E1E]">
                    {studio.category}
                  </span>
                </Link>

                {/* Details */}
                <div className="p-5">
                  <h3 className="line-clamp-1 font-heading text-xl font-bold text-[#1E1E1E]">
                    {studio.title}
                  </h3>

                  {/* Location */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-[#6B7280]">
                    <span>⌖</span>
                    <span className="line-clamp-1">
                      {studio.location}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="mt-4 flex items-center gap-2">
                    {typeof studio.rating === "number" &&
                    studio.rating > 0 ? (
                      <>
                        <span className="text-[#D6A72A]">★</span>

                        <span className="text-sm font-bold text-[#1E1E1E]">
                          {studio.rating.toFixed(1)}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-[#9CA3AF]">
                        New listing · Not rated yet
                      </span>
                    )}
                  </div>

                  {/* Price and Button */}
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E5E7EB] pt-5">

                    <div>
                      <p className="text-xs text-[#9CA3AF]">
                        Starting from
                      </p>

                      <p className="mt-1 text-lg font-bold text-[#1E1E1E]">
                        ${formatPrice(studio.hourlyRate)}

                        <span className="text-xs font-normal text-[#6B7280]">
                          {" "}/ hour
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#9CF237] px-4 text-xs font-bold text-[#1E1E1E] transition-colors hover:bg-[#8DE62B]"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </article>
            ))}

          </div>
        ) : (
          <div className="rounded-2xl border border-[#E5E7EB] bg-[#F4F5F6]/50 px-5 py-20 text-center">
            <h3 className="font-heading text-2xl font-bold text-[#1E1E1E]">
              No Featured Studios Yet
            </h3>

            <p className="mt-3 text-sm text-[#6B7280]">
              New creative spaces will appear here soon.
            </p>

            <Link
              href="/studios"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-[#9CF237] px-5 text-xs font-bold text-[#1E1E1E] transition hover:bg-[#8DE62B]"
            >
              Explore All Studios →
            </Link>
          </div>
        )}

        {/* Bottom Link */}
        {studios.length > 0 && (
          <div className="mt-9 text-center sm:hidden">
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#527D21]"
            >
              Explore All Creative Spaces →
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

// Suspense Wrapper
const FeaturedStudio = () => {
  return (
    <Suspense fallback={<FeaturedStudioSkeleton />}>
      <FeaturedStudioContent />
    </Suspense>
  );
};

export default FeaturedStudio;
