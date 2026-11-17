"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  Filter,
  FileText,
  Video,
  File,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { MediaItem } from "@/lib/types";

export default function AdminMediaLibrary() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      if (data.media) setMedia(data.media);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        await fetch("/api/upload", { method: "POST", body: formData });
      } catch (err) {
        console.error("Failed to upload:", file.name, err);
      }
    }

    setUploading(false);
    e.target.value = "";
    fetchMedia();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus berkas "${name}" secara permanen?`)) return;

    try {
      const res = await fetch(`/api/media?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMedia((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes || bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const filteredMedia = media.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.original_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || item.file_type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-purple-400" />
            <span>Pusat Berkas & Media Library</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Unggah dan kelola berkas gambar, dokumen PDF, dan video dokumentasi.
          </p>
        </div>

        <div>
          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all cursor-pointer">
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>{uploading ? "Mengunggah File..." : "Unggah Berkas Baru"}</span>
            <input
              type="file"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {[
            { id: "all", label: "Semua File" },
            { id: "image", label: "Gambar" },
            { id: "pdf", label: "PDF" },
            { id: "video", label: "Video" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTypeFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                typeFilter === tab.id
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Cari berkas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-purple-500"
          />
        </div>
      </div>

      {/* Media Grid */}
      {filteredMedia.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#111624] border border-white/10 shadow-lg">
          <p className="text-xs text-slate-400">
            Tidak ada media yang ditemukan. Silakan unggah berkas baru menggunakan tombol di atas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden bg-[#111624] border border-white/10 hover:border-white/20 transition-all flex flex-col group shadow-lg"
            >
              {/* Preview Box */}
              <div className="relative aspect-square w-full bg-slate-950 flex items-center justify-center overflow-hidden">
                {item.file_type === "image" ? (
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                ) : item.file_type === "pdf" ? (
                  <div className="flex flex-col items-center justify-center text-rose-400 p-4 text-center">
                    <FileText className="w-10 h-10 mb-1" />
                    <span className="text-[10px] font-mono font-bold">PDF DOCUMENT</span>
                  </div>
                ) : item.file_type === "video" ? (
                  <div className="flex flex-col items-center justify-center text-sky-400 p-4 text-center">
                    <Video className="w-10 h-10 mb-1" />
                    <span className="text-[10px] font-mono font-bold">VIDEO CLIP</span>
                  </div>
                ) : (
                  <File className="w-10 h-10 text-slate-500" />
                )}

                {/* Overlay Action Buttons */}
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => copyToClipboard(item.url, item.id)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
                    title="Salin URL"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-sky-400 hover:bg-slate-700 transition-colors"
                    title="Buka File"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-colors"
                    title="Hapus File"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Info Details */}
              <div className="p-3 space-y-1">
                <p className="text-xs font-bold text-white truncate" title={item.original_name || item.name}>
                  {item.original_name || item.name}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{formatFileSize(item.size)}</span>
                  <span className="uppercase">{item.file_type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

