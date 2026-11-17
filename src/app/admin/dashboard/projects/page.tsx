"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FolderGit2,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Upload,
  ExternalLink,
  Eye,
  Loader2,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Project, ProjectCategory } from "@/lib/types";

export default function AdminProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const emptyForm: Omit<Project, "id" | "created_at" | "updated_at"> = {
    title: "",
    slug: "",
    category: "Artificial Intelligence & Computer Vision",
    description: "",
    full_content: "",
    technologies: [],
    thumbnail_url: "/images/placeholder-project.jpg",
    gallery_urls: [],
    video_url: "",
    pdf_url: "",
    project_url: "",
    github_url: "",
    date: new Date().toISOString().substring(0, 7),
    featured: false,
    published: true,
    order: 0,
  };

  const [formData, setFormData] = useState<typeof emptyForm>(emptyForm);
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects?all=true");
      const data = await res.json();
      if (data.projects) setProjects(data.projects);
      if (data.categories) setCategories(data.categories);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData(emptyForm);
    setTechInput("");
    setModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      description: project.description,
      full_content: project.full_content || "",
      technologies: project.technologies || [],
      thumbnail_url: project.thumbnail_url || "",
      gallery_urls: project.gallery_urls || [],
      video_url: project.video_url || "",
      pdf_url: project.pdf_url || "",
      project_url: project.project_url || "",
      github_url: project.github_url || "",
      date: project.date || "",
      featured: project.featured,
      published: project.published,
      order: project.order || 0,
    });
    setTechInput((project.technologies || []).join(", "));
    setModalOpen(true);
  };

  const handleFileUpload = async (file: File, target: "thumb" | "pdf") => {
    const data = new FormData();
    data.append("file", file);

    if (target === "thumb") setUploadingThumb(true);
    else setUploadingPdf(true);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal upload file");

      if (target === "thumb") {
        setFormData((prev) => ({ ...prev, thumbnail_url: result.url }));
      } else {
        setFormData((prev) => ({ ...prev, pdf_url: result.url }));
      }
      setStatus({ type: "success", message: "File berhasil diunggah." });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload gagal";
      setStatus({ type: "error", message: msg });
    } finally {
      if (target === "thumb") setUploadingThumb(false);
      else setUploadingPdf(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, message: "" });

    const techs = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      technologies: techs,
    };

    try {
      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan proyek");

      setStatus({
        type: "success",
        message: `Proyek berhasil ${editingProject ? "diperbarui" : "dibuat"}!`,
      });
      setModalOpen(false);
      fetchProjects();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan";
      setStatus({ type: "error", message: msg });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus proyek");
      setStatus({ type: "success", message: `Proyek "${title}" berhasil dihapus.` });
      fetchProjects();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus";
      setStatus({ type: "error", message: msg });
    }
  };

  const toggleFeatured = async (project: Project) => {
    try {
      await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !project.featured }),
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const togglePublished = async (project: Project) => {
    try {
      await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !project.published }),
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-emerald-400" />
            <span>Manajemen Proyek & Hasil Karya</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tambah, perbarui, sembunyikan, atau tandai proyek unggulan (Featured Project).
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Proyek Baru</span>
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

      {/* Projects Table */}
      <div className="rounded-3xl overflow-hidden bg-[#111624] border border-white/10 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Thumbnail & Judul Proyek</th>
                <th className="py-4 px-6">Kategori</th>
                <th className="py-4 px-4 text-center">Featured</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                        <Image
                          src={project.thumbnail_url || "/images/placeholder-project.jpg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-sm truncate max-w-xs sm:max-w-md">
                          {project.title}
                        </p>
                        <p className="text-[11px] font-mono text-slate-500 truncate">
                          /{project.slug} • {project.date}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {project.category}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => toggleFeatured(project)}
                      className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        project.featured
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                      title="Klik untuk ubah featured"
                    >
                      ★ {project.featured ? "Featured" : "No"}
                    </button>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => togglePublished(project)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors cursor-pointer ${
                        project.published
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {project.published ? "Published" : "Draft"}
                    </button>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(project)}
                        className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
                        title="Edit Proyek"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                        title="Hapus Proyek"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-[#111624] border border-white/10 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">
                {editingProject ? "Edit Proyek" : "Tambah Proyek Baru"}
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
                  Judul Proyek <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: PRODSENS — Sistem Monitoring Real-Time Lini Produksi"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Kategori <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white focus:border-emerald-500 focus:outline-hidden"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Slug URL (SEO)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="otomatis dibuat jika kosong"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-mono text-white focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Deskripsi Singkat (Ringkasan)
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ringkasan singkat tentang tujuan dan nilai inovasi proyek..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Dokumentasi Lengkap / Detail Spesifikasi Proyek
                </label>
                <textarea
                  rows={5}
                  value={formData.full_content}
                  onChange={(e) => setFormData({ ...formData, full_content: e.target.value })}
                  placeholder="Jelaskan metodologi, arsitektur sistem, algoritma, hasil uji performa, dan impact proyek..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Teknologi & Toolset (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Python, YOLOv8, OpenCV, Next.js, IoT ESP32"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* Thumbnail Upload & Preview */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <label className="block text-xs font-semibold text-white">
                  Thumbnail Gambar Proyek
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                    <Image
                      src={formData.thumbnail_url || "/images/placeholder-project.jpg"}
                      alt="Thumbnail preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="space-y-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "thumb")}
                      className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-emerald-400 cursor-pointer"
                    />
                    {uploadingThumb && <p className="text-[10px] text-emerald-400 animate-pulse">Mengunggah gambar...</p>}
                  </div>
                </div>
              </div>

              {/* PDF Document Upload */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-white">
                  Dokumen Paper / Laporan Teknis (PDF)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "pdf")}
                    className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-rose-400 cursor-pointer"
                  />
                  {formData.pdf_url && (
                    <span className="text-xs font-mono text-emerald-400">PDF Terpasang ✓</span>
                  )}
                </div>
                {uploadingPdf && <p className="text-[10px] text-rose-400 animate-pulse">Mengunggah dokumen PDF...</p>}
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    URL Live Demo
                  </label>
                  <input
                    type="url"
                    value={formData.project_url}
                    onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                    placeholder="https://prodsens-demo.afhanan.dev"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    URL GitHub Repository
                  </label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    placeholder="https://github.com/afhanan/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500"
                  />
                  <span>Tandai sebagai Featured Project</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500"
                  />
                  <span>Publikasikan di Website</span>
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Simpan Proyek</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

