import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getSupabase } from "@/lib/supabase";

// A single news article — kept as a real route (unlike the ADR-0022
// single-scroll chapters) since each post is its own distinct piece of
// content, not a fixed section of the homepage.
export const dynamic = "force-dynamic";

interface Post {
  id: string;
  title: string;
  body: string;
  created_at: string;
}

async function getPost(id: string): Promise<Post | null> {
  noStore();
  try {
    const { data } = await getSupabase()
      .from("posts")
      .select("id, title, body, created_at")
      .eq("id", id)
      .eq("is_published", true)
      .single();
    return data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  return { title: post?.title || "خبر" };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const post = await getPost(id);
  if (!post) notFound();

  const date = new Date(post.created_at).toLocaleDateString("ar-IQ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <Link
        href="/#news"
        className="text-sm font-semibold text-action-primary underline underline-offset-4 hover:text-action-accent"
      >
        ← رجوع لأخبار المدرسة
      </Link>

      <p className="mt-8 text-xs text-foreground-muted">{date}</p>
      <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{post.title}</h1>
      <div className="mt-6 whitespace-pre-wrap text-base leading-relaxed text-foreground-muted">
        {post.body}
      </div>
    </article>
  );
}
