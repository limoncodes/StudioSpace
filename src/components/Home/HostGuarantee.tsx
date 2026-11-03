
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const guarantees = [
  {
    number: "01",
    symbol: "◇",
    title: "Liability Protection",
    description:
      "Clear booking terms, studio policies, and responsibilities help creators and hosts understand expectations before every session.",
    label: "BOOK WITH CONFIDENCE",
  },
  {
    number: "02",
    symbol: "✓",
    title: "Verified Profiles",
    description:
      "Transparent host and studio profile information helps creators understand who they are booking with before making a decision.",
    label: "TRUST & TRANSPARENCY",
  },
  {
    number: "03",
    symbol: "▣",
    title: "Equipment Safety",
    description:
      "Review available equipment details, studio facilities, and usage guidelines to prepare for a smooth creative session.",
    label: "CREATE WITH CARE",
  },
  {
    number: "04",
    symbol: "24/7",
    title: "Host Support",
    description:
      "Stay connected with your studio host for booking questions, studio arrangements, and important session information.",
    label: "HERE TO HELP",
  },
];

const HostGuarantee = () => {
  return (
    <section className="relative overflow-hidden bg-[#F4F5F6] px-4 py-20 font-body sm:px-6 sm:py-24 lg:px-8 lg:py-28">

      {/* Subtle Background Decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#9CF237]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-12 grid items-end gap-7 lg:mb-14 lg:grid-cols-[1fr_0.75fr] lg:gap-16">

          <div>
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-[#DCE6D2] bg-white px-4 py-2 text-[10px] font-bold tracking-[2px] text-[#527D21]"
            >
              <span className="h-2 w-2 rounded-full bg-[#9CF237]" />
              HOST & CREATOR CARE
            </Badge>

            <h2 className="mt-6 max-w-2xl font-heading text-3xl font-bold leading-[1.2] tracking-tight text-[#1E1E1E] sm:text-4xl lg:text-[52px]">
              Confidence at
              <span className="block">
                Every Step of
                <span className="relative ml-2 inline-block">
                  Your Journey.
                  <span className="absolute bottom-1 left-0 -z-10 h-3 w-full bg-[#9CF237]/60" />
                </span>
              </span>
            </h2>
          </div>

          <div className="max-w-lg lg:ml-auto lg:pb-2">
            <p className="text-sm leading-8 text-[#6B7280] sm:text-base">
              A great creative experience starts with confidence.
              We focus on clear information, better communication,
              and a supportive booking experience for creators
              and studio hosts.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-[3px] w-10 rounded-full bg-[#9CF237]" />

              <span className="text-[10px] font-bold tracking-[2px] text-[#6B7280]">
                BUILT AROUND YOUR EXPERIENCE
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-8">

          {/* Left Editorial Panel */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-[24px] bg-[#1E1E1E] p-7 sm:p-9 lg:p-10">

            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#9CF237]/10 blur-[80px]" />

            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9CF237] text-2xl text-[#1E1E1E]">
                ✳
              </span>

              <p className="mt-10 text-[10px] font-bold uppercase tracking-[2.5px] text-[#9CF237]">
                THE STUDIOSPACE EXPERIENCE
              </p>

              <h3 className="mt-4 max-w-sm font-heading text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[38px]">
                Your Creativity Deserves the Right Support.
              </h3>

              <p className="mt-5 max-w-sm text-sm leading-8 text-[#D1D5DB]">
                From exploring studio information to communicating
                with hosts, every detail should help you make
                informed decisions and focus on creating.
              </p>
            </div>

            <div className="relative mt-12 border-t border-white/15 pt-6">
              <p className="text-xs font-semibold text-white">
                Designed for creative minds.
              </p>

              <p className="mt-2 text-xs leading-6 text-[#D1D5DB]">
                Photography · Filmmaking · Podcasting · Music
              </p>
            </div>
          </div>

          {/* Guarantee Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {guarantees.map((item) => (
              <Card
                key={item.number}
                className="group relative overflow-hidden rounded-[22px] border border-[#E5E7EB] bg-white p-0 shadow-[0_5px_25px_rgba(30,30,30,0.025)] transition-all duration-300 hover:-translate-y-1 hover:border-[#CBEA9E] hover:shadow-[0_16px_40px_rgba(30,30,30,0.07)]"
              >
                <CardContent className="flex h-full min-h-[260px] flex-col p-6 sm:p-7">

                  {/* Card Header */}
                  <div className="flex items-center justify-between">

                    <span className="font-heading text-sm font-bold tracking-[1.5px] text-[#9CA3AF]">
                      {item.number}
                    </span>

                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E5EBDD] bg-[#F5FBEF] text-xl font-bold text-[#527D21] transition-all duration-300 group-hover:border-[#9CF237] group-hover:bg-[#9CF237] group-hover:text-[#1E1E1E]">
                      {item.symbol}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="mt-7 flex-1">

                    <h3 className="font-heading text-xl font-bold leading-snug text-[#1E1E1E] sm:text-[22px]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#596273]">
                      {item.description}
                    </p>

                  </div>

                  {/* Card Footer */}
                  <div className="mt-7 flex items-center justify-between gap-2 border-t border-[#E5E7EB] pt-5">

                    <span className="text-[9px] font-bold tracking-[1.4px] text-[#668B35] sm:text-[10px]">
                      {item.label}
                    </span>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F4F5F6] text-sm text-[#1E1E1E] transition-all duration-300 group-hover:bg-[#9CF237]">
                      ↗
                    </span>

                  </div>

                  {/* Hover Accent */}
                  <div className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-[#9CF237] transition-transform duration-300 group-hover:scale-x-100" />

                </CardContent>
              </Card>
            ))}

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-[22px] border border-[#E5E7EB] bg-white px-6 py-7 sm:flex-row sm:items-center sm:px-8">

          <div>
            <h3 className="font-heading text-lg font-bold text-[#1E1E1E] sm:text-xl">
              Ready to find your creative space?
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#6B7280]">
              Explore studios and discover a workspace that fits your vision.
            </p>
          </div>

          <Link
            href="/studios"
            className="group inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-xl bg-[#9CF237] px-6 text-sm font-bold text-[#1E1E1E] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8DE62B]"
          >
            Explore Studios
            <span className="text-lg transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
};

export default HostGuarantee;
