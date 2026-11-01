
export default function Loading() {
  return (
    <section className="flex min-h-[65vh] w-full items-center justify-center bg-white px-5 py-16 font-body">

      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center text-center"
      >
        {/* Animated Logo */}
        <div className="relative mb-7 flex h-20 w-20 items-center justify-center">

          {/* Rotating Border */}
          <div className="absolute inset-0 rounded-[26px] border-2 border-[#E5E7EB] border-t-[#9CF237] border-r-[#9CF237] motion-safe:animate-spin" />

          {/* Logo Background */}
          <div className="flex h-[66px] w-[66px] items-center justify-center rounded-[21px] bg-[#F4F5F6]">
            <span className="font-heading text-4xl font-bold text-[#1E1E1E]">
              S
            </span>
          </div>

          {/* Lime Indicator */}
          <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-white bg-[#9CF237] motion-safe:animate-pulse" />
        </div>

        {/* Brand */}
        <p className="text-[11px] font-bold uppercase tracking-[3px] text-[#7DBE20]">
          STUDIOSPACE
        </p>

        {/* Loading Title */}
        <h2 className="mt-3 font-heading text-2xl font-bold text-[#1E1E1E] sm:text-3xl">
          Preparing Your Creative Space
        </h2>

        <p className="mt-3 text-sm text-[#6B7280]">
          Creating a seamless creative experience...
        </p>

        {/* Animated Loading Bar */}
        <div className="mt-8 h-1 w-36 overflow-hidden rounded-full bg-[#F4F5F6]">
          <div className="h-full w-1/2 rounded-full bg-[#9CF237] motion-safe:animate-pulse" />
        </div>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[2px] text-[#9CA3AF]">
          Please wait
        </p>
      </div>
    </section>
  );
}
