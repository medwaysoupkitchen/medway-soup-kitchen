import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import InfoBanner from "@/components/sections/InfoBanner";
import WhoWeAre from "@/components/sections/WhoWeAre";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Impact from "@/components/sections/Impact";
import Support from "@/components/sections/Support";
import About from "@/components/sections/About";
import CtaBand from "@/components/sections/CtaBand";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <InfoBanner />
        <WhoWeAre />
        <WhatWeDo />
        <Impact />
        <Support />
        <About />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
