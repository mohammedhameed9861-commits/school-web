import { unstable_noStore as noStore } from "next/cache";
import { SectionHeading } from "@/components/ui/section-heading";
import { Inview } from "@/components/animation/springs/in-view";
import { Link } from "@/i18n/navigation";
import { getSupabase } from "@/lib/supabase";

interface Post {
  id: string;
  title: string;
  body: string;
  created_at: string;
}

async function getPublishedPosts(): Promise<Post[]> {
  // Opt out of static caching so newly published posts appear immediately.
  noStore();
  try {
    const { data } = await getSupabase()
      .from("posts")
      .select("id, title, body, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(6);
    return data ?? [];
  } catch {
    return [];
  }
}

export const NewsSection = async () => {
  const posts = await getPublishedPosts();
  if (posts.length === 0) return null;

  return (
    <section
      id="news"
      aria-labelledby="news-title"
      className="scroll-mt-20 bg-surface-muted py-20"
    >
      <div className="mx-auto max-w-[70rem] px-4 sm:px-6">
        <SectionHeading
          id="news-title"
          eyebrow="آخر الأخبار"
          title="أخبار المدرسة"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Inview
              key={post.id}
              tag="article"
              mode="once"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              style={{ transitionDelay: `${i * 60}ms` }}
              className="flex flex-col gap-3 rounded-card bg-surface p-6 shadow-sm"
            >
              <p className="text-xs text-foreground-muted">
                {new Date(post.created_at).toLocaleDateString("ar-IQ", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h3 className="font-semibold text-foreground">{post.title}</h3>
              <p className="text-sm text-foreground-muted line-clamp-4 whitespace-pre-wrap">
                {post.body}
              </p>
              <Link
                href={`/news/${post.id}`}
                className="mt-1 text-sm font-semibold text-action-primary underline underline-offset-4 hover:text-action-accent"
              >
                اقرأ المزيد
              </Link>
            </Inview>
          ))}
        </div>
      </div>
    </section>
  );
};
