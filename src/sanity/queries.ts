import { sanityClient } from "./client";
import { urlFor, type SanityImageRef } from "./image";

export type SanitySiteSettings = {
  schoolNameAr?: string;
  schoolNameEn?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  addressAr?: string;
  addressEn?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  googleMapsEmbedUrl?: string;
};

/**
 * Fetches the `siteSettings` singleton from Sanity. Returns `null` on any
 * failure (network, no project access, or the document not published yet)
 * so callers can fall back to the static defaults in `@/lib/site` and the
 * site never breaks because of a missing/unpublished CMS document.
 */
export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  try {
    return await sanityClient.fetch<SanitySiteSettings | null>(
      `*[_type == "siteSettings"][0]`,
    );
  } catch {
    return null;
  }
}

type Locale = "ar" | "en";

export type HeroContentData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryBtn: string;
  secondaryBtn: string;
};

/**
 * Fetches the `heroContent` singleton and localizes it. Returns `null` if
 * unpublished, on error, or if the title is empty — callers should fall
 * back to the translation-file copy in that case.
 */
export async function getHeroContent(locale: Locale): Promise<HeroContentData | null> {
  try {
    const doc = await sanityClient.fetch<Record<string, string> | null>(
      `*[_type == "heroContent"][0]`,
    );
    if (!doc) return null;
    const title = locale === "ar" ? doc.titleAr : doc.titleEn;
    if (!title) return null;
    return {
      eyebrow: (locale === "ar" ? doc.badgeAr : doc.badgeEn) || "",
      title,
      subtitle: (locale === "ar" ? doc.subtitleAr : doc.subtitleEn) || "",
      primaryBtn: (locale === "ar" ? doc.primaryBtnAr : doc.primaryBtnEn) || "",
      secondaryBtn: (locale === "ar" ? doc.secondaryBtnAr : doc.secondaryBtnEn) || "",
    };
  } catch {
    return null;
  }
}

export type StatItem = { value: string; label: string };

/** Fetches the hero's small stat row (`statsSection` singleton). */
export async function getHeroStats(locale: Locale): Promise<StatItem[] | null> {
  try {
    const doc = await sanityClient.fetch<{
      stats?: { value?: string; labelAr?: string; labelEn?: string }[];
    } | null>(`*[_type == "statsSection"][0]`);
    const stats = doc?.stats;
    if (!stats || stats.length === 0) return null;
    return stats.map((s) => ({
      value: s.value || "",
      label: (locale === "ar" ? s.labelAr : s.labelEn) || "",
    }));
  } catch {
    return null;
  }
}

/** Fetches the `achievement` documents (the bigger stat grid further down the page). */
export async function getAchievements(locale: Locale): Promise<StatItem[] | null> {
  try {
    const docs = await sanityClient.fetch<
      { valueAr?: string; valueEn?: string; labelAr?: string; labelEn?: string }[]
    >(`*[_type == "achievement"] | order(order asc)`);
    if (!docs || docs.length === 0) return null;
    return docs.map((d) => ({
      value: (locale === "ar" ? d.valueAr : d.valueEn) || "",
      label: (locale === "ar" ? d.labelAr : d.labelEn) || "",
    }));
  } catch {
    return null;
  }
}

export type AdvantageItem = { title: string; description: string; icon?: string };

export async function getAdvantages(locale: Locale): Promise<AdvantageItem[] | null> {
  try {
    const docs = await sanityClient.fetch<
      {
        titleAr?: string;
        titleEn?: string;
        descriptionAr?: string;
        descriptionEn?: string;
        icon?: string;
      }[]
    >(`*[_type == "advantage"] | order(order asc)`);
    if (!docs || docs.length === 0) return null;
    return docs.map((d) => ({
      title: (locale === "ar" ? d.titleAr : d.titleEn) || "",
      description: (locale === "ar" ? d.descriptionAr : d.descriptionEn) || "",
      icon: d.icon,
    }));
  } catch {
    return null;
  }
}

export type ProgramItem = { title: string; description: string; imageUrl: string | null };

export async function getPrograms(locale: Locale): Promise<ProgramItem[] | null> {
  try {
    const docs = await sanityClient.fetch<
      {
        titleAr?: string;
        titleEn?: string;
        descriptionAr?: string;
        descriptionEn?: string;
        image?: SanityImageRef;
      }[]
    >(`*[_type == "program"] | order(order asc)`);
    if (!docs || docs.length === 0) return null;
    return docs.map((d) => ({
      title: (locale === "ar" ? d.titleAr : d.titleEn) || "",
      description: (locale === "ar" ? d.descriptionAr : d.descriptionEn) || "",
      imageUrl: urlFor(d.image),
    }));
  } catch {
    return null;
  }
}

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  avatarUrl: string | null;
};

export async function getTestimonials(locale: Locale): Promise<TestimonialItem[] | null> {
  try {
    const docs = await sanityClient.fetch<
      {
        nameAr?: string;
        nameEn?: string;
        roleAr?: string;
        roleEn?: string;
        quoteAr?: string;
        quoteEn?: string;
        avatar?: SanityImageRef;
      }[]
    >(`*[_type == "testimonial"] | order(order asc)`);
    if (!docs || docs.length === 0) return null;
    return docs.map((d) => ({
      quote: (locale === "ar" ? d.quoteAr : d.quoteEn) || "",
      name: (locale === "ar" ? d.nameAr : d.nameEn) || "",
      role: (locale === "ar" ? d.roleAr : d.roleEn) || "",
      avatarUrl: urlFor(d.avatar),
    }));
  } catch {
    return null;
  }
}

export type PageSectionItem = {
  title: string;
  description: string;
  meta?: string;
  imageUrl?: string | null;
};

export type PageSectionData = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string | null;
  paragraphs?: string[];
  pairLeft?: { title: string; body: string };
  pairRight?: { title: string; body: string };
  items?: PageSectionItem[];
};

type RawPageSectionDoc = {
  eyebrowAr?: string;
  eyebrowEn?: string;
  titleAr?: string;
  titleEn?: string;
  subtitleAr?: string;
  subtitleEn?: string;
  bodyAr?: string;
  bodyEn?: string;
  image?: SanityImageRef;
  paragraphs?: { textAr?: string; textEn?: string }[];
  pairLeftTitleAr?: string;
  pairLeftTitleEn?: string;
  pairLeftBodyAr?: string;
  pairLeftBodyEn?: string;
  pairRightTitleAr?: string;
  pairRightTitleEn?: string;
  pairRightBodyAr?: string;
  pairRightBodyEn?: string;
  items?: {
    titleAr?: string;
    titleEn?: string;
    descriptionAr?: string;
    descriptionEn?: string;
    metaAr?: string;
    metaEn?: string;
    image?: SanityImageRef;
  }[];
};

/**
 * Fetches one editable block from the `pageSection` catalog (About /
 * Academics / Student Life / Admissions content) by its fixed key. Returns
 * `null` if that key hasn't been published yet, so callers fall back to
 * the translation-file copy. Individual fields inside the result may also
 * be empty/undefined — not every key uses every field.
 */
export async function getPageSection(key: string, locale: Locale): Promise<PageSectionData | null> {
  try {
    const doc = await sanityClient.fetch<RawPageSectionDoc | null>(
      `*[_type == "pageSection" && key == $key][0]`,
      { key },
    );
    if (!doc) return null;

    const pick = (ar?: string, en?: string) => (locale === "ar" ? ar : en) || undefined;

    const paragraphs = doc.paragraphs
      ?.map((p) => pick(p.textAr, p.textEn))
      .filter((p): p is string => Boolean(p));

    const items = doc.items
      ?.map((i) => ({
        title: pick(i.titleAr, i.titleEn) || "",
        description: pick(i.descriptionAr, i.descriptionEn) || "",
        meta: pick(i.metaAr, i.metaEn),
        imageUrl: urlFor(i.image),
      }))
      .filter((i) => i.title || i.description);

    const pairLeftTitle = pick(doc.pairLeftTitleAr, doc.pairLeftTitleEn);
    const pairLeftBody = pick(doc.pairLeftBodyAr, doc.pairLeftBodyEn);
    const pairRightTitle = pick(doc.pairRightTitleAr, doc.pairRightTitleEn);
    const pairRightBody = pick(doc.pairRightBodyAr, doc.pairRightBodyEn);

    return {
      eyebrow: pick(doc.eyebrowAr, doc.eyebrowEn),
      title: pick(doc.titleAr, doc.titleEn),
      subtitle: pick(doc.subtitleAr, doc.subtitleEn),
      body: pick(doc.bodyAr, doc.bodyEn),
      imageUrl: urlFor(doc.image),
      paragraphs: paragraphs && paragraphs.length > 0 ? paragraphs : undefined,
      pairLeft:
        pairLeftTitle || pairLeftBody
          ? { title: pairLeftTitle || "", body: pairLeftBody || "" }
          : undefined,
      pairRight:
        pairRightTitle || pairRightBody
          ? { title: pairRightTitle || "", body: pairRightBody || "" }
          : undefined,
      items: items && items.length > 0 ? items : undefined,
    };
  } catch {
    return null;
  }
}
