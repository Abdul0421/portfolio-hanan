"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Users2,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Building,
} from "lucide-react";
import { OrganizationActivity } from "@/lib/types";

export default function AdminActivitiesManagement() {
  const [activities, setActivities] = useState<OrganizationActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAct, setEditingAct] = useState<OrganizationActivity | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const emptyForm: Omit<OrganizationActivity, "id" | "created_at"> = {
    title: "",
    organization: "",
    role: "",
    period: "2025",
    category: "Organisasi",
    description: "",
    documentation_urls: [],
    order: 0,
  };

  const [formData, setFormData] = useState<typeof emptyForm>(emptyForm);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await fetch("/api/activities");
      const data = await res.json();
      if (data.activities) setActivities(data.activities);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingAct(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (act: OrganizationActivity) => {
    setEditingAct(act);
    setFormData({
      title: act.title,
      organization: act.organization,
      role: act.role,
      period: act.period,
      category: act.category,
      description: act.description,
      documentation_urls: act.documentation_urls || [],
      order: act.order || 0,
    });
    setModalOpen(true);
  };

  const handleDocUpload = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    setUploadingDoc(true);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal upload dokumentasi");

      setFormData((prev) => ({
        ...prev,
        documentation_urls: [result.url, ...(prev.documentation_urls || [])],
      }));
      setStatus({ type: "success", message: "Foto dokumentasi berhasil diunggah." });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload gagal";
      setStatus({ type: "error", message: msg });
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, message: "" });

    try {
      const url = editingAct
        ? `/api/activities/${editingAct.id}`
        : "/api/activities";
      const method = editingAct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal menyimpan aktivitas.");

      setStatus({
        type: "success",
        message: `Aktivitas berhasil ${editingAct ? "diperbarui" : "ditambahkan"}!`,
      });
      setModalOpen(false);
      fetchActivities();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan";
      setStatus({ type: "error", message: msg });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus "${name}"?`)) return;

    try {
      const res = await fetch(`/api/activities/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus");
      setStatus({ type: "success", message: "Aktivitas berhasil dihapus." });
      fetchActivities();
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
            <Users2 className="w-6 h-6 text-indigo-400" />
            <span>Manajemen Organisasi & Kegiatan</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Kelola posisi, himpunan mahasiswa, kepanitiaan, komunitas, dan kegiatan sosial.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Aktivitas / Organisasi</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((act) => (
          <div
            key={act.id}
            className="p-6 rounded-3xl bg-[#111624] border border-white/10 space-y-3.5 hover:border-indigo-500/40 transition-colors flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 text-[10px] font-semibold border border-indigo-500/30">
                  {act.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{act.period}</span>
              </div>

              <h3 className="text-base font-bold text-white mt-1">{act.title}</h3>
              <p className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{act.organization}</span>
              </p>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{act.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">Posisi: {act.role}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(act)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(act.id, act.title)}
                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8 rounded-3xl bg-[#111624] border border-white/10 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">
                {editingAct ? "Edit Organisasi / Aktivitas" : "Tambah Organisasi / Aktivitas"}
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
                    Nama Jabatan / Peran <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Kepala Divisi Media dan Informasi"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Nama Organisasi / Event <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Himpunan Mahasiswa Teknik Industri"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as OrganizationActivity["category"],
                      })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  >
                    <option value="Organisasi">Organisasi</option>
                    <option value="Kepanitiaan">Kepanitiaan</option>
                    <option value="Komunitas">Komunitas</option>
                    <option value="Pengabdian Masyarakat">Pengabdian Masyarakat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Periode</label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="2025 – 2026"
                    className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Role Singkat</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Kepala Divisi"
                    className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Deskripsi Tanggung Jawab</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Memimpin tim publikasi visual, memproduksi aftermovie..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                />
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
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan Aktivitas"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

