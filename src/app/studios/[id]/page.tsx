
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Studio {
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
  rating?: number;
  reviews?: {
    _id?: string;
    name?: string;
    rating: number;
    comment: string;
    createdAt?: string;
  }[];
  gallery?: string[];
  owner: {
    name: string;
    email: string;
    image?: string;
  };
}

const StudioDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  let studioDetails: Studio;

  try {
    const res = await fetch(`http://localhost:5000/add-studio/${id}`, {
      cache: "no-store",
    });

    if (res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      throw new Error("Failed to fetch studio details");
    }

    studioDetails = await res.json();

    console.log("Studio Details:", studioDetails);
  } catch (error) {
    console.error("Studio Details Error:", error);

    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-white px-5">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-[#1E1E1E]">
            Unable to Load Studio
          </h2>
          <p className="mt-3 text-sm text-[#6B7280]">
            Please check your connection and try again.
          </p>
          <Link
            href="/studios"
            className="mt-6 inline-flex rounded-xl bg-[#9CF237] px-6 py-3 text-sm font-bold text-[#1E1E1E]"
          >
            Explore Studios
          </Link>
        </div>
      </section>
    );
  }

  // Studio Gallery
  const galleryImages = [
    studioDetails.imageURL,
    ...(studioDetails.gallery || []),
  ].filter(
    (image, index, array) =>
      Boolean(image) && array.indexOf(image) === index
  );

  // Host Information
  const ownerName = studioDetails.owner?.name || "Studio Host";

  // Price Formatter
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(price);

  const reviews = studioDetails.reviews || [];

  return (
    <section className="min-h-screen bg-white px-5 py-10 font-body sm:px-8 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-7xl">

        
       

        {/* Studio Heading */}
        <div className="mb-8">
          

          <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#1E1E1E] sm:text-4xl lg:text-5xl">
            {studioDetails.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#6B7280]">
            <span className="flex items-center gap-2">
              <span>⌖</span>
              {studioDetails.location}
            </span>

            <span className="flex items-center gap-1.5">
              <span className="text-[#D6A72A]">★</span>
              {studioDetails.rating && studioDetails.rating > 0
                ? studioDetails.rating.toFixed(1)
                : "Not rated yet"}
            </span>

            <span>{studioDetails.maxCapacity} People Capacity</span>
          </div>
        </div>

        {/* Studio Gallery */}
        <div className="mb-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-[#F4F5F6] sm:aspect-[16/8] lg:aspect-[16/7]">
            {galleryImages.length > 0 && (
              <Image
                src={galleryImages[0]}
                alt={studioDetails.title}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            <span className="absolute bottom-6 left-6 rounded-full border border-white/30 bg-black/30 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
              {galleryImages.length} Studio {galleryImages.length === 1 ? "Image" : "Images"}
            </span>
          </div>

          {/* Gallery Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              {galleryImages.slice(1).map((image, index) => (
                <div
                  key={image}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#F4F5F6]"
                >
                  <Image
                    src={image}
                    alt={`${studioDetails.title} image ${index + 2}`}
                    fill
                    unoptimized
                    sizes="200px"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Details Layout */}
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_350px] lg:gap-14">

          {/* Left Content */}
          <div className="space-y-11">

            {/* Overview */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">
                About This Space
              </h2>

              <p className="mt-5 text-sm leading-8 text-[#6B7280] sm:text-base">
                {studioDetails.overview}
              </p>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">
                Studio Specifications
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-[#E5E7EB] p-5">
                  <p className="text-xs text-[#9CA3AF]">
                    Hourly Rate
                  </p>
                  <p className="mt-2 text-xl font-bold text-[#1E1E1E]">
                    ${formatPrice(studioDetails.hourlyRate)}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E5E7EB] p-5">
                  <p className="text-xs text-[#9CA3AF]">
                    Security Deposit
                  </p>
                  <p className="mt-2 text-xl font-bold text-[#1E1E1E]">
                    ${formatPrice(studioDetails.securityDeposit)}
                  </p>
                </div>

                <div className="col-span-2 rounded-2xl border border-[#E5E7EB] p-5 sm:col-span-1">
                  <p className="text-xs text-[#9CA3AF]">
                    Maximum Capacity
                  </p>
                  <p className="mt-2 text-xl font-bold text-[#1E1E1E]">
                    {studioDetails.maxCapacity} People
                  </p>
                </div>

              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">
                Amenities & Facilities
              </h2>

              {studioDetails.amenities?.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {studioDetails.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F4F5F6]/50 px-4 py-3.5"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F0F9E6] text-sm font-bold text-[#648F27]">
                        ✓
                      </span>

                      <span className="text-sm font-medium text-[#1E1E1E]">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-[#9CA3AF]">
                  No amenities available.
                </p>
              )}
            </div>

            {/* Host Details */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">
                Meet Your Host
              </h2>

              <div className="mt-5 flex items-center gap-4 rounded-2xl border border-[#E5E7EB] p-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F0F9E6] font-heading text-xl font-bold text-[#1E1E1E]">
                  {studioDetails.owner?.image ? (
                    <Image
                      src={studioDetails.owner.image}
                      alt={ownerName}
                      width={56}
                      height={56}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    ownerName.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-[#1E1E1E]">
                    {ownerName}
                  </p>

                  <p className="mt-1 text-sm text-[#6B7280]">
                    Studio Host
                  </p>

                  <p className="mt-1 break-all text-xs text-[#9CA3AF]">
                    {studioDetails.owner?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">
                  Guest Reviews
                </h2>

                <span className="text-xs text-[#9CA3AF]">
                  {reviews.length} Reviews
                </span>
              </div>

              {reviews.length > 0 ? (
                <div className="mt-5 space-y-4">
                  {reviews.map((review, index) => (
                    <div
                      key={review._id || index}
                      className="rounded-2xl border border-[#E5E7EB] p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-[#1E1E1E]">
                          {review.name || "Studio Guest"}
                        </p>

                        <span className="text-sm font-semibold text-[#B58B27]">
                          ★ {review.rating.toFixed(1)}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                        {review.comment}
                      </p>

                      {review.createdAt && (
                        <p className="mt-3 text-xs text-[#9CA3AF]">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-[#E5E7EB] bg-[#F4F5F6]/50 px-5 py-10 text-center">
                  <h3 className="font-heading text-xl font-bold text-[#1E1E1E]">
                    No Reviews Yet
                  </h3>

                  <p className="mt-2 text-sm text-[#6B7280]">
                    Be the first to share your experience with this studio.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Booking Card */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.05)]">

              <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#9CA3AF]">
                Starting From
              </p>

              <p className="mt-2 text-3xl font-bold text-[#1E1E1E]">
                ${formatPrice(studioDetails.hourlyRate)}
                <span className="text-sm font-normal text-[#6B7280]">
                  {" "}/ hour
                </span>
              </p>

              <div className="my-6 space-y-4 border-y border-[#E5E7EB] py-5">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-[#6B7280]">Category</span>
                  <span className="text-right font-semibold text-[#1E1E1E]">
                    {studioDetails.category}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-[#6B7280]">Capacity</span>
                  <span className="font-semibold text-[#1E1E1E]">
                    {studioDetails.maxCapacity} People
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-[#6B7280]">Security Deposit</span>
                  <span className="font-semibold text-[#1E1E1E]">
                    ${formatPrice(studioDetails.securityDeposit)}
                  </span>
                </div>
              </div>

              <Link
                href="#booking-modal"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#9CF237] text-sm font-bold text-[#1E1E1E] transition-colors hover:bg-[#8DE62B]"
              >
                Book Workspace Now
                <span className="text-lg">→</span>
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-[#9CA3AF]">
                Booking availability and final confirmation are subject to host approval.
              </p>
            </div>
          </aside>

        </div>
      </div>

      {/* Booking Modal - Same File, No Extra Component */}
      <div
        id="booking-modal"
        className="fixed inset-0 z-[100] hidden items-center justify-center overflow-y-auto bg-[#1E1E1E]/60 px-4 py-8 backdrop-blur-sm target:flex"
      >
        <Link
          href="#"
          aria-label="Close booking modal"
          className="absolute inset-0 cursor-default"
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
          className="relative z-10 my-auto w-full max-w-lg rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-2xl sm:p-8"
        >
          {/* Modal Heading */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[2px] text-[#7DBE20]">
                StudioSpace Booking
              </p>

              <h2
                id="booking-title"
                className="mt-2 font-heading text-2xl font-bold text-[#1E1E1E]"
              >
                Reserve Your Workspace
              </h2>

              <p className="mt-2 text-sm text-[#6B7280]">
                {studioDetails.title}
              </p>
            </div>

            <Link
              href="#"
              aria-label="Close modal"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4F5F6] text-xl text-[#1E1E1E] transition-colors hover:bg-[#9CF237]"
            >
              ×
            </Link>
          </div>

          {/* Booking Form UI */}
          <form
            action="#booking-modal"
            method="get"
            className="mt-7 space-y-5"
          >
            <div className="space-y-2">
              <label
                htmlFor="bookingDate"
                className="text-sm font-semibold text-[#1E1E1E]"
              >
                Booking Date
              </label>

              <input
                id="bookingDate"
                name="bookingDate"
                type="date"
                required
                className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:border-[#9CF237] focus:ring-2 focus:ring-[#9CF237]/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="startTime"
                  className="text-sm font-semibold text-[#1E1E1E]"
                >
                  Start Time
                </label>

                <input
                  id="startTime"
                  name="startTime"
                  type="time"
                  required
                  className="h-12 w-full rounded-xl border border-[#E5E7EB] px-3 text-sm outline-none focus:border-[#9CF237] focus:ring-2 focus:ring-[#9CF237]/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="duration"
                  className="text-sm font-semibold text-[#1E1E1E]"
                >
                  Duration (Hours)
                </label>

                <input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  defaultValue="1"
                  required
                  className="h-12 w-full rounded-xl border border-[#E5E7EB] px-4 text-sm outline-none focus:border-[#9CF237] focus:ring-2 focus:ring-[#9CF237]/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="guests"
                className="text-sm font-semibold text-[#1E1E1E]"
              >
                Number of Guests
              </label>

              <input
                id="guests"
                name="guests"
                type="number"
                min="1"
                max={studioDetails.maxCapacity}
                defaultValue="1"
                required
                className="h-12 w-full rounded-xl border border-[#E5E7EB] px-4 text-sm outline-none focus:border-[#9CF237] focus:ring-2 focus:ring-[#9CF237]/20"
              />

              <p className="text-xs text-[#9CA3AF]">
                Maximum capacity: {studioDetails.maxCapacity} people
              </p>
            </div>

            {/* Price Details */}
            <div className="rounded-xl bg-[#F4F5F6] p-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Hourly Rate</span>
                <span className="font-semibold text-[#1E1E1E]">
                  ${formatPrice(studioDetails.hourlyRate)}
                </span>
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span className="text-[#6B7280]">Security Deposit</span>
                <span className="font-semibold text-[#1E1E1E]">
                  ${formatPrice(studioDetails.securityDeposit)}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-[#9CA3AF]">
                Final booking amount depends on the selected duration.
              </p>
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#9CF237] text-sm font-bold text-[#1E1E1E] shadow-none transition hover:bg-[#8DE62B]"
            >
              Continue Booking
              <span className="ml-2 text-lg">→</span>
            </button>

            <p className="text-center text-xs leading-5 text-[#9CA3AF]">
              Booking submission and payment are not connected yet.
            </p>
          </form>
        </div>
      </div>

    </section>
  );
};

export default StudioDetails;
