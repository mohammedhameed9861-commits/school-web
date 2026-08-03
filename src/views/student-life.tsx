import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/page-hero";
import { Activities } from "@/views/student-life/activities";
import { Labs } from "@/views/student-life/labs";
import { Sports } from "@/views/student-life/sports";
import { Events } from "@/views/student-life/events";
import { Projects } from "@/views/student-life/projects";
import { RegisterCta } from "@/views/home/register-cta";

export const StudentLifeView = async () => {
  const t = await getTranslations("studentLife.hero");

  return (
    <main>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <Activities />
      <Labs />
      <Sports />
      <Events />
      <Projects />
      <RegisterCta />
    </main>
  );
};
