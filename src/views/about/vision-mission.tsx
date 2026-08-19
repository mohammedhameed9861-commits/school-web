import { getLocale, getTranslations } from "next-intl/server";

import { Inview } from "@/components/animation/springs/in-view";
import { getPageSection } from "@/sanity/queries";

export const VisionMission = async () => {
  const t = await getTranslations("about.visionMission");
  const locale = (await getLocale()) as "ar" | "en";
  const cms = await getPageSection("about.visionMission", locale);
  const visionTitle = cms?.pairLeft?.title || t("visionTitle");
  const visionBody = cms?.pairLeft?.body || t("visionBody");
  const missionTitle = cms?.pairRight?.title || t("missionTitle");
  const missionBody = cms?.pairRight?.body || t("missionBody");

  return (
    <section aria-label={`${visionTitle} / ${missionTitle}`} className="bg-surface-muted py-20">
      <div className="mx-auto grid max-w-[70rem] gap-6 px-4 sm:px-6 lg:grid-cols-2">
        <Inview
          tag="article"
          mode="once"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          className="rounded-card bg-surface p-8"
        >
          <h2 className="text-xl font-bold text-action-primary">{visionTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{visionBody}</p>
        </Inview>
        <Inview
          tag="article"
          mode="once"
          delayIn={100}
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          className="rounded-card bg-action-primary p-8 text-foreground-inverted"
        >
          <h2 className="text-xl font-bold text-action-accent">{missionTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground-inverted/85">{missionBody}</p>
        </Inview>
      </div>
    </section>
  );
};
