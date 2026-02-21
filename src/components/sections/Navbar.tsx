"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Who We Are", href: "#who-we-are" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Our Impact", href: "#impact" },
  { label: "About Us", href: "#about-us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white h-24 transition-shadow duration-300 ${
        scrolled
          ? "shadow-[0_4px_20px_-10px_rgba(0,0,0,0.12)]"
          : "shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/Full_logo_1.svg"
            alt="Medway Soup Kitchen"
            width={200}
            height={56}
            className="h-14 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-bold text-brand-dark hover:text-brand-blue transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Volunteer Link */}
          <a
            href="#volunteer"
            className="font-bold text-brand-dark hover:text-brand-blue transition-colors"
          >
            Volunteer
          </a>

          {/* Donate CTA */}
          <Button
            asChild
            className="bg-brand-orange hover:bg-brand-rust text-white px-8 py-3.5 rounded-full font-heading font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <a href="#support">Donate Now</a>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 text-brand-dark hover:text-brand-blue transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Image
                    src="/Full_logo_1.svg"
                    alt="Medway Soup Kitchen"
                    width={150}
                    height={42}
                    className="h-10 w-auto"
                  />
                  <SheetClose asChild>
                    <button
                      className="p-2 text-brand-dark hover:text-brand-blue transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </SheetClose>
                </div>

                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <a
                        href={link.href}
                        className="font-bold text-lg text-brand-dark hover:text-brand-blue transition-colors py-2"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}

                  <SheetClose asChild>
                    <a
                      href="#volunteer"
                      className="font-bold text-lg text-brand-dark hover:text-brand-blue transition-colors py-2"
                    >
                      Volunteer
                    </a>
                  </SheetClose>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100">
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="w-full bg-brand-orange hover:bg-brand-rust text-white py-4 rounded-full font-heading font-bold text-lg shadow-md"
                    >
                      <a href="#support">Donate Now</a>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
