import { Coffee, CalendarCheck, Users, Heart } from "lucide-react";

const bannerItems = [
  {
    icon: Coffee,
    title: "More Than Food",
    subtitle: "Warm meals & connection",
    iconColor: "text-brand-blue",
  },
  {
    icon: CalendarCheck,
    title: "Every Week",
    subtitle: "Consistent, reliable support",
    iconColor: "text-brand-blue",
  },
  {
    icon: Users,
    title: "No Referral Needed",
    subtitle: "Open to anyone in need",
    iconColor: "text-brand-blue",
  },
  {
    icon: Heart,
    title: "No Judgement",
    subtitle: "Dignity for everyone",
    iconColor: "text-brand-blue",
  },
];

export default function InfoBanner() {
  return (
    <section className="bg-brand-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-gray-700/60">
          {bannerItems.map((item, index) => (
            <div key={index} className="text-center">
              <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.iconColor}`} />
              <h3 className="font-heading font-bold text-xl mt-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
