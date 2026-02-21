import { UtensilsCrossed, HandHelping, Sprout, Check } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

const cards = [
  {
    icon: UtensilsCrossed,
    title: "Weekly Meal Prep",
    body: "Every week, our team cooks fresh meals from scratch. We focus on quality ingredients, proper food safety and consistent output. No shortcuts.",
    checklist: [
      "Safe, hygienic preparation",
      "Properly packaged for distribution",
      "Made with care, every time",
    ],
    variant: "default" as const,
  },
  {
    icon: HandHelping,
    title: "Community Outreach",
    body: "We distribute meals directly to people in need across Medway, including those sleeping rough. We prioritise dignity and build trust through consistency.",
    checklist: [
      "No referrals needed",
      "Reliable weekly distribution",
      "Working alongside Street Angels",
    ],
    variant: "default" as const,
  },
  {
    icon: Sprout,
    title: "Growing Our Reach",
    body: "We currently operate weekly distributions and are preparing to expand to additional days, doubling the number of meals we serve.",
    needs: [
      "Sustainable financial donations",
      "Committed, reliable volunteers",
      "Regular food supply contributions",
    ],
    variant: "accent" as const,
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-gray-50 py-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-blue font-bold text-sm uppercase tracking-widest">
              Operations
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-brand-dark mt-4">
              What We Do
            </h2>
            <p className="text-brand-gray mt-4">
              How we prepare, deliver and grow our community food initiative.
            </p>
          </div>
        </RevealOnScroll>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <RevealOnScroll key={index}>
              {card.variant === "accent" ? (
                // Accent Card (Growing Our Reach)
                <div className="bg-brand-blue text-white rounded-3xl p-8 relative overflow-hidden shadow-xl sm:-translate-y-4 h-full">
                  {/* Decorative Circle */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <card.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="font-heading font-bold text-xl mt-6">
                      {card.title}
                    </h3>

                    <p className="text-white/90 mt-4 leading-relaxed">
                      {card.body}
                    </p>

                    {/* Needs Panel */}
                    <div className="bg-white/10 p-5 rounded-2xl mt-6">
                      <span className="text-white/80 text-xs uppercase tracking-wider font-bold">
                        To expand, we need:
                      </span>
                      <ul className="mt-3 space-y-2">
                        {card.needs?.map((need, i) => (
                          <li
                            key={i}
                            className="text-white/90 text-sm flex items-start gap-2"
                          >
                            <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {need}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                // Default Card
                <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-brand-blue transition-colors group h-full card-hover-lift">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center icon-bounce">
                    <card.icon className="w-8 h-8 text-brand-blue" />
                  </div>

                  <h3 className="font-heading font-bold text-xl text-brand-dark mt-6">
                    {card.title}
                  </h3>

                  <p className="text-brand-gray mt-4 leading-relaxed">
                    {card.body}
                  </p>

                  {/* Checklist */}
                  <ul className="mt-6 space-y-3">
                    {card.checklist?.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-brand-dark"
                      >
                        <Check className="w-4 h-4 text-brand-blue flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
