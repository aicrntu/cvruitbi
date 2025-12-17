"use client";

import BannerWrapper from "@/components/about/AboutBannerWrapper";

export default function ProgramPage() {
  return (
    <>
      <BannerWrapper
        heading="Our Program"
        subtitle="Meet the passionate innovators driving our mission forward."
      />

      <section className="relative w-full bg-white py-10 md:py-14 overflow-hidden">
        <div className="container-global items-start px-3 md:px-8 lg:px-12">

          {/* TEXT CONTENT */}
          <div className="space-y-6 md:space-y-8">

            {/* Header */}
            <div className="space-y-1">
              <h2 className="text-xl md:text-3xl font-extrabold text-[#0b1220] leading-tight">
                Aarambh<span className="text-[#00d2ef]"></span>
              </h2>

              <div className="flex items-center gap-1">
                <div className="h-[2px] w-[40px] bg-[#00d2ef] rounded-full" />
                <div className="h-2 w-2 bg-[#00d2ef] rounded-full scale-75" />
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-[11px] md:text-sm leading-relaxed max-w-2xl">
              <strong className="text-[#00b5d6]">Aarambh</strong> is a 10-week
              Incubation Program designed for idea-stage startups, helping them
              convert concepts into MVPs through structured guidance, validation,
              development, and investor pitching.
            </p>

            {/* Weekly Timeline */}
            <div className="border-t border-gray-200 pt-4 md:pt-5">
              <h3 className="text-lg md:text-xl font-semibold text-[#0093b1] mb-2">
                Program Structure
              </h3>

              <ul className="grid sm:grid-cols-2 gap-1 text-gray-700 text-[10px] md:text-[12px]">
                {[
                  "Week 1: Orientation and Ideation",
                  "Week 2: Market Research and Validation",
                  "Week 3: MVP Design and Prototyping",
                  "Week 4: MVP Development",
                  "Week 5: Feedback and Iteration",
                  "Week 6: Refinement and Documentation",
                  "Week 7: Pitch Preparation",
                  "Week 8: Demo Day and Feedback",
                  "Week 9–10: Post-Demo Day Actions",
                ].map((week, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-[#00d2ef] flex-shrink-0"></span>
                    {week}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits Section */}
            <div className="border-t border-gray-200 pt-5 md:pt-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#0093b1] mb-3">
                Benefits for Startups
              </h3>

              <div className="grid sm:grid-cols-2 gap-y-3 gap-x-4 text-gray-700">
                {/* Benefit Items */}
                <BenefitItem title="Resources & Tools" text="Access to facilities and MVP tools." />
                <BenefitItem title="Mentorship" text="Expert guidance from industry leaders." />
                <BenefitItem title="Expert Workshops" text="Knowledge sessions & training." />
                <BenefitItem title="Networking" text="Connect with investors & founders." />
                <BenefitItem title="Workspace" text="Quality co-working infrastructure." />
                <BenefitItem title="Legal Support" text="Help with compliance & IPR." />
                <BenefitItem title="Visibility" text="Showcase at major events." />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

interface BenefitItemProps {
  title: string;
  text: string;
}

function BenefitItem({ title, text }: BenefitItemProps) {
  return (
    <div>
      <p className="font-semibold text-[#0b1220] text-xs">{title}</p>
      <p className="text-[9px] md:text-[10px] text-gray-600 leading-snug">{text}</p>
    </div>
  );
}