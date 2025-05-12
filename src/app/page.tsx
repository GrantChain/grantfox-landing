import MainTemplate from "@/components/templates/main-template"
import HeroSection from "@/components/organisms/hero-section"
import FeaturesSection from "@/components/organisms/features-section"
import HowItWorksSection from "@/components/organisms/how-it-works-section"
import UseCasesSection from "@/components/organisms/use-cases-section"
import CallToActionSection from "@/components/organisms/call-to-action-section"
import Footer from "@/components/organisms/footer"

export default function Home() {
  return (
    <MainTemplate>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UseCasesSection />
      <CallToActionSection />
      <Footer />
    </MainTemplate>
  )
}
