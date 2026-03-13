"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

type Post = {
  id: string;
  title: string;
  slug: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function fetchPosts() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/posts");
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => {
        if (!res.ok) router.replace("/admin/login");
        else fetchPosts();
      })
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  async function handleStatusChange(id: string, newStatus: "published" | "draft") {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error(await res.text());
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
    } catch {
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete post");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto py-12 px-4 w-full">
        <p className="text-center text-muted-foreground">Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-6xl mx-auto py-12 px-4 w-full">
        <p className="text-center text-destructive">{error}</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90"
          >
            Add new post
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Logout
          </button>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Add one to get started.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-zinc-200 dark:border-zinc-700"
            >
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-foreground truncate">{post.title}</h2>
                <p className="text-sm text-muted-foreground">
                  /{post.slug} · {new Date(post.updated_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <select
                  value={post.status}
                  onChange={(e) =>
                    handleStatusChange(post.id, e.target.value as "published" | "draft")
                  }
                  disabled={updatingId === post.id}
                  className="rounded-md border border-zinc-300 dark:border-zinc-600 bg-background px-3 py-1.5 text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="rounded-lg border border-zinc-300 dark:border-zinc-600 px-3 py-1.5 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(post.id, post.title)}
                  className="rounded-lg border border-red-200 dark:border-red-900 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
