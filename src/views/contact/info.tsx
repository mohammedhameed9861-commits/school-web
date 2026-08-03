import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/lib/site";
import { Inview } from "@/components/animation/springs/in-view";

export const Info = async () => {
  const t = await getTranslations("contact.info");

  return (
    <section aria-label={t("addressTitle")} className="bg-background py-20">
      <div className="mx-auto grid max-w-[80rem] gap-8 px-4 sm:px-6 lg:grid-cols-2">
        <Inview
          tag="div"
          mode="once"
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-card border border-border"
        >
          <iframe
            src={siteConfig.mapsEmbedUrl}
            title={t("mapTitle")}
            loading="lazy"
            className="h-80 w-full lg:h-full"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Inview>

        <Inview
          tag="div"
          mode="once"
          delayIn={100}
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-center gap-6"
        >
          <address className="not-italic">
            <dl className="flex flex-col gap-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                  {t("addressTitle")}
                </dt>
                <dd className="mt-1 text-base">{siteConfig.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                  {t("phoneTitle")}
                </dt>
                <dd className="mt-1">
                  <a href={`tel:${siteConfig.phone}`} className="text-base text-action-primary underline underline-offset-4">
                    {siteConfig.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                  {t("whatsappTitle")}
                </dt>
                <dd className="mt-1">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    target="_blank"
                    rel="noopener"
                    className="text-base text-action-primary underline underline-offset-4"
                  >
                    +{siteConfig.whatsapp}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                  {t("emailTitle")}
                </dt>
                <dd className="mt-1">
                  <a href={`mailto:${siteConfig.email}`} className="text-base text-action-primary underline underline-offset-4">
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
            </dl>
          </address>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
              {t("socialTitle")}
            </p>
            <div className="mt-2 flex gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-pill border border-border transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-action-accent hover:text-action-accent"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.1c0-.95.27-1.6 1.63-1.6H17V3.5c-.3-.04-1.3-.13-2.46-.13-2.44 0-4.1 1.49-4.1 4.22v2.35H7.6v3.3h2.84V22h3.06Z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-pill border border-border transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-action-accent hover:text-action-accent"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 5.8a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6ZM16.4 3H7.6A4.6 4.6 0 0 0 3 7.6v8.8A4.6 4.6 0 0 0 7.6 21h8.8a4.6 4.6 0 0 0 4.6-4.6V7.6A4.6 4.6 0 0 0 16.4 3Zm3.35 13.4a3.35 3.35 0 0 1-3.35 3.35H7.6a3.35 3.35 0 0 1-3.35-3.35V7.6A3.35 3.35 0 0 1 7.6 4.25h8.8a3.35 3.35 0 0 1 3.35 3.35v8.8ZM17.4 7.1a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" />
                </svg>
              </a>
            </div>
          </div>
        </Inview>
      </div>
    </section>
  );
};
