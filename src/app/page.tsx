import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { SignatureDishes } from "@/components/sections/SignatureDishes";
import { MenuSection } from "@/components/sections/MenuSection";
import { Chef } from "@/components/sections/Chef";
import { Atmosphere } from "@/components/sections/Atmosphere";
import { Wine } from "@/components/sections/Wine";
import { Events } from "@/components/sections/Events";
import { Reservation } from "@/components/sections/Reservation";
import { Practical } from "@/components/sections/Practical";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <Hero />
      <Story />
      <SignatureDishes />
      <MenuSection />
      <Chef />
      <Atmosphere />
      <Wine />
      <Events />
      <Reservation />
      <Practical />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
