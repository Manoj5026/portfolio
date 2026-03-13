import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";

export const revalidate = 60;

const PREVIEW_LENGTH = 120;

function contentPreview(content: string | null): string {
  if (!content?.trim()) return "";
  const trimmed = content.trim().replace(/\s+/g, " ");
  if (trimmed.length <= PREVIEW_LENGTH) return trimmed;
  return trimmed.slice(0, PREVIEW_LENGTH).trim() + "...";
}

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, slug, image, content, created_at, status")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
  return (
    <main className="max-w-6xl mx-auto py-12 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <p className="text-muted-foreground">Unable to load posts. Please try again later.</p>
    </main>
  );
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-extrabold mb-2 text-center">Blog</h1>
      <p className="text-lg text-muted-foreground mb-10 text-center max-w-xl mx-auto">
        Thoughts on development, AI, and building systems.
      </p>

      {!posts?.length ? (
        <p className="text-center text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-20 sm:gap-x-24 sm:gap-y-24 w-full justify-items-center">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="max-w-md w-full">
              <Card className="flex flex-col p-8 h-full transition-shadow hover:shadow-2xl hover:-translate-y-1 duration-200 bg-gradient-to-br from-white/80 via-[#d9f6fd]/60 to-white/80 dark:from-zinc-900/80 dark:via-zinc-800/60 dark:to-zinc-900/80 border border-zinc-200 dark:border-zinc-700 cursor-pointer">
                <h2 className="text-xl font-bold text-foreground mb-4">{post.title}</h2>
                {post.image ? (
                  <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 448px) 100vw, 448px"
                    />
                  </div>
                ) : (
                  post.content && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {contentPreview(post.content)}
                    </p>
                  )
                )}
                <p className="text-xs text-muted-foreground mt-auto">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
