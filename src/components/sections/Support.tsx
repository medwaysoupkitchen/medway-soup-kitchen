import {
  PoundSterling,
  ShoppingBasket,
  CircleCheck,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RevealOnScroll from "@/components/RevealOnScroll";
import DonateForm from "@/components/forms/DonateForm";
import VolunteerForm from "@/components/forms/VolunteerForm";

const donationTiers = [
  {
    amount: "£5",
    label: "Helps fund a meal",
    sublabel: "For one person facing hardship",
  },
  {
    amount: "£40",
    label: "Funds a weekly batch",
    sublabel: "Covering ingredients for a full cook",
  },
  {
    amount: "£160",
    label: "Supports a full month",
    sublabel: "Four weeks of consistent meals",
  },
];

const foodSupplies = [
  "Rice & Pasta",
  "Chicken & Meat",
  "Fresh Vegetables",
  "Cooking Oil",
  "Seasoning",
  "Disposables",
];

const volunteerRoles = [
  "Cooking & Prep",
  "Packing Meals",
  "Distribution",
  "Food Collection",
  "Admin & Coordination",
];

export default function Support() {
  return (
    <section
      id="support"
      className="bg-gray-50 py-24 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-blue font-bold text-sm uppercase tracking-widest">
              Get Involved
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-brand-dark mt-4">
              Support Our Work
            </h2>
            <p className="text-brand-gray mt-4">
              This initiative is currently self-funded by our founding team. To
              continue and to grow, we need the community behind us.
            </p>
          </div>
        </RevealOnScroll>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left - Donate Funds */}
          <RevealOnScroll>
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] card-hover">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-heading font-bold text-brand-dark">
                  Donate Funds
                </h3>
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
                  <PoundSterling className="w-6 h-6 text-brand-blue" />
                </div>
              </div>

              <p className="text-brand-gray mb-8">
                Every donation goes directly towards ingredients and
                preparation. We operate with minimal overhead, so your money feeds
                people.
              </p>

              {/* Donation Tiers */}
              <div className="space-y-4">
                {donationTiers.map((tier, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-2xl flex items-center gap-5 border border-gray-100"
                  >
                    <div className="bg-brand-blue text-white font-heading font-black rounded-xl w-24 h-14 flex items-center justify-center text-xl">
                      {tier.amount}
                    </div>
                    <div>
                      <div className="font-heading font-bold text-brand-dark">
                        {tier.label}
                      </div>
                      <div className="text-sm text-brand-gray">
                        {tier.sublabel}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Donate Button */}
              <Button
                asChild
                className="w-full bg-brand-orange hover:bg-brand-rust text-white py-5 h-auto rounded-2xl font-heading font-bold text-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all mt-8"
              >
                <a href="mailto:hello@medwaysoupkitchen.co.uk?subject=Donation%20Enquiry">
                  Donate Securely Online
                </a>
              </Button>

              {/* Pledge Form */}
              <DonateForm />
            </div>
          </RevealOnScroll>

          {/* Right Column - Stacked Cards */}
          <div className="space-y-6">
            {/* Food Supplies Card */}
            <RevealOnScroll>
              <div className="bg-blue-50 rounded-[2.5rem] p-8 md:p-10 border border-brand-blue/20 card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <ShoppingBasket className="w-6 h-6 text-brand-blue" />
                  <h3 className="text-xl font-heading font-bold text-brand-dark">
                    Food Supplies
                  </h3>
                </div>

                <p className="text-brand-gray">
                  We welcome physical donations of core ingredients to keep our
                  kitchen running week to week.
                </p>

                {/* Checklist */}
                <div className="grid grid-cols-2 gap-y-3 mt-4">
                  {foodSupplies.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CircleCheck className="w-4 h-4 text-brand-blue flex-shrink-0" />
                      <span className="text-sm text-brand-dark">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Note */}
                <div className="flex items-start gap-2 mt-6 pt-6 border-t border-brand-blue/20">
                  <Mail className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-brand-gray">
                    Contact us at{" "}
                    <a
                      href="mailto:hello@medwaysoupkitchen.co.uk"
                      className="text-brand-blue hover:underline font-medium"
                    >
                      hello@medwaysoupkitchen.co.uk
                    </a>{" "}
                    to arrange collection or drop-off.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Volunteer Card */}
            <RevealOnScroll>
              <div
                id="volunteer"
                className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-200 card-hover"
              >
                <h3 className="text-xl font-heading font-bold text-brand-dark mb-4">
                  Volunteer With Us
                </h3>

                <p className="text-brand-gray">
                  We&apos;re building a committed volunteer base. Even one day a
                  month makes a real difference.
                </p>

                {/* Role Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {volunteerRoles.map((role, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-brand-dark rounded-lg px-4 py-2.5 font-bold text-sm"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                {/* Volunteer Form */}
                <VolunteerForm />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
