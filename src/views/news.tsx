import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/ui/section-heading";
import { ArticleCard } from "@/components/ui/article-card";

interface Article {
  category: "announcements" | "studyTips" | "examPrep" | "parentGuidance";
  title: string;
  excerpt: string;
}

// Real photo per article, indexed to match `messages/*.json` → news.articles order.
const ARTICLE_IMAGES: (string | undefined)[] = [
  undefined,
  "/assets/photos/study-tips-poster.jpg",
  undefined,
  undefined,
  undefined,
  undefined,
];

/** "News & Resources" chapter of the single-page site (ADR-0022) — mounted at `#news`. */
export const NewsView = async () => {
  const heroT = await getTranslations("news.hero");
  const newsT = await getTranslations("news");
  const categories = newsT.raw("categories") as Record<Article["category"], string>;
  const articles = newsT.raw("articles") as Article[];

  return (
    <>
      <div className="bg-background px-4 pb-4 pt-20 sm:px-6">
        <SectionHeading id="news-title" eyebrow={heroT("eyebrow")} title={heroT("title")} subtitle={heroT("subtitle")} />
      </div>

      <section aria-label={heroT("title")} className="bg-background py-16">
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <li key={article.title}>
                <ArticleCard
                  categoryLabel={categories[article.category]}
                  title={article.title}
                  excerpt={article.excerpt}
                  delayIn={index * 80}
                  image={ARTICLE_IMAGES[index]}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
