import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, image, content, status, created_at, updated_at")
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, slug, content, image, status } = body;

  if (!title?.trim() || !slug?.trim() || !content?.trim()) {
    return NextResponse.json(
      { error: "title, slug, and content are required" },
      { status: 400 }
    );
  }

  const validStatus = status === "draft" || status === "published" ? status : "draft";
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: title.trim(),
      slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
      content: content.trim(),
      image: image?.trim() || null,
      status: validStatus,
      created_at: now,
      updated_at: now,
    })
    .select("id, title, slug, status, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
