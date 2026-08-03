import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

/**
 * 404 page. Rendered for unmatched routes and `notFound()` calls; Next serves
 * it with a 404 status, so crawlers see a proper not-found response.
 */
export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg">{t("message")}</p>
      <Link href="/" className="underline underline-offset-4">
        {t("backHome")}
      </Link>
    </main>
  );
}
