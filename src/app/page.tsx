"use client";

import MainTemplate from "@/components/templates/main-template";
import HeroSection from "@/components/organisms/hero-section";
import FeaturesSection from "@/components/organisms/features-section";
import HowItWorksSection from "@/components/organisms/how-it-works-section";
import CallToActionSection from "@/components/organisms/call-to-action-section";
import { Footer } from "@/components/organisms/footer";
import Testimonials from "@/components/testimonials-section";
import BenefitsSection from "@/components/organisms/benefits-section";
import PartnersSection from "@/components/organisms/partners-section";

export default function Home() {
  return (
    <MainTemplate>
      <HeroSection />
      <PartnersSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <Testimonials />
      <Footer />
    </MainTemplate>
  );
}
