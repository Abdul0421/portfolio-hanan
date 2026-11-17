"use client";

import { useEffect, useState } from "react";
import {
  Wrench,
  Plus,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Award,
} from "lucide-react";
import { Skill, SkillCategory } from "@/lib/types";

export default function AdminSkillsManagement() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const emptyForm: Omit<Skill, "id"> = {
    name: "",
    category: "Industrial Engineering",
    proficiency: "Advanced",
    icon: "Award",
    order: 0,
  };

  const [formData, setFormData] = useState<typeof emptyForm>(emptyForm);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      if (data.skills) setSkills(data.skills);
      if (data.categories) setCategories(data.categories);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon || "Award",
      order: skill.order || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, message: "" });

    try {
      const url = editingSkill ? `/api/skills/${editingSkill.id}` : "/api/skills";
      const method = editingSkill ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal menyimpan keahlian.");

      setStatus({
        type: "success",
        message: `Keahlian berhasil ${editingSkill ? "diperbarui" : "ditambahkan"}!`,
      });
      setModalOpen(false);
      fetchSkills();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan";
      setStatus({ type: "error", message: msg });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus keahlian "${name}"?`)) return;

    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus");
      setStatus({ type: "success", message: `Keahlian "${name}" berhasil dihapus.` });
      fetchSkills();
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
            <Wrench className="w-6 h-6 text-emerald-400" />
            <span>Manajemen Keahlian & Kompetensi</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Kelola keahlian teknik industri, kecerdasan buatan (Computer Vision), web dev, dan perangkat lunak.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Keahlian Baru</span>
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

      {/* Skills Table */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
            <tr>
              <th className="py-4 px-6">Nama Keahlian</th>
              <th className="py-4 px-6">Kategori</th>
              <th className="py-4 px-6">Tingkat Kemampuan</th>
              <th className="py-4 px-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {skills.map((skill) => (
              <tr key={skill.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-4 px-6 font-bold text-white text-sm">
                  {skill.name}
                </td>
                <td className="py-4 px-6 text-slate-300">
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {skill.category}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {skill.proficiency}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditModal(skill)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-emerald-400 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id, skill.name)}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
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

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md glass-panel rounded-3xl border border-slate-700 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">
                {editingSkill ? "Edit Keahlian" : "Tambah Keahlian"}
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
                  Nama Keahlian <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: YOLOv8, Value Stream Mapping"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                >
                  <option value="Industrial Engineering">Industrial Engineering</option>
                  <option value="AI & Computer Vision">AI & Computer Vision</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Design & Multimedia">Design & Multimedia</option>
                  <option value="Productivity Tools">Productivity Tools</option>
                  <option value="Soft Skills">Soft Skills</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Tingkat Kemampuan</label>
                <select
                  value={formData.proficiency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      proficiency: e.target.value as Skill["proficiency"],
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
                >
                  <option value="Expert">Expert</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Competent">Competent</option>
                  <option value="Intermediate">Intermediate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Nama Icon (Lucide)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Workflow, Scan, Eye, Code2, Box"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
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
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan Keahlian"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
