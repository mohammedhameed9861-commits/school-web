"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  title: string;
  body: string;
  is_published: boolean;
  created_at: string;
}

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function fetchPosts() {
    const res = await fetch("/api/admin/posts");
    if (res.status === 401) { router.push("/admin"); return; }
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => { fetchPosts(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (editingId) {
      await fetch(`/api/admin/posts/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      setEditingId(null);
    } else {
      await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
    }
    setTitle("");
    setBody("");
    setSaving(false);
    fetchPosts();
  }

  async function handleToggle(post: Post) {
    await fetch(`/api/admin/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published: !post.is_published }),
    });
    fetchPosts();
  }

  async function handleDelete(id: string) {
    if (!confirm("هل تريد حذف هذا الخبر؟")) return;
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    fetchPosts();
  }

  function startEdit(post: Post) {
    setEditingId(post.id);
    setTitle(post.title);
    setBody(post.body);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setBody("");
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">📋 لوحة الإدارة</h1>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
          >
            خروج
          </button>
        </div>

        {/* Create / Edit form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-sm flex flex-col gap-4"
        >
          <h2 className="font-semibold text-gray-700">
            {editingId ? "✏️ تعديل الخبر" : "➕ خبر جديد"}
          </h2>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="العنوان"
            required
            disabled={saving}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-right text-sm outline-none focus:border-blue-500"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="اكتب محتوى الخبر هنا..."
            rows={5}
            required
            disabled={saving}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-right text-sm outline-none focus:border-blue-500 resize-none"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "جارٍ الحفظ..." : editingId ? "حفظ التعديل" : "نشر"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                إلغاء
              </button>
            )}
          </div>
        </form>

        {/* Posts list */}
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-gray-700">الأخبار المنشورة ({posts.length})</h2>
          {loading && <p className="text-sm text-gray-400">جارٍ التحميل...</p>}
          {!loading && posts.length === 0 && (
            <p className="text-sm text-gray-400">لا توجد أخبار بعد، أضف أول خبر أعلاه</p>
          )}
          {posts.map((post) => (
            <div
              key={post.id}
              className={`rounded-2xl bg-white p-5 shadow-sm flex flex-col gap-2 ${
                !post.is_published ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {post.title}
                    {!post.is_published && (
                      <span className="mr-2 rounded bg-gray-100 px-1.5 py-0.5 text-xs font-normal text-gray-500">
                        مخفي
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(post.created_at).toLocaleDateString("ar-IQ", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => startEdit(post)}
                    className="rounded-lg border border-gray-200 px-3 py-1 text-xs hover:bg-gray-50"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleToggle(post)}
                    className="rounded-lg border border-gray-200 px-3 py-1 text-xs hover:bg-gray-50"
                  >
                    {post.is_published ? "إخفاء" : "نشر"}
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="rounded-lg border border-red-200 px-3 py-1 text-xs text-red-500 hover:bg-red-50"
                  >
                    حذف
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-wrap line-clamp-3">{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
