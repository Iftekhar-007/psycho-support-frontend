import { AboutUs } from "@/components/AboutUs";
import { BookAppointment } from "@/components/BookAppointment";
import { Hero3 } from "@/components/hero3";
import { HeroActionCards } from "@/components/HeroActionCards";
import { OurRecords } from "@/components/OurRecords";
import { OurPsychologists } from "../ui-components/our-psychologists";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen">
      <Hero3 />
      <HeroActionCards />
      <AboutUs />
      <OurRecords />
      <BookAppointment />
      <OurPsychologists />
    </div>
  );
}
