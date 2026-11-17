import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";

const ALLOWED_MIME_TYPES = [
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  // Documents
  "application/pdf",
  // Videos
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Ukuran file melebihi batas maksimal 50MB." },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Tipe file '${file.type}' tidak didukung. Harap unggah gambar, video (mp4/webm), atau dokumen PDF.` },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Sanitize filename
    const originalName = file.name;
    const ext = path.extname(originalName).toLowerCase();
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueFilename = `${Date.now()}_${baseName}${ext}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let publicUrl = `/uploads/${uniqueFilename}`;

    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, uniqueFilename);
      fs.writeFileSync(filePath, buffer);
    } catch (fsErr: unknown) {
      // Netlify / Vercel Serverless environment has a read-only filesystem (/var/task)
      const errMsg = fsErr instanceof Error ? fsErr.message : String(fsErr);
      console.warn("Read-only filesystem detected on serverless, falling back to Data URI:", errMsg);
      const base64 = buffer.toString("base64");
      publicUrl = `data:${file.type};base64,${base64}`;
    }

    // Determine type category
    let fileType: "image" | "video" | "pdf" | "document" = "document";
    if (file.type.startsWith("image/")) {
      fileType = "image";
    } else if (file.type.startsWith("video/")) {
      fileType = "video";
    } else if (file.type === "application/pdf") {
      fileType = "pdf";
    }

    // Register in media library
    const mediaItem = db.addMediaItem({
      name: uniqueFilename,
      original_name: originalName,
      url: publicUrl,
      file_type: fileType,
      size: file.size,
      mime_type: file.type,
    });

    return NextResponse.json({
      success: true,
      url: publicUrl,
      media: mediaItem,
    });
  } catch (err: unknown) {
    console.error("Upload error:", err);
    const errorMessage = err instanceof Error ? err.message : "Gagal mengunggah file.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

