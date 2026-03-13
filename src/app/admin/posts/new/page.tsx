"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => {
        if (!res.ok) router.replace("/admin/login");
        else setAuthChecked(true);
      })
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [saving, setSaving] = useState(false);

  function deriveSlugFromTitle() {
    const s = title.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    setSlug(s);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !content.trim()) {
      alert("Title, slug, and content are required.");
      return;
    }
    setSaving(true);
    try {
      let imageUrl: string | null = null;
      if (imageFile) {
        const fd = new FormData();
        fd.append("image", imageFile);
        const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
        if (!uploadRes.ok) {
          const err = await uploadRes.json().catch(() => ({}));
          throw new Error(err.error || "Image upload failed");
        }
        const { url } = await uploadRes.json();
        imageUrl = url;
      }
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          content: content.trim(),
          image: imageUrl,
          status,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || res.statusText);
      }
      router.push("/admin");
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to create post");
    } finally {
      setSaving(false);
    }
  }

  if (!authChecked) {
    return (
      <main className="max-w-5xl mx-auto py-12 px-4 w-full">
        <p className="text-muted-foreground">Checking auth...</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto py-12 px-4 w-full">
      <Link href="/admin" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-foreground mb-6 inline-block">
        ← Back to Manage Blogs
      </Link>
      <h1 className="text-2xl font-bold mb-6">Add new post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={deriveSlugFromTitle}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-background px-3 py-2 text-foreground"
            required
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium mb-1">Slug (URL)</label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-background px-3 py-2 text-foreground"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-background px-3 py-2 text-foreground"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cover image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-background px-3 py-2 text-foreground text-sm"
          />
          {imageFile && <p className="text-xs text-muted-foreground mt-1">Selected: {imageFile.name}</p>}
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published")}
            className="rounded-lg border border-zinc-300 dark:border-zinc-600 bg-background px-3 py-2 text-foreground"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Create post"}
          </button>
          <Link
            href="/admin"
            className="rounded-lg border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
