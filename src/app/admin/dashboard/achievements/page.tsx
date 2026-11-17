"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Trophy,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Award,
} from "lucide-react";
import { Achievement } from "@/lib/types";

export default function AdminAchievementsManagement() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState<Achievement | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const emptyForm: Omit<Achievement, "id" | "created_at"> = {
    title: "",
    competition_name: "",
    level: "Tingkat Nasional",
    rank: "Juara 1",
    organizer: "",
    year: "2026",
    description: "",
    certificate_url: "/images/sertifikat-inpc-2026.jpg",
    documentation_urls: [],
    featured: true,
    order: 0,
  };

  const [formData, setFormData] = useState<typeof emptyForm>(emptyForm);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await fetch("/api/achievements");
      const data = await res.json();
      if (data.achievements) setAchievements(data.achievements);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingAch(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (ach: Achievement) => {
    setEditingAch(ach);
    setFormData({
      title: ach.title,
      competition_name: ach.competition_name,
      level: ach.level,
      rank: ach.rank,
      organizer: ach.organizer,
      year: ach.year,
      description: ach.description,
      certificate_url: ach.certificate_url,
      documentation_urls: ach.documentation_urls || [],
      featured: ach.featured,
      order: ach.order || 0,
    });
    setModalOpen(true);
  };

  const handleCertUpload = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    setUploadingCert(true);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal upload sertifikat");

      setFormData((prev) => ({ ...prev, certificate_url: result.url }));
      setStatus({ type: "success", message: "Foto sertifikat berhasil diunggah." });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload gagal";
      setStatus({ type: "error", message: msg });
    } finally {
      setUploadingCert(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, message: "" });

    try {
      const url = editingAch
        ? `/api/achievements/${editingAch.id}`
        : "/api/achievements";
      const method = editingAch ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data prestasi.");

      setStatus({
        type: "success",
        message: `Prestasi berhasil ${editingAch ? "diperbarui" : "ditambahkan"}!`,
      });
      setModalOpen(false);
      fetchAchievements();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan";
      setStatus({ type: "error", message: msg });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus prestasi "${title}"?`)) return;

    try {
      const res = await fetch(`/api/achievements/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus");
      setStatus({ type: "success", message: "Prestasi berhasil dihapus." });
      fetchAchievements();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus";
      setStatus({ type: "error", message: msg });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            <span>Manajemen Prestasi & Penghargaan</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Kelola piagam sertifikat penghargaan, kompetisi nasional/internasional, dan tahun perolehan.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Prestasi</span>
        </button>
      </div>

      {status.type && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-medium animate-in fade-in ${
            status.type === "success"
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
          }`}
        >
          {status.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{status.message}</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="p-6 rounded-3xl bg-[#111624] border border-white/10 space-y-4 hover:border-amber-500/40 transition-colors shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-16 h-12 rounded-xl bg-slate-900 border border-amber-500/40 overflow-hidden shrink-0">
                  <Image
                    src={ach.certificate_url || "/images/sertifikat-inpc-2026.jpg"}
                    alt={ach.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                      {ach.rank}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{ach.year}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1 line-clamp-1">{ach.title}</h3>
                  <p className="text-xs text-slate-400">{ach.competition_name}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(ach)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(ach.id, ach.title)}
                  className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{ach.description}</p>
            <p className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800">
              Penyelenggara: {ach.organizer} • {ach.level}
            </p>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8 rounded-3xl bg-[#111624] border border-white/10 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">
                {editingAch ? "Edit Prestasi" : "Tambah Prestasi"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Judul Prestasi / Karya <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Juara 1 Nasional — INPC 2026 (PRODSENS)"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Nama Kompetisi
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.competition_name}
                    onChange={(e) => setFormData({ ...formData, competition_name: e.target.value })}
                    placeholder="INPC 2026"
                    className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Peringkat / Rank</label>
                  <input
                    type="text"
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                    placeholder="Juara 1 / Gold Medal"
                    className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Tingkat</label>
                  <input
                    type="text"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    placeholder="Tingkat Nasional"
                    className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Penyelenggara</label>
                  <input
                    type="text"
                    value={formData.organizer}
                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                    placeholder="BKSTI / Universitas Penyelenggara"
                    className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Tahun</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Deskripsi Lengkap</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail karya, inovasi yang diajukan, dan pencapaian..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                />
              </div>

              {/* Certificate Upload */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-white">Foto Sertifikat / Piagam</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleCertUpload(e.target.files[0])}
                    className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-emerald-400 cursor-pointer"
                  />
                  {formData.certificate_url && (
                    <span className="text-xs font-mono text-emerald-400">Sertifikat Terpasang ✓</span>
                  )}
                </div>
                {uploadingCert && <p className="text-[10px] text-emerald-400 animate-pulse">Mengunggah sertifikat...</p>}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-bold"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan Prestasi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

