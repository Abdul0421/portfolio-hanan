"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
} from "lucide-react";
import { Experience } from "@/lib/types";

export default function AdminExperiencesManagement() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const emptyForm: Omit<Experience, "id" | "created_at"> = {
    company: "",
    role: "",
    department: "",
    division: "",
    period: "2025",
    description: "",
    responsibilities: [],
    logo_url: "",
    documentation_urls: [],
    order: 0,
  };

  const [formData, setFormData] = useState<typeof emptyForm>(emptyForm);
  const [respInput, setRespInput] = useState("");

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/experiences");
      const data = await res.json();
      if (data.experiences) setExperiences(data.experiences);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingExp(null);
    setFormData(emptyForm);
    setRespInput("");
    setModalOpen(true);
  };

  const openEditModal = (exp: Experience) => {
    setEditingExp(exp);
    setFormData({
      company: exp.company,
      role: exp.role,
      department: exp.department || "",
      division: exp.division || "",
      period: exp.period || "",
      description: exp.description || "",
      responsibilities: exp.responsibilities || [],
      logo_url: exp.logo_url || "",
      documentation_urls: exp.documentation_urls || [],
      order: exp.order || 0,
    });
    setRespInput((exp.responsibilities || []).join("\n"));
    setModalOpen(true);
  };

  const handleLogoUpload = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    setUploadingLogo(true);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal upload logo");

      setFormData((prev) => ({ ...prev, logo_url: result.url }));
      setStatus({ type: "success", message: "Logo instansi berhasil diunggah." });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload gagal";
      setStatus({ type: "error", message: msg });
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, message: "" });

    const responsibilities = respInput
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      responsibilities,
    };

    try {
      const url = editingExp
        ? `/api/experiences/${editingExp.id}`
        : "/api/experiences";
      const method = editingExp ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data pengalaman.");

      setStatus({
        type: "success",
        message: `Pengalaman berhasil ${editingExp ? "diperbarui" : "ditambahkan"}!`,
      });
      setModalOpen(false);
      fetchExperiences();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan";
      setStatus({ type: "error", message: msg });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, comp: string) => {
    if (!confirm(`Hapus pengalaman di "${comp}"?`)) return;

    try {
      const res = await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus");
      setStatus({ type: "success", message: "Pengalaman berhasil dihapus." });
      fetchExperiences();
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
            <Briefcase className="w-6 h-6 text-sky-400" />
            <span>Manajemen Pengalaman Profesional</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Kelola riwayat magang, departemen, deskripsi pekerjaan, dan tanggung jawab teknis.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pengalaman</span>
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

      {/* Experience List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-6 rounded-3xl bg-[#111624] border border-white/10 space-y-4 hover:border-white/20 transition-colors shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                  {exp.logo_url ? (
                    <Image
                      src={exp.logo_url}
                      alt={exp.company}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <Building2 className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div>
                  <span className="text-[11px] font-mono font-semibold text-emerald-400 uppercase">
                    {exp.period}
                  </span>
                  <h3 className="text-base font-bold text-white">{exp.role}</h3>
                  <p className="text-xs font-medium text-slate-300">{exp.company}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(exp)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(exp.id, exp.company)}
                  className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">{exp.description}</p>

            {exp.responsibilities && exp.responsibilities.length > 0 && (
              <div className="pt-2 border-t border-slate-800">
                <p className="text-[11px] font-mono text-slate-500 mb-1.5 uppercase">Tanggung Jawab:</p>
                <ul className="space-y-1">
                  {exp.responsibilities.slice(0, 3).map((r, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8 rounded-3xl bg-[#111624] border border-white/10 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">
                {editingExp ? "Edit Pengalaman" : "Tambah Pengalaman"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Nama Perusahaan / Instansi <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="PT Semen Bima / PT KAI"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Posisi / Peran <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Safety & HSE Intern"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Departemen</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Departemen HRGASH"
                    className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Divisi</label>
                  <input
                    type="text"
                    value={formData.division}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                    placeholder="Divisi Safety"
                    className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Periode</label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="2025 / Jun - Agu 2025"
                    className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ringkasan ruang lingkup magang..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Tanggung Jawab Teknis (Satu per baris)
                </label>
                <textarea
                  rows={4}
                  value={respInput}
                  onChange={(e) => setRespInput(e.target.value)}
                  placeholder="Melakukan inspeksi K3 berkala&#10;Menganalisis kepatuhan APD&#10;Menyusun safety briefing harian"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white font-mono"
                />
              </div>

              {/* Logo Upload */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-white">Logo Perusahaan</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleLogoUpload(e.target.files[0])}
                    className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-emerald-400 cursor-pointer"
                  />
                  {formData.logo_url && (
                    <span className="text-xs font-mono text-emerald-400">Logo Terpasang ✓</span>
                  )}
                </div>
                {uploadingLogo && <p className="text-[10px] text-emerald-400 animate-pulse">Mengunggah logo...</p>}
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
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan Pengalaman"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

