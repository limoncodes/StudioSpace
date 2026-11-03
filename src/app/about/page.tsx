
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const images = [
  {
    src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1400&q=85",
    alt: "Professional music recording studio",
    title: "Music & Recording",
  },
  {
    src: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1000&q=85",
    alt: "Professional podcast recording studio",
    title: "Podcast & Media",
  },
  {
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=85",
    alt: "Professional photography equipment",
    title: "Photography",
  },
];

const values = [
  {
    number: "01",
    title: "Accessibility",
    description:
      "We make it easier for creators to discover creative spaces that suit their projects and requirements.",
  },
  {
    number: "02",
    title: "Simplicity",
    description:
      "From exploring studio details to sending a booking request, we aim for a straightforward experience.",
  },
  {
    number: "03",
    title: "Creativity",
    description:
      "We believe the right environment can help creators focus, experiment, and bring their ideas to life.",
  },
];

const supportItems = [
  {
    number: "01",
    title: "Clear Studio Information",
    description:
      "Explore studio facilities, amenities, capacity, and pricing before making your booking decision.",
  },
  {
    number: "02",
    title: "Booking Guidance",
    description:
      "Understand your booking details, preferred hours, and confirmation process.",
  },
  {
    number: "03",
    title: "Host Information",
    description:
      "Find studio owner details to understand who manages your chosen creative space.",
  },
];

const AboutPage = () => {
  return (
    <main className="overflow-hidden bg-white font-body text-[#1E1E1E]">

      {/* Editorial Introduction */}
      <section className="px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pt-10">
        <div className="mx-auto max-w-7xl">

          <div className="mt-12 grid gap-8 border-b border-[#E5E7EB] pb-12 md:grid-cols-[1.2fr_0.8fr] md:items-end lg:mt-16 lg:pb-16">

            <div>
              <Badge
                variant="outline"
                className="gap-2 rounded-full border-[#E5E7EB] bg-[#F8FAF5] px-4 py-2 text-[10px] font-bold tracking-[2px] text-[#527D21]"
              >
                <span className="h-2 w-2 rounded-full bg-[#9CF237]" />
                GET TO KNOW US
              </Badge>

              <h1 className="mt-7 max-w-3xl font-heading text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-[64px]">
                A Place Where
                <span className="block">
                  <span className="relative inline-block">
                    Creativity
                    <span className="absolute bottom-1 left-0 -z-10 h-3 w-full bg-[#9CF237]/60" />
                  </span>
                  Belongs.
                </span>
              </h1>
            </div>

            <div className="max-w-md md:ml-auto">
              <p className="text-sm leading-8 text-[#6B7280] sm:text-base">
                We believe every great idea deserves the right environment.
                StudioSpace connects creative people with inspiring
                workspaces, making it easier to find a place where ideas
                can become reality.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-[3px] w-10 rounded-full bg-[#9CF237]" />
                <span className="text-[10px] font-bold tracking-[2px] text-[#6B7280]">
                  OUR WORLD, YOUR CREATIVITY
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

          {/* Image Composition */}
          <div className="grid grid-cols-[1.15fr_0.85fr] items-center gap-3 sm:gap-4">

            <div className="space-y-3 sm:space-y-4">
              <Card className="overflow-hidden rounded-[22px] border-0 bg-[#F4F5F6] p-0 shadow-none">
                <CardContent className="relative aspect-[4/5] overflow-hidden p-0">
                  <Image
                    src={images[0].src}
                    alt={images[0].alt}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 1024px) 60vw, 40vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <p className="absolute bottom-4 left-4 text-[10px] font-bold tracking-[1.5px] text-white sm:bottom-6 sm:left-6 sm:text-xs">
                    {images[0].title}
                  </p>
                </CardContent>
              </Card>

              <p className="text-[9px] font-bold tracking-[2px] text-[#9CA3AF] sm:text-[10px]">
                SPACES THAT INSPIRE
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Card className="mt-8 overflow-hidden rounded-[22px] border-0 bg-[#F4F5F6] p-0 shadow-none sm:mt-12">
                <CardContent className="relative aspect-[4/5] overflow-hidden p-0">
                  <Image
                    src={images[1].src}
                    alt={images[1].alt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 45vw, 30vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <p className="absolute bottom-4 left-3 text-[9px] font-bold tracking-wider text-white sm:bottom-5 sm:left-4 sm:text-xs">
                    {images[1].title}
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-[22px] border-0 bg-[#F4F5F6] p-0 shadow-none">
                <CardContent className="relative aspect-[4/3] overflow-hidden p-0">
                  <Image
                    src={images[2].src}
                    alt={images[2].alt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 45vw, 30vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Story Content */}
          <div className="lg:pl-4">
            <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#739F36]">
              01 — OUR STORY
            </p>

            <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.2] tracking-tight sm:text-4xl lg:text-[46px]">
              More Than a Studio.
              <span className="mt-1 block text-[#929292]">
                A Starting Point for Ideas.
              </span>
            </h2>

            <div className="mt-7 space-y-5 text-sm leading-8 text-[#6B7280] sm:text-base">
              <p>
                Every creative project needs an environment where ideas
                can grow. But finding a suitable studio, understanding
                its facilities, and arranging a booking can take time.
              </p>

              <p>
                That is where StudioSpace comes in. We provide a marketplace
                where creators can discover studio spaces and studio owners
                can showcase their workspaces to people who need them.
              </p>

              <p>
                Whether it is a photography session, a film production,
                a podcast, or a music recording, our goal is to make
                finding the right place a simpler experience.
              </p>
            </div>

            <Link
              href="/studios"
              className="group mt-8 inline-flex items-center gap-3 border-b border-[#9CF237] pb-2 text-sm font-bold transition-colors hover:text-[#739F36]"
            >
              Discover Our Studios
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mt-8 bg-[#F4F5F6] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12 max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#739F36]">
              02 — OUR PURPOSE
            </p>

            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
              What We Stand For.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">

            {/* Mission */}
            <Card className="group rounded-[24px] border-[#E5E7EB] bg-white p-0 shadow-none">
              <CardContent className="p-7 sm:p-9 lg:p-11">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="rounded-full border-[#E5E7EB] px-3 py-1.5 text-[10px] font-bold tracking-widest text-[#739F36]"
                  >
                    OUR MISSION
                  </Badge>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F0F9E6] text-xl">
                    ✳
                  </span>
                </div>

                <h3 className="mt-10 max-w-md font-heading text-2xl font-bold leading-tight sm:text-3xl lg:text-[36px]">
                  Connecting Creators With the Right Spaces.
                </h3>

                <p className="mt-5 max-w-lg text-sm leading-8 text-[#6B7280]">
                  Our mission is to make creative studio discovery and
                  booking more accessible by bringing creators and
                  studio owners together in one marketplace.
                </p>

                <div className="mt-9 h-[3px] w-12 rounded-full bg-[#9CF237] transition-all duration-300 group-hover:w-24" />
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="group overflow-hidden rounded-[24px] border-[#1E1E1E] bg-[#1E1E1E] p-0 shadow-none">
              <CardContent className="relative p-7 sm:p-9 lg:p-11">

                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#9CF237]/10 blur-[90px]" />

                <div className="relative flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="rounded-full border-white/20 bg-white/5 px-3 py-1.5 text-[10px] font-bold tracking-widest text-white"
                  >
                    OUR VISION
                  </Badge>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#9CF237] text-xl text-[#1E1E1E]">
                    ↗
                  </span>
                </div>

                <h3 className="relative mt-10 max-w-md font-heading text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[36px]">
                  A World With More Room for Creativity.
                </h3>

                <p className="relative mt-5 max-w-lg text-sm leading-8 text-white/60">
                  We envision a connected creative community where
                  people can find inspiring workspaces and studio
                  owners can reach the creators looking for them.
                </p>

                <div className="relative mt-9 h-[3px] w-12 rounded-full bg-[#9CF237] transition-all duration-300 group-hover:w-24" />
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-5 border-b border-[#E5E7EB] pb-10 md:grid-cols-2 md:items-end md:gap-10">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#739F36]">
                03 — OUR VALUES
              </p>

              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                The Principles
                <span className="block">Behind Everything.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-8 text-[#6B7280] md:ml-auto">
              The values that shape how we approach creative spaces
              and the experience we aim to build for our community.
            </p>
          </div>

          {/* Editorial Value Rows */}
          <div className="divide-y divide-[#E5E7EB]">
            {values.map((value) => (
              <article
                key={value.number}
                className="group grid gap-3 py-8 transition-colors sm:py-10 md:grid-cols-[100px_1fr_1fr] md:items-center md:gap-8"
              >
                <span className="font-heading text-3xl font-bold tracking-tight text-[#D1D5DB] transition-colors group-hover:text-[#9CF237] sm:text-4xl">
                  {value.number}
                </span>

                <h3 className="font-heading text-2xl font-bold sm:text-3xl">
                  {value.title}
                </h3>

                <div className="flex items-start gap-4 md:justify-between">
                  <p className="max-w-md text-sm leading-7 text-[#6B7280]">
                    {value.description}
                  </p>

                  <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] text-[#1E1E1E] transition-all group-hover:border-[#9CF237] group-hover:bg-[#9CF237] md:flex">
                    ↗
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Support */}
      <section className="bg-[#F8F9F7] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">

          {/* Support Introduction */}
          <div>
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-[#DCE6D2] bg-white px-4 py-2 text-[10px] font-bold tracking-[2px] text-[#527D21]"
            >
              <span className="h-2 w-2 rounded-full bg-[#9CF237]" />
              CREATOR SUPPORT
            </Badge>

            <h2 className="mt-5 font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Here to Support
              <span className="block text-[#858585]">
                Your Creative Journey.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-8 text-[#6B7280] sm:text-base">
              Finding the right workspace should feel simple.
              StudioSpace aims to make your experience easier
              with clear studio information, transparent pricing,
              and helpful host details throughout the booking journey.
            </p>

            <Link
              href="/studios"
              className="group mt-8 inline-flex items-center gap-3 border-b border-[#9CF237] pb-2 text-sm font-bold text-[#1E1E1E] transition-colors hover:text-[#739F36]"
            >
              Find Your Creative Space
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* Support Features */}
          <div className="space-y-3">
            {supportItems.map((item) => (
              <Card
                key={item.number}
                className="group rounded-2xl border border-[#E5E7EB] bg-white p-0 shadow-none transition-all duration-300 hover:border-[#CBEA9E] hover:shadow-[0_10px_30px_rgba(30,30,30,0.05)]"
              >
                <CardContent className="flex gap-4 p-5 sm:p-6">
                  <span className="font-heading text-2xl font-bold text-[#C5C9C0] transition-colors group-hover:text-[#9CF237]">
                    {item.number}
                  </span>

                  <div>
                    <h3 className="font-heading text-lg font-bold text-[#1E1E1E] sm:text-xl">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-[#6B7280]">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-4 pb-20 pt-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[26px] bg-[#F4F5F6] px-6 py-12 sm:px-10 sm:py-14 lg:px-14">

            <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#9CF237]/20 blur-[100px]" />

            <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#739F36]">
                  THE NEXT CHAPTER STARTS HERE
                </p>

                <h2 className="mt-4 max-w-2xl font-heading text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                  Your Ideas Deserve the Right Space.
                </h2>

                <p className="mt-3 max-w-lg text-sm leading-7 text-[#6B7280]">
                  Explore inspiring studios and find the perfect
                  environment for your next creative project.
                </p>
              </div>

              <Link
                href="/studios"
                className="group inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-xl bg-[#9CF237] px-7 text-sm font-bold text-[#1E1E1E] transition-all duration-300 hover:-translate-y-1 hover:bg-[#8DE62B]"
              >
                Explore Studios
                <span className="text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default AboutPage;
