import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const includeUnpublished = searchParams.get("all") === "true";
  const category = searchParams.get("category");

  let projects = db.getProjects(includeUnpublished);
  if (category && category !== "all") {
    projects = projects.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  const categories = db.getProjectCategories();
  return NextResponse.json({ success: true, projects, categories });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.category) {
      return NextResponse.json(
        { error: "Judul dan kategori project wajib diisi." },
        { status: 400 }
      );
    }

    const slug = body.slug
      ? body.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
      : body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const newProject = db.createProject({
      slug,
      title: body.title,
      category: body.category,
      description: body.description || "",
      full_content: body.full_content || "",
      technologies: Array.isArray(body.technologies) ? body.technologies : [],
      thumbnail_url: body.thumbnail_url || "/images/placeholder-project.jpg",
      gallery_urls: Array.isArray(body.gallery_urls) ? body.gallery_urls : [],
      video_url: body.video_url || "",
      pdf_url: body.pdf_url || "",
      project_url: body.project_url || "",
      github_url: body.github_url || "",
      date: body.date || new Date().toISOString().substring(0, 7),
      featured: Boolean(body.featured),
      published: body.published !== undefined ? Boolean(body.published) : true,
      order: Number(body.order) || 0,
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal menambahkan project";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

