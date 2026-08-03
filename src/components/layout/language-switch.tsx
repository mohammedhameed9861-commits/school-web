"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

export interface LanguageSwitchProps {
  className?: string;
}

export const LanguageSwitch = ({ className }: LanguageSwitchProps) => {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const other = locale === "ar" ? "en" : "ar";

  return (
    <Link
      href={pathname}
      locale={other}
      className={className}
      aria-label={t("switchLanguage")}
    >
      {t("switchLanguage")}
    </Link>
  );
};
