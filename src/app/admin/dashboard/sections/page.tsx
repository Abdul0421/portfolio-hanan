"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Type,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Sparkles,
  Briefcase,
  FolderGit2,
  Trophy,
  Users2,
  Wrench,
  Mail,
  Eye,
} from "lucide-react";
import { SectionHeadings } from "@/lib/types";

export default function AdminSectionsManagement() {
  const [headings, setHeadings] = useState<SectionHeadings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  useEffect(() => {
    fetchHeadings();
  }, []);

  const fetchHeadings = async () => {
    try {
      const res = await fetch("/api/sections");
      const data = await res.json();
      if (data.headings) setHeadings(data.headings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    section: keyof SectionHeadings,
    field: "badge" | "title" | "subtitle",
    value: string
  ) => {
    if (!headings) return;
    setHeadings({
      ...headings,
      [section]: {
        ...headings[section],
        [field]: value,
      },
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!headings) return;
    setSaving(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/sections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(headings),
      });

      if (!res.ok) throw new Error("Gagal menyimpan judul section");

      setStatus({
        type: "success",
        message: "Seluruh judul dan teks section berhasil diperbarui dan diterapkan ke website publik!",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan";
      setStatus({ type: "error", message: msg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin mr-2 text-emerald-400" />
        <span>Memuat data judul section...</span>
      </div>
    );
  }

  if (!headings) return null;

  const sectionConfigs: Array<{
    key: keyof SectionHeadings;
    name: string;
    icon: typeof Sparkles;
    color: string;
    anchor: string;
  }> = [
    {
      key: "about",
      name: "Section About (Tentang Saya / Profil)",
      icon: Sparkles,
      color: "text-emerald-400",
      anchor: "#about",
    },
    {
      key: "experience",
      name: "Section Pengalaman Kerja & Magang",
      icon: Briefcase,
      color: "text-sky-400",
      anchor: "#experience",
    },
    {
      key: "projects",
      name: "Section Karya, Proyek & Riset",
      icon: FolderGit2,
      color: "text-emerald-400",
      anchor: "#projects",
    },
    {
      key: "achievements",
      name: "Section Prestasi & Penghargaan",
      icon: Trophy,
      color: "text-amber-400",
      anchor: "#achievements",
    },
    {
      key: "activities",
      name: "Section Organisasi & Kepemimpinan",
      icon: Users2,
      color: "text-indigo-400",
      anchor: "#activities",
    },
    {
      key: "skills",
      name: "Section Keahlian & Kompetensi",
      icon: Wrench,
      color: "text-emerald-400",
      anchor: "#skills",
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Type className="w-6 h-6 text-emerald-400" />
            <span>Kelola Judul & Teks Section</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ubah badge atas, judul utama, dan kalimat sub-judul untuk setiap bagian halaman portfolio publik.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-white/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Website</span>
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Simpan Semua Judul</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {status.type === "success" && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{status.message}</span>
        </div>
      )}

      {status.type === "error" && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sectionConfigs.map((sec) => {
            const Icon = sec.icon;
            const data = headings[sec.key];

            return (
              <div
                key={sec.key}
                className="p-6 rounded-3xl bg-[#111624] border border-white/10 flex flex-col justify-between space-y-5 hover:border-white/20 transition-all shadow-lg"
              >
                <div className="space-y-4">
                  
                  {/* Card Title Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${sec.color}`} />
                      <span>{sec.name}</span>
                    </h2>
                    <Link
                      href={`/${sec.anchor}`}
                      target="_blank"
                      className="text-[11px] font-mono text-slate-400 hover:text-emerald-400 flex items-center gap-1"
                    >
                      <span>Lihat</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Live Mini Preview Box */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 text-center space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold tracking-wider uppercase font-mono">
                      {data.badge || "BADGE SECTION"}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white font-formal tracking-tight">
                      {data.title || "Judul Section"}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto line-clamp-2">
                      {data.subtitle || "Subjudul deskriptif..."}
                    </p>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Teks Badge (Pill Atas)
                      </label>
                      <input
                        type="text"
                        value={data.badge}
                        onChange={(e) => handleInputChange(sec.key, "badge", e.target.value)}
                        placeholder="Misal: About Me"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Judul Utama Section
                      </label>
                      <input
                        type="text"
                        value={data.title}
                        onChange={(e) => handleInputChange(sec.key, "title", e.target.value)}
                        placeholder="Misal: Profil & Rekam Jejak Akademik"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Sub-Judul / Deskripsi Pengantar
                      </label>
                      <textarea
                        rows={2}
                        value={data.subtitle}
                        onChange={(e) => handleInputChange(sec.key, "subtitle", e.target.value)}
                        placeholder="Kalimat penjelasan atau deskripsi pengantar section..."
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors resize-y"
                      />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Info card for Contact Section */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Ingin mengedit judul & saluran pada Bagian Kontak?</h4>
              <p className="text-[11px] text-slate-400">
                Judul, nomor WhatsApp, email, dan header formulir pesan dapat dikelola secara mendalam di menu Kelola Kontak.
              </p>
            </div>
          </div>
          <Link
            href="/admin/dashboard/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#161e30] hover:bg-[#1d273e] border border-white/10 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
          >
            <span>Buka Panel Kontak →</span>
          </Link>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Simpan Semua Perubahan Judul</span>
          </button>
        </div>

      </form>
    </div>
  );
}

