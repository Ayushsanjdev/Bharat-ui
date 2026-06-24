"use client";

import { Nav } from "./_components/Nav";
import { HeroSection } from "./_components/HeroSection";
import { QuickStart } from "./_components/QuickStart";
import { ValidatorsSection } from "./_components/ValidatorsSection";
import { ComponentsSection } from "./_components/ComponentsSection";
import { WhySection } from "./_components/WhySection";
import { CtaSection } from "./_components/CtaSection";
import { FooterSection } from "./_components/FooterSection";

export default function Page() {
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <Nav />
      <HeroSection />
      <QuickStart />
      <ValidatorsSection />
      <ComponentsSection />
      <WhySection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
