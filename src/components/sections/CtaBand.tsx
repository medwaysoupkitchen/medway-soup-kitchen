import { Button } from "@/components/ui/button";
import RevealOnScroll from "@/components/RevealOnScroll";
import ContactForm from "@/components/forms/ContactForm";

export default function CtaBand() {
  return (
    <section className="bg-white py-20 overflow-hidden relative border-y border-gray-100">
      {/* Decorative Blurred Circles */}
      <div className="absolute bg-brand-blue/10 w-96 h-96 rounded-full blur-3xl -top-24 -left-24" />
      <div className="absolute bg-brand-blue/5 w-80 h-80 rounded-full blur-3xl -bottom-20 -right-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto">
            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-heading font-black text-brand-dark">
              Help us serve more meals, more often.
            </h2>

            {/* Subtext */}
            <p className="text-lg text-brand-gray mt-6">
              Whether it&apos;s a one-off donation, a monthly commitment, or
              your time, every bit of support takes us closer to doubling our
              weekly distribution.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button
                asChild
                className="bg-brand-orange text-white hover:bg-brand-rust rounded-full px-8 py-4 h-auto font-heading font-bold text-lg"
              >
                <a href="#support">Donate Now</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white rounded-full px-8 py-4 h-auto font-heading font-bold text-lg bg-transparent"
              >
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
