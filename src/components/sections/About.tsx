import { Eye, Handshake, DoorOpen } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

const coreValues = [
  { label: "Dignity", highlighted: false },
  { label: "Consistency", highlighted: false },
  { label: "Compassion", highlighted: false },
  { label: "Community", highlighted: false },
  { label: "Accountability", highlighted: false },
];

const transparencyItems = [
  "Meals served",
  "Volunteer hours",
  "Funds raised & spent",
  "Expansion milestones",
];

export default function About() {
  return (
    <section
      id="about-us"
      className="bg-brand-dark text-white py-24 border-t-8 border-brand-blue"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Mission & Vision */}
          <RevealOnScroll>
            <div>
              {/* Mission */}
              <div>
                <div className="w-8 h-0.5 bg-brand-blue mb-3" />
                <span className="text-brand-blue uppercase tracking-widest text-xs font-bold">
                  Our Mission
                </span>
                <p className="text-xl md:text-2xl leading-relaxed text-gray-200 mt-4">
                  To provide accessible, nourishing meals in a safe and
                  welcoming environment, while restoring dignity and
                  strengthening community support for individuals experiencing
                  hardship across Medway.
                </p>
              </div>

              {/* Vision */}
              <div className="mt-12">
                <div className="w-8 h-0.5 bg-white mb-3" />
                <span className="text-white uppercase tracking-widest text-xs font-bold">
                  Our Vision
                </span>
                <p className="text-xl md:text-2xl leading-relaxed text-gray-200 mt-4">
                  A Medway where communities step forward to support one another
                  and no one goes without a meal or feels unseen.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Column - Values, Transparency, Partnerships */}
          <RevealOnScroll>
            <div>
              {/* Core Values */}
              <div className="flex flex-wrap gap-3">
                {coreValues.map((value, index) => (
                  <span
                    key={index}
                    className={`rounded-full px-5 py-2.5 font-bold text-sm ${
                      value.highlighted
                        ? "bg-brand-blue text-white"
                        : "bg-white/10 text-white border border-white/20"
                    }`}
                  >
                    {value.label}
                  </span>
                ))}
              </div>

              {/* Info Cards Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {/* Transparency Card */}
                <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-6 card-hover">
                  <Eye className="w-5 h-5 text-brand-blue mb-3" />
                  <h4 className="font-heading font-bold text-white text-lg">
                    Transparency
                  </h4>
                  <p className="text-sm text-gray-400 mt-2">
                    We operate with integrity and are committed to publishing
                    regular impact updates covering:
                  </p>
                  <ul className="mt-3 space-y-1">
                    {transparencyItems.map((item, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-blue rounded-full flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Partnerships Card */}
                <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-6 card-hover">
                  <Handshake className="w-5 h-5 text-brand-blue mb-3" />
                  <h4 className="font-heading font-bold text-white text-lg">
                    Partnerships
                  </h4>
                  <p className="text-sm text-gray-400 mt-2">
                    We collaborate with established local outreach organisations
                    to ensure meals reach those who need them most. This
                    includes working directly alongside{" "}
                    <strong className="text-white">Medway Street Angels</strong>{" "}
                    during weekly outreach sessions at Chatham Town Centre.
                  </p>
                </div>
              </div>

              {/* Open to All Card */}
              <div className="bg-brand-blue/20 rounded-2xl border border-brand-blue/30 p-6 mt-6 card-hover">
                <DoorOpen className="w-5 h-5 text-white mb-3" />
                <h4 className="font-heading font-bold text-white text-lg">
                  Open to All
                </h4>
                <p className="text-sm text-gray-300 mt-2">
                  &ldquo;Serving Our Own&rdquo; means serving everyone in our
                  community, regardless of background, circumstance or status.
                  Our doors are open to anyone who needs a meal.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
