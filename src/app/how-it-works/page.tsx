
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Discover Your Space",
    description:
      "Explore unique creative studios that match your vision. Find the right space by location, category, and facilities.",
    label: "FIND YOUR STUDIO",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=85",
    alt: "Professional music recording studio",
    imageLabel: "EXPLORE CREATIVE SPACES",
  },
  {
    number: "02",
    title: "Request a Booking",
    description:
      "Choose your preferred date, time, and number of guests. Send your booking request and wait for host confirmation.",
    label: "RESERVE YOUR SESSION",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1000&q=85",
    alt: "Professional podcast recording studio",
    imageLabel: "MAKE YOUR RESERVATION",
  },
  {
    number: "03",
    title: "Create Something Amazing",
    description:
      "Once your booking is confirmed, visit your chosen studio and bring your next creative idea to life.",
    label: "BRING IDEAS TO LIFE",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=85",
    alt: "Professional photography equipment",
    imageLabel: "START CREATING",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-[#F8F9F7] px-4 py-20 font-body sm:px-6 sm:py-24 lg:px-8 lg:py-28">

      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-12 grid items-end gap-7 lg:mb-16 lg:grid-cols-[1fr_420px]">

          <div>
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-[#DCE6D2] bg-white px-4 py-2 text-[10px] font-bold tracking-[2px] text-[#527D21]"
            >
              <span className="h-2 w-2 rounded-full bg-[#9CF237]" />
              THE BOOKING PROCESS
            </Badge>

            <h2 className="mt-6 max-w-2xl font-heading text-3xl font-bold leading-[1.2] tracking-tight text-[#1E1E1E] sm:text-4xl lg:text-[52px]">
              Three Steps.
              <span className="block">
                <span className="relative z-0 inline-block">
                  One Creative Journey.
                  <span className="absolute bottom-1 left-0 -z-10 h-3 w-full bg-[#9CF237]/60" />
                </span>
              </span>
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-md text-sm leading-8 text-[#6B7280] sm:text-base">
              From discovering the perfect studio to bringing your
              vision to life, StudioSpace makes the entire journey
              simple, seamless, and inspiring.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-[2px] w-9 bg-[#9CF237]" />
              <span className="text-[10px] font-bold tracking-[2px] text-[#6B7280]">
                DISCOVER · BOOK · CREATE
              </span>
            </div>
          </div>
        </div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">

          {steps.map((step, index) => (
            <Card
              key={step.number}
              className="group overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white p-0 shadow-[0_8px_30px_rgba(30,30,30,0.025)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#CBEA9E] hover:shadow-[0_20px_55px_rgba(30,30,30,0.08)]"
            >
              <CardContent className="p-0">

                {/* Image Area */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#E5E7EB]">

                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/15" />

                  {/* Step Number */}
                  <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/25 text-sm font-bold text-white backdrop-blur-md">
                    {step.number}
                  </div>

                  {/* Image Category */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="text-[9px] font-bold tracking-[2px] text-white/85 sm:text-[10px]">
                      {step.imageLabel}
                    </span>
                  </div>

                  {/* Image Corner Detail */}
                  <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-white/10 text-lg text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#9CF237] group-hover:bg-[#9CF237] group-hover:text-[#1E1E1E]">
                    ↗
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7">

                  {/* Step Indicator */}
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[1.8px] text-[#789B49]">
                      STEP {step.number}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {steps.map((item, dotIndex) => (
                        <span
                          key={item.number}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === dotIndex
                              ? "w-6 bg-[#9CF237]"
                              : "w-1.5 bg-[#E5E7EB]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold leading-snug text-[#1E1E1E] sm:text-[22px]">
                    {step.title}
                  </h3>

                  <p className="mt-3 min-h-[84px] text-sm leading-7 text-[#6B7280]">
                    {step.description}
                  </p>

                  {/* Bottom Detail */}
                  <div className="mt-7 flex items-center justify-between border-t border-[#E5E7EB] pt-5">
                    <span className="text-[9px] font-bold tracking-[1.6px] text-[#739F36]">
                      {step.label}
                    </span>

                    <span className="text-sm font-semibold text-[#1E1E1E] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>

                </div>
              </CardContent>
            </Card>
          ))}

        </div>

        {/* Bottom Brand Statement */}
        <div className="mt-8 overflow-hidden rounded-[22px] bg-[#1E1E1E]">

          <div className="flex flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-8">

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#9CF237] text-xl text-[#1E1E1E]">
                ✳
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                  Your next creative story starts here.
                </h3>

                <p className="mt-1 text-xs leading-6 text-white/55 sm:text-sm">
                  Find the space. Focus on your vision. Create something extraordinary.
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className="w-fit gap-2 rounded-full border-white/15 bg-white/5 px-4 py-2 text-[9px] font-bold tracking-[1.8px] text-white/75"
            >
              <span className="h-2 w-2 rounded-full bg-[#9CF237]" />
              MADE FOR CREATORS
            </Badge>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
