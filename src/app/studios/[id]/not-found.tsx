
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] items-center overflow-hidden bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-20">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#9CF237]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#9CF237]/10 blur-[110px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">

        {/* LEFT CONTENT */}
        <section className="relative z-10 order-2 lg:order-1">

          {/* Eyebrow */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9CF237] opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#9CF237]" />
            </span>

            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1E1E1E]">
              Error 404 · Lost in Creativity
            </span>
          </div>

          {/* Large 404 */}
          <div className="relative">
            <h1 className="select-none font-serif text-[clamp(105px,20vw,190px)] font-semibold leading-[0.78] tracking-[-0.085em] text-[#1E1E1E]">
              4<span className="relative text-[#9CF237]">0</span>4
            </h1>

            <span className="absolute -right-2 top-0 hidden rotate-12 rounded-full border border-[#E5E7EB] bg-[#F4F5F6] px-4 py-2 font-sans text-[10px] font-semibold tracking-widest text-[#6B7280] sm:block">
              PAGE MISSING
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="mt-10 max-w-xl font-serif text-3xl font-medium leading-[1.2] text-[#1E1E1E] sm:text-4xl lg:text-[48px]">
            Not every path leads to a{" "}
            <span className="italic text-[#8BCF2F]">
              creative space.
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-lg font-sans text-sm leading-7 text-[#6B7280] sm:text-base">
            Looks like this page has stepped out of the studio.
            The link might be broken, or the page may have moved.
            Let’s get you back to discovering something extraordinary.
          </p>

          {/* Action Buttons */}
          <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row">

            <Link
              href="/"
              className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-[#9CF237] px-8 font-sans text-sm font-semibold text-[#1E1E1E] shadow-[0_8px_25px_rgba(156,242,55,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#8FE02E] hover:shadow-[0_12px_30px_rgba(156,242,55,0.25)]"
            >
              <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Back to Homepage
            </Link>

            <Link
              href="/studios"
              className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full border border-[#E5E7EB] bg-white px-8 font-sans text-sm font-semibold text-[#1E1E1E] transition-all duration-300 hover:-translate-y-1 hover:border-[#9CF237] hover:bg-[#F4F5F6]"
            >
              Explore Studios
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

          </div>

          {/* Bottom Note */}
          <div className="mt-12 flex items-center gap-4 border-t border-[#E5E7EB] pt-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F5F6] text-xl text-[#1E1E1E]">
              ✳
            </div>

            <div>
              <p className="font-sans text-xs font-semibold text-[#1E1E1E]">
                Your next creative journey starts here.
              </p>
              <p className="mt-1 font-sans text-xs text-[#9CA3AF]">
                Discover. Create. Inspire.
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT VISUAL */}
        <section className="relative order-1 mx-auto w-full max-w-[560px] lg:order-2">

          {/* Main Visual Container */}
          <div className="group relative aspect-[1/1] overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-[#F4F5F6] sm:rounded-[40px]">

            {/* Background Grid */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(#D1D5DB 1px, transparent 1px), linear-gradient(90deg, #D1D5DB 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />

            {/* Background Glow */}
            <div className="absolute left-1/2 top-[42%] h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9CF237]/20 blur-[75px]" />

            {/* Top Floating Label */}
            <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-md sm:left-8 sm:top-8">
              <span className="h-2 w-2 rounded-full bg-[#9CF237]" />
              <span className="font-sans text-[9px] font-semibold tracking-[0.2em] text-[#1E1E1E]">
                CREATIVE SPACE
              </span>
            </div>

            {/* Top Right Decor */}
            <div className="absolute right-7 top-8 z-10 flex h-12 w-12 rotate-12 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition-transform duration-500 group-hover:rotate-45">
              <span className="text-2xl text-[#9CF237]">✳</span>
            </div>

            {/* Studio Spotlight */}
            <div className="absolute left-1/2 top-[16%] h-[75%] w-[75%] -translate-x-1/2 rounded-t-full bg-gradient-to-b from-[#9CF237]/25 via-white/40 to-transparent blur-2xl" />

            {/* Studio Arch */}
            <div className="absolute bottom-[10%] left-1/2 h-[72%] w-[65%] -translate-x-1/2 overflow-hidden rounded-t-[180px] border border-[#D1D5DB] bg-white p-2 shadow-[0_25px_70px_rgba(30,30,30,0.09)] transition-transform duration-700 group-hover:-translate-y-2 sm:rounded-t-[220px]">

              {/* Inner Studio Wall */}
              <div className="relative h-full w-full overflow-hidden rounded-t-[170px] bg-[#F4F5F6] sm:rounded-t-[210px]">

                {/* Lime Studio Backdrop */}
                <div className="absolute left-1/2 top-[12%] h-[52%] w-[72%] -translate-x-1/2 rounded-t-full bg-[#9CF237]/80" />

                {/* Spotlight Beam */}
                <div className="absolute left-1/2 top-0 h-[65%] w-[80%] -translate-x-1/2 bg-gradient-to-b from-white/70 to-transparent" />

                {/* Creative Studio Floor */}
                <div className="absolute bottom-0 h-[30%] w-full bg-[#E5E7EB]/70" />

                {/* Studio Camera Silhouette */}
                <div className="absolute bottom-[23%] left-1/2 z-10 -translate-x-1/2">

                  {/* Camera Body */}
                  <div className="relative h-14 w-20 rounded-xl border border-[#1E1E1E] bg-[#1E1E1E] shadow-xl sm:h-[70px] sm:w-28">

                    {/* Camera Top */}
                    <div className="absolute -top-3 left-4 h-3 w-7 rounded-t-md bg-[#1E1E1E]" />

                    {/* Lens */}
                    <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#6B7280] bg-[#1E1E1E] sm:h-14 sm:w-14">
                      <div className="h-6 w-6 rounded-full border-2 border-[#9CF237] bg-[#374151] shadow-[0_0_12px_rgba(156,242,55,0.3)] sm:h-8 sm:w-8" />
                    </div>

                    {/* Camera Indicator */}
                    <div className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#9CF237]" />
                  </div>

                  {/* Tripod */}
                  <div className="relative mx-auto h-20 w-1 bg-[#1E1E1E] sm:h-24" />

                  <div className="absolute left-1/2 top-[65%] flex w-28 -translate-x-1/2 justify-between sm:w-36">
                    <div className="h-16 w-[3px] rotate-[18deg] rounded-full bg-[#1E1E1E]" />
                    <div className="h-16 w-[3px] -rotate-[18deg] rounded-full bg-[#1E1E1E]" />
                  </div>
                </div>

                {/* Studio Floor Line */}
                <div className="absolute bottom-[8%] left-0 h-px w-full bg-[#D1D5DB]" />

              </div>
            </div>

            {/* Bottom Floating Text */}
            <div className="absolute bottom-5 left-5 z-20 sm:bottom-8 sm:left-8">
              <p className="font-serif text-2xl font-semibold text-[#1E1E1E] sm:text-3xl">
                Lost in space?
              </p>
              <p className="mt-1 font-sans text-xs tracking-wide text-[#6B7280]">
                Let creativity guide you back.
              </p>
            </div>

            {/* Bottom Right Decoration */}
            <div className="absolute bottom-7 right-7 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-[#9CF237] shadow-lg transition-transform duration-500 group-hover:rotate-12">
              <span className="text-xl text-[#1E1E1E]">↗</span>
            </div>

          </div>

          {/* Floating Error Card */}
          <div className="absolute -bottom-5 right-4 z-30 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_15px_45px_rgba(30,30,30,0.10)] sm:-right-5 sm:bottom-9 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9CF237]/20">
                <span className="font-serif text-lg font-bold text-[#1E1E1E]">
                  !
                </span>
              </div>

              <div>
                <p className="font-sans text-xs font-semibold text-[#1E1E1E]">
                  Oops! Wrong Direction
                </p>
                <p className="mt-1 font-sans text-[10px] text-[#9CA3AF]">
                  Error code: 404
                </p>
              </div>
            </div>
          </div>

          {/* Side Vertical Label */}
          <div className="absolute -right-8 top-1/2 hidden -translate-y-1/2 rotate-90 font-sans text-[9px] font-semibold tracking-[0.3em] text-[#9CA3AF] xl:block">
            STUDIO SPACE / LOST & FOUND
          </div>

        </section>
      </div>
    </main>
  );
}
