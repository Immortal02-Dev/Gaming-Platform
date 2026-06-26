import { HeroSection } from "@/components/modules/HeroSection";
import { DashboardSection } from "@/components/modules/DashboardSection";
import { FeaturesSection } from "@/components/modules/Features";
import { CardCarousel } from "@/components/modules/CardCarousel";
import { SampleSite } from "@/components/modules/SampleSite";
import { ServicesSection } from "@/components/modules/ServiceSection";
import { OfflineStoreSection } from "@/components/modules/OfflineStore";
import { ProvidersSection } from "@/components/modules/ProvidersSection";
import { CarouselSection } from "@/components/modules/CarouselSection";
import { FaqSection } from "@/components/modules/FaqSection";
import { CallToAction } from "@/components/modules/CallToAction";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-var(--ui-header-height))] relative">
      <div className="flex flex-col lg:grid lg:grid-cols-10 lg:gap-10">
        <div className="lg:col-span-10">
          <HeroSection />
          <DashboardSection />
          <FeaturesSection />
          <CardCarousel />
          <SampleSite />
          <ServicesSection />
          <OfflineStoreSection />
          <ProvidersSection />
          <CarouselSection />
          <FaqSection />
          <CallToAction />
        </div>
      </div>
    </main>
  );
}
