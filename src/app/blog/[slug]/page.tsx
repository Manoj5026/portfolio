import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { data: post, error } = await supabase
    .from("posts")
    .select("id, title, slug, image, content, created_at, status")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <main className="w-full max-w-3xl min-w-0 mx-auto py-12 px-4 box-border">
      <Link
        href="/blog"
        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-foreground mb-6 inline-block"
      >
        ← Back to Blog
      </Link>
      <article className="w-full min-w-0">
        <h1 className="text-3xl font-bold text-foreground mb-2">{post.title}</h1>
        {post.image && (
          <div className="relative w-full aspect-video mb-8 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}
        <p className="text-sm text-muted-foreground mb-8">
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="w-full min-w-0 text-foreground whitespace-pre-line leading-relaxed">
          {post.content}
        </div>
      </article>
    </main>
  );
}
