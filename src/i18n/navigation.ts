import { createNavigation } from "next-intl/navigation";

import { routing } from "@/i18n/routing";

/**
 * Locale-aware navigation primitives. These wrap `next/link` / `next/navigation`
 * (ADR-0005 stands — no custom animated-link layer); the wrapper only adds the
 * locale prefix automatically so links never need it written by hand.
 */
export const { Link, redirect, permanentRedirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
