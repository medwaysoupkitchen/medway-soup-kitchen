import Image from "next/image";
import { Users, ArrowRight, ShieldCheck, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-white pt-16 pb-24 lg:pt-28 lg:pb-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="anim-1 inline-flex items-center gap-2 bg-blue-50 text-brand-blue font-bold text-sm uppercase tracking-widest rounded-full px-4 py-2">
              <Heart className="w-4 h-4" />
              <span>Serving Those In Need</span>
            </div>

            {/* Heading */}
            <h1 className="anim-2 mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-black leading-[1.05]">
              <span className="text-brand-dark">Serving</span>
              <br className="hidden lg:block" />{" "}
              <span className="relative inline-block text-brand-blue">
                our own.
                <svg
                  className="absolute w-full h-4 -bottom-1 left-0 text-brand-blue/20 -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,10 Q50,20 100,10"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="anim-3 mt-6 text-lg sm:text-xl text-brand-gray font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Built by local people. Supporting local people. We prepare and
              distribute freshly cooked meals to individuals facing hardship
              across Medway, every single week.
            </p>

            {/* CTA Buttons */}
            <div className="anim-4 mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                className="bg-brand-orange hover:bg-brand-rust text-white px-8 py-4 h-auto rounded-full font-heading font-bold text-lg shadow-lg shadow-brand-orange/30 hover:-translate-y-1 transition-all"
              >
                <a href="#support">
                  Support Our Work
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-white border-2 border-gray-200 hover:border-brand-blue hover:text-brand-blue px-8 py-4 h-auto rounded-full font-heading font-bold text-lg transition-all"
              >
                <a href="#volunteer">Volunteer With Us</a>
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="anim-5 mt-10 flex flex-wrap items-center gap-4 justify-center lg:justify-start text-sm text-brand-gray-light font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-blue" />
                <span>CIC Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-blue" />
                <span>Est. 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-brand-blue" />
                <span>Community-Led</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="anim-scale relative">
            {/* Decorative circles */}
            <div className="absolute w-32 h-32 bg-brand-blue/10 rounded-full -top-8 -right-8 -z-10" />
            <div className="absolute w-48 h-48 bg-brand-blue/5 rounded-full -bottom-12 -left-12 -z-10" />

            {/* Main Image */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-accent-blue z-10">
              <Image
                src="/team image.jpg"
                alt="Medway Soup Kitchen team"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
