
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1400&q=85",
    title: "Professional Music Studios",
    category: "Music & Recording",
    description: "Find your perfect sound.",
    alt: "Professional music recording studio",
  },
  {
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1400&q=85",
    title: "Podcast & Content Studios",
    category: "Podcast & Media",
    description: "Bring your ideas to life.",
    alt: "Professional podcast recording studio",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=85",
    title: "Creative Photography Spaces",
    category: "Photography",
    description: "Create something extraordinary.",
    alt: "Professional photography equipment",
  },
];

const categories = [
  "Photography",
  "Podcast",
  "Music",
  "Film & Video",
  "Art",
];

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  const currentSlide = slides[activeSlide];

  return (
    <section className="relative isolate overflow-hidden bg-white">

      {/* Subtle Background Decoration */}
      <div className="pointer-events-none absolute -right-40 top-10 -z-10 h-[450px] w-[450px] rounded-full bg-[#9CF237]/10 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-28">

        {/* LEFT CONTENT */}
        <div className="max-w-xl">

          {/* Eyebrow */}
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#E5E7EB] bg-[#FAFCF7] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#9CF237] shadow-[0_0_10px_rgba(156,242,55,0.8)]" />
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#477D16] sm:text-xs">
              A Creative Space Marketplace
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-[44px] font-bold leading-[1.08] tracking-[-1.8px] text-[#1E1E1E] sm:text-6xl lg:text-[68px] lg:tracking-[-2.5px]">
            Find Your Space.
            <br />

            Create Your
            <br />

            <span className="relative z-0 inline-block">
              Next Big Thing.
              <span className="absolute bottom-[5px] left-0 -z-10 h-3 w-full rounded-sm bg-[#9CF237] sm:h-4" />
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-[490px] text-[15px] leading-[1.9] text-[#6B7280] sm:text-base">
            Discover and book inspiring creative spaces for your next
            project. From photography studios to podcast lounges and
            music recording suites, find the perfect place to bring
            your ideas to life.
          </p>

          {/* Action Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">

            <Link
              href="/studios"
              className="group inline-flex h-[54px] items-center justify-center gap-3 rounded-xl bg-[#9CF237] px-7 text-sm font-bold text-[#1E1E1E] shadow-[0_5px_20px_rgba(156,242,55,0.15)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#8DE62B] hover:shadow-[0_10px_25px_rgba(156,242,55,0.25)]"
            >
              Explore Studios

              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex h-[54px] items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-7 text-sm font-semibold text-[#1E1E1E] transition-all duration-300 hover:border-[#9CF237] hover:bg-[#F8FCEF]"
            >
              How It Works
            </Link>
          </div>

          {/* Categories */}
          <div className="mt-12 border-t border-[#E5E7EB] pt-7">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#9CA3AF]">
              Explore Creative Spaces
            </p>

            <div className="flex flex-wrap gap-2.5">
              {categories.map((category) => (
                <Link
                  key={category}
                  href="/studios"
                  className="rounded-full border border-[#E5E7EB] bg-[#F8F9F8] px-4 py-2.5 text-xs font-medium text-[#4B5563] transition-all duration-200 hover:border-[#9CF237] hover:bg-[#F4FAEB] hover:text-[#1E1E1E]"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE SLIDER */}
        <div className="relative mx-auto w-full max-w-[580px] lg:ml-auto">

          {/* Main Image Card */}
          <Card className="relative overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-[#F4F5F6] p-0 shadow-[0_25px_70px_rgba(0,0,0,0.12)]">
            <CardContent className="relative aspect-[4/4.5] overflow-hidden p-0 sm:aspect-[5/4.5]">

              {/* Images */}
              {slides.map((slide, index) => (
                <Image
                  key={slide.image}
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 580px"
                  className={`object-cover transition-all duration-1000 ease-in-out ${
                    activeSlide === index
                      ? "scale-100 opacity-100"
                      : "scale-105 opacity-0"
                  }`}
                />
              ))}

              {/* Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10" />

              {/* Top Left Label */}
              <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
                <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-xl">
                  <span className="text-sm text-[#1E1E1E]">✦</span>
                  <span className="text-[11px] font-semibold text-[#1E1E1E]">
                    Discover Creative Spaces
                  </span>
                </div>
              </div>

              {/* Slide Counter */}
              <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/35 px-4 py-2.5 text-[11px] font-semibold tracking-wider text-white backdrop-blur-xl sm:right-7 sm:top-7">
                0{activeSlide + 1} / 0{slides.length}
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">

                <Badge className="mb-4 rounded-full border border-[#9CF237]/30 bg-[#9CF237] px-3 py-1.5 text-[10px] font-bold text-[#1E1E1E] hover:bg-[#9CF237]">
                  {currentSlide.category}
                </Badge>

                <h2 className="max-w-md font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">
                  {currentSlide.title}
                </h2>

                <p className="mt-2 text-sm text-white/75">
                  {currentSlide.description}
                </p>

                {/* Slider Navigation */}
                <div className="mt-8 flex items-center justify-between">

                  {/* Indicators */}
                  <div className="flex items-center gap-2.5">
                    {slides.map((slide, index) => (
                      <button
                        key={slide.image}
                        type="button"
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={activeSlide === index}
                        onClick={() => setActiveSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeSlide === index
                            ? "w-9 bg-[#9CF237]"
                            : "w-2 bg-white/50 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Previous & Next */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prevSlide}
                      aria-label="Previous slide"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xl text-white backdrop-blur-md transition-all duration-300 hover:border-[#9CF237] hover:bg-[#9CF237] hover:text-[#1E1E1E]"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      onClick={nextSlide}
                      aria-label="Next slide"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xl text-white backdrop-blur-md transition-all duration-300 hover:border-[#9CF237] hover:bg-[#9CF237] hover:text-[#1E1E1E]"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Floating Info Card */}
          <div className="absolute -bottom-7 -left-2 rounded-2xl border border-[#E5E7EB]/80 bg-white/95 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.13)] backdrop-blur-xl sm:-left-8 sm:p-5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F9E6]">
                <span className="text-2xl text-[#1E1E1E]">✦</span>
              </div>

              <div>
                <p className="text-sm font-bold text-[#1E1E1E]">
                  One space. Endless ideas.
                </p>

                <p className="mt-1 text-xs text-[#6B7280]">
                  Built for creative minds.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
