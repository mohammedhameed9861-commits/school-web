import { Hero } from "@/views/home/hero";
import { RegisterCta } from "@/views/home/register-cta";
import { Advantages } from "@/views/home/advantages";
import { Programs } from "@/views/home/programs";
import { Facilities } from "@/views/home/facilities";
import { Achievements } from "@/views/home/achievements";
import { Testimonials } from "@/views/home/testimonials";
import { NewsSection } from "@/views/home/news";
import { AboutView } from "@/views/about";
import { AcademicsView } from "@/views/academics";
import { StudentLifeView } from "@/views/student-life";
import { AdmissionsView } from "@/views/admissions";
import { ContactView } from "@/views/contact";

/**
 * Home view — the entire site as one continuous scroll (ADR-0022). Every
 * former page is now a chapter anchored by id; the header/footer nav
 * smooth-scrolls to these ids instead of navigating to a separate route.
 * The one real registration form lives in the Admissions chapter — the
 * standalone `RegistrationSection` that used to close out the Home-only
 * page was dropped to avoid two competing forms on the same scroll.
 */
export const HomeView = () => {
  return (
    <main>
      <div id="home">
        <Hero />
      </div>
      <Advantages />
      <Programs />
      <Facilities />
      <RegisterCta />
      <Achievements />
      <Testimonials />
      <NewsSection />

      <div id="about" className="scroll-mt-20">
        <AboutView />
      </div>
      <div id="academics" className="scroll-mt-20">
        <AcademicsView />
      </div>
      <div id="student-life" className="scroll-mt-20">
        <StudentLifeView />
      </div>
      <div id="admissions" className="scroll-mt-20">
        <AdmissionsView />
      </div>
      <div id="contact" className="scroll-mt-20">
        <ContactView />
      </div>
    </main>
  );
};
