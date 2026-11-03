
import Image from "next/image";
import Link from "next/link";

export const instant = false;

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  imageURL?: string;
  rating?: number | null;
}

interface StudioPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

const Studio = async ({ searchParams }: StudioPageProps) => {
  const params = await searchParams;
  const selectedCategory = params.category || "";

  let studios: Studio[] = [];

  try {
    const res = await fetch("http://localhost:5000/add-studio", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch studios: ${res.status}`);
    }

    studios = await res.json();

    console.log("Server Response:", studios);
  } catch (error) {
    console.error("Studio Fetch Error:", error);

    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-white px-5">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-[#1E1E1E]">
            Unable to Load Studios
          </h2>
          <p className="mt-3 text-sm text-[#6B7280]">
            Please check your backend connection.
          </p>
        </div>
      </section>
    );
  }

  // Dynamic Categories From MongoDB
  const categories = [
    ...new Set(
      studios
        .map((studio) => studio.category?.trim())
        .filter((category): category is string => Boolean(category))
    ),
  ].sort((a, b) => a.localeCompare(b));

  // Functional Category Filter
  const filteredStudios = selectedCategory
    ? studios.filter(
        (studio) =>
          studio.category?.trim().toLowerCase() ===
          selectedCategory.trim().toLowerCase()
      )
    : studios;

  return (
    <section className="min-h-screen bg-white px-5 py-14 font-body sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[2.5px] text-[#7DBE20]">
            Discover Your Creative Space
          </p>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-heading text-4xl font-bold text-[#1E1E1E] sm:text-5xl">
                Explore Studios
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B7280] sm:text-base">
                Discover inspiring workspaces and find the perfect
                environment for your next creative project.
              </p>
            </div>

            <p className="text-sm text-[#6B7280]">
              <span className="font-bold text-[#1E1E1E]">
                {filteredStudios.length}
              </span>{" "}
              Creative Spaces
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F4F5F6]/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          
          <div>
            <h2 className="text-sm font-bold text-[#1E1E1E]">
              Filter by Category
            </h2>
            <p className="mt-1 text-xs text-[#6B7280]">
              Choose a creative space category to explore.
            </p>
          </div>

          <form
            action="/studios"
            method="GET"
            className="flex flex-col gap-2 sm:flex-row"
          >
            <select
              name="category"
              defaultValue={selectedCategory}
              className="h-11 w-full min-w-0 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#1E1E1E] outline-none transition focus:border-[#9CF237] focus:ring-2 focus:ring-[#9CF237]/20 sm:min-w-[210px]"
            >
              <option value="">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="h-11 rounded-xl bg-[#9CF237] px-5 text-sm font-bold text-[#1E1E1E] transition-colors hover:bg-[#8DE62B]"
            >
              Apply Filter
            </button>

            {selectedCategory && (
              <Link
                href="/studios"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#6B7280] transition-colors hover:border-[#9CF237] hover:text-[#1E1E1E]"
              >
                Clear
              </Link>
            )}
          </form>
        </div>

        {/* Studio Grid */}
        {filteredStudios.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
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
                  <h2 className="line-clamp-1 font-heading text-xl font-bold text-[#1E1E1E]">
                    {studio.title}
                  </h2>

                  {/* Location */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-[#6B7280]">
                    <span>⌖</span>
                    <span className="line-clamp-1">
                      {studio.location}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="mt-4 flex items-center gap-2">
                    {studio.rating && studio.rating > 0 ? (
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
                        ${studio.hourlyRate}
                        <span className="text-xs font-normal text-[#6B7280]">
                          {" "}/ hour
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#9CF237] px-4 text-xs font-bold text-[#1E1E1E] transition-colors hover:bg-[#8DE62B]"
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
            <h2 className="font-heading text-2xl font-bold text-[#1E1E1E]">
              {studios.length > 0
                ? "No Studios Found"
                : "No Studios Available Yet"}
            </h2>

            <p className="mt-3 text-sm text-[#6B7280]">
              {studios.length > 0
                ? "No studios are available in this category. Try another category."
                : "New creative spaces will appear here soon."}
            </p>

            {selectedCategory && (
              <Link
                href="/studios"
                className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-[#9CF237] px-5 text-xs font-bold text-[#1E1E1E] hover:bg-[#8DE62B]"
              >
                View All Studios
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Studio;
