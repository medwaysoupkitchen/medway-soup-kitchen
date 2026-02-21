import {
  Soup,
  HandHeart,
  Smile,
  Scale,
  Wallet,
  Home,
  TrendingUp,
  Users,
} from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

const features = [
  {
    icon: Soup,
    title: "Freshly Cooked Meals",
    description:
      "Prepared from scratch with quality ingredients, never reheated leftovers.",
  },
  {
    icon: HandHeart,
    title: "Consistent Support",
    description: "Same time, same place. People can rely on us being there.",
  },
  {
    icon: Smile,
    title: "A Welcoming Presence",
    description: "No referrals, no judgement, no barriers. Just community.",
  },
  {
    icon: Scale,
    title: "Dignity First",
    description: "Everyone is treated with respect. No questions asked.",
  },
];

const issues = [
  {
    icon: Wallet,
    title: "Financial Hardship",
    subtitle: "Benefits delays, low wages, debt",
  },
  {
    icon: Home,
    title: "Housing Instability",
    subtitle: "Rough sleeping, temporary accommodation",
  },
  {
    icon: TrendingUp,
    title: "Rising Living Costs",
    subtitle: "Food prices up 19% since 2021",
  },
  {
    icon: Users,
    title: "Social Isolation",
    subtitle: "No family, no network, no safety net",
  },
];

export default function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      className="bg-white py-24 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <RevealOnScroll>
            <div>
              {/* Section Label */}
              <div className="flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-widest mb-4">
                <span className="text-brand-blue">●</span>
                <span>Who We Are</span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-brand-dark leading-tight">
                We exist to provide more than food.
              </h2>

              {/* Paragraph */}
              <p className="mt-6 text-brand-gray leading-relaxed">
                Medway Soup Kitchen CIC is a community-led initiative responding
                directly to food insecurity and isolation across Medway. We are
                residents of this area, building support that feels close,
                human, and consistent. Food meets the immediate need, but
                showing up, week after week, is what builds lasting change.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-6 mt-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-brand-dark">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-brand-gray mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Column - Why We Exist Card */}
          <RevealOnScroll className="lg:pl-4">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 card-hover">
              {/* Label */}
              <span className="text-brand-rust uppercase tracking-widest text-xs font-bold">
                Why We Exist
              </span>

              {/* Heading */}
              <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-brand-dark mt-3">
                No one should go without a meal.
              </h3>

              {/* Paragraph */}
              <p className="text-brand-gray mt-4 leading-relaxed">
                Across the UK, an estimated 7.3 million adults experienced food
                insecurity in early 2025. Medway is not immune. Rising costs,
                housing instability and financial hardship are pushing more
                people into crisis, and for some, a hot meal is no longer
                guaranteed.
              </p>

              {/* Issues Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {issues.map((issue, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-5 rounded-2xl border border-gray-100 card-hover"
                  >
                    <issue.icon className="w-5 h-5 text-brand-blue mb-3" />
                    <h4 className="font-heading font-bold text-brand-dark">
                      {issue.title}
                    </h4>
                    <p className="text-xs text-brand-gray mt-1">
                      {issue.subtitle}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="border-l-4 border-brand-blue pl-5 py-2 mt-8">
                <p className="text-brand-gray italic">
                  &ldquo;When a community looks after its own, no one is left
                  unseen.&rdquo;
                </p>
                <p className="text-brand-gray mt-2">
                  That&apos;s what{" "}
                  <em className="text-brand-dark font-medium">
                    Serving Our Own
                  </em>{" "}
                  means.
                </p>
              </blockquote>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
