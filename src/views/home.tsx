import { Hero } from "@/views/home/hero";
import { RegisterCta } from "@/views/home/register-cta";
import { Advantages } from "@/views/home/advantages";
import { Programs } from "@/views/home/programs";
import { Facilities } from "@/views/home/facilities";
import { Achievements } from "@/views/home/achievements";
import { Testimonials } from "@/views/home/testimonials";
import { RegistrationSection } from "@/views/home/registration-section";

/** Home view — Server Component; every section is composed below. */
export const HomeView = () => {
  return (
    <main>
      <Hero />
      <Advantages />
      <Programs />
      <Facilities />
      <RegisterCta />
      <Achievements />
      <Testimonials />
      <RegistrationSection />
    </main>
  );
};
