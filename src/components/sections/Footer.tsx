import Image from "next/image";
import { Mail } from "lucide-react";
import NewsletterForm from "@/components/forms/NewsletterForm";

const navLinks = [
  { label: "Who We Are", href: "#who-we-are" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Support Us", href: "#support" },
  { label: "Volunteer", href: "#volunteer" },
  { label: "About", href: "#about-us" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-400">
      {/* Newsletter Section */}
      <div className="bg-brand-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-white font-heading font-bold text-2xl">
                Stay Updated
              </h3>
              <p className="text-white/80 mt-1">
                Get the latest news and updates from Medway Soup Kitchen.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Image
              src="/Full_logo_6.png"
              alt="Medway Soup Kitchen"
              width={180}
              height={50}
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              A community-led initiative providing freshly prepared meals to
              individuals facing hardship across Medway.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:hello@medwaysoupkitchen.co.uk"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                hello@medwaysoupkitchen.co.uk
              </a>
              <p className="text-gray-400 text-sm leading-relaxed">
                4 High Street<br />
                Chatham, England<br />
                ME4 4EP
              </p>
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Registered Details
            </h4>
            <div className="text-gray-400 text-sm space-y-2">
              <p>Medway Soup Kitchen CIC</p>
              <p>Company No. 16849704</p>
              <p className="text-gray-500 text-xs mt-3">
                Registered in England and Wales
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-500">
            <p>
              &copy; 2025 Medway Soup Kitchen CIC. All rights reserved.
            </p>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
