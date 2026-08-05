import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { Activities } from "@/views/student-life/activities";
import { Labs } from "@/views/student-life/labs";
import { Sports } from "@/views/student-life/sports";
import { Events } from "@/views/student-life/events";
import { Projects } from "@/views/student-life/projects";

/** "Student Life" chapter of the single-page site (ADR-0022) — mounted at `#student-life`. */
export const StudentLifeView = async () => {
  const t = await getTranslations("studentLife.hero");

  return (
    <>
      <div className="bg-background px-4 pb-4 pt-20 sm:px-6">
        <SectionHeading id="student-life-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      </div>
      <Activities />
      <Labs />
      <Sports />
      <Events />
      <Projects />
    </>
  );
};
