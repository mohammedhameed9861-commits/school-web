"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/lib/site";
import { Hover } from "@/components/animation/springs/hover";

export const WhatsAppButton = () => {
  const t = useTranslations("whatsapp");
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const href = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(t("defaultMessage"))}`;

  return (
    <a
      ref={triggerRef}
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={t("label")}
      data-analytics-event="whatsapp_float_click"
      className="fixed bottom-5 end-5 z-40 flex h-14 w-14 items-center justify-center rounded-pill bg-action-whatsapp text-white shadow-lg"
    >
      <Hover
        tag="span"
        trigger={triggerRef}
        from={{ scale: 1 }}
        to={{ scale: 1.08 }}
        config={{ tension: 300, friction: 15 }}
        className="flex"
      >
        <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden>
          <path d="M16.001 3C9.107 3 3.5 8.607 3.5 15.5c0 2.29.617 4.487 1.789 6.418L3 29l7.27-2.243A12.44 12.44 0 0 0 16 28c6.894 0 12.5-5.607 12.5-12.5S22.895 3 16.001 3Zm0 22.7a10.17 10.17 0 0 1-5.313-1.487l-.381-.227-4.316 1.332 1.365-4.204-.248-.394A10.16 10.16 0 0 1 5.7 15.5c0-5.68 4.62-10.3 10.301-10.3 5.68 0 10.299 4.62 10.299 10.3 0 5.681-4.619 10.2-10.299 10.2Zm5.652-7.639c-.31-.155-1.832-.905-2.116-1.008-.284-.104-.491-.155-.698.155-.207.31-.802 1.008-.984 1.216-.181.207-.362.233-.672.078-.31-.156-1.309-.483-2.494-1.54-.922-.822-1.545-1.837-1.726-2.147-.181-.31-.02-.478.136-.633.14-.14.31-.362.465-.543.155-.181.207-.31.31-.517.104-.207.052-.388-.026-.543-.078-.155-.698-1.683-.957-2.304-.252-.606-.508-.524-.698-.534-.181-.008-.388-.01-.595-.01-.207 0-.543.078-.828.388-.284.31-1.086 1.062-1.086 2.59 0 1.528 1.112 3.004 1.267 3.212.155.207 2.19 3.345 5.307 4.69.742.32 1.32.512 1.771.655.744.237 1.421.203 1.957.123.597-.089 1.832-.749 2.09-1.472.259-.723.259-1.343.181-1.472-.077-.13-.284-.207-.594-.362Z" />
        </svg>
      </Hover>
    </a>
  );
};
