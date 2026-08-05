import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/page-hero";
import { ArticleCard } from "@/components/ui/article-card";
import { RegisterCta } from "@/views/home/register-cta";

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

export const NewsView = async () => {
  const heroT = await getTranslations("news.hero");
  const newsT = await getTranslations("news");
  const categories = newsT.raw("categories") as Record<Article["category"], string>;
  const articles = newsT.raw("articles") as Article[];

  return (
    <main>
      <PageHero eyebrow={heroT("eyebrow")} title={heroT("title")} subtitle={heroT("subtitle")} />

      <section
        aria-label={heroT("title")}
        className="bg-background py-20"
      >
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

      <RegisterCta />
    </main>
  );
};
