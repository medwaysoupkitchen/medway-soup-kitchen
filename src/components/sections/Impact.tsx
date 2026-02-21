import RevealOnScroll from "@/components/RevealOnScroll";

const stats = [
  {
    value: "11%",
    label: "of the UK population",
    sublabel: "lives in food poverty",
    color: "brand-blue",
  },
  {
    value: "18%",
    label: "of UK children",
    sublabel: "are in food insecure households",
    color: "brand-blue",
  },
  {
    value: "814t",
    label: "of food shipped",
    sublabel: "across Kent & Medway last year",
    color: "brand-blue",
  },
  {
    value: "20+",
    label: "food support services",
    sublabel: "listed across Medway as demand is growing",
    color: "brand-blue",
  },
];

const colorClasses: Record<string, string> = {
  "brand-blue": "text-brand-blue hover:border-brand-blue/30",
};

export default function Impact() {
  return (
    <section
      id="impact"
      className="bg-white py-24 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand-blue font-bold text-sm uppercase tracking-widest">
              The Need in Medway
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-brand-dark mt-4">
              Why this work matters
            </h2>
          </div>
        </RevealOnScroll>

        {/* Stats Grid */}
        <RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 text-center border border-gray-100 transition-colors card-hover ${
                  colorClasses[stat.color]
                }`}
              >
                <div
                  className="text-4xl font-heading font-black text-brand-blue"
                >
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-brand-dark mt-2">
                  {stat.label}
                </div>
                <div className="text-xs text-brand-gray mt-1">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Source */}
        <p className="text-xs text-brand-gray-light text-center mt-8">
          Sources: House of Commons Library, Food Foundation, FareShare Kent,
          Medway Council
        </p>
      </div>
    </section>
  );
}
