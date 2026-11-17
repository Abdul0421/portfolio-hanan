"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { User, Save, Upload, CheckCircle2, AlertCircle, Loader2, FileDown } from "lucide-react";
import { Profile } from "@/lib/types";

export default function AdminProfileManagement() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.profile) setProfile(data.profile);
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Profile, value: any) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleTitlesChange = (value: string) => {
    if (!profile) return;
    const array = value.split("\n").map((t) => t.trim()).filter(Boolean);
    setProfile({ ...profile, titles: array });
  };

  const handleFileUpload = async (file: File, type: "avatar" | "cv") => {
    const formData = new FormData();
    formData.append("file", file);

    if (type === "avatar") setUploadingAvatar(true);
    else setUploadingCv(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengunggah file");

      if (type === "avatar") {
        handleInputChange("avatar_url", data.url);
      } else {
        handleInputChange("resume_url", data.url);
      }
      setStatus({ type: "success", message: `File ${type === "avatar" ? "foto profil" : "CV"} berhasil diunggah.` });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload gagal";
      setStatus({ type: "error", message: msg });
    } finally {
      if (type === "avatar") setUploadingAvatar(false);
      else setUploadingCv(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan perubahan");

      setStatus({ type: "success", message: "Profil berhasil diperbarui dan tersimpan permanen!" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan profil";
      setStatus({ type: "error", message: msg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Memuat data profil...</span>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="w-6 h-6 text-emerald-400" />
            <span>Manajemen Profil & Personal Branding</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ubah identitas, biografi, gelar profesional, foto profil, dan berkas CV.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Simpan Perubahan</span>
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

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Media & Avatar Section */}
        <div className="glass-panel p-6 rounded-3xl space-y-6">
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-emerald-400">
            Foto Profil & Berkas CV
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Avatar Photo */}
            <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                <Image
                  src={profile.avatar_url || "/images/profile-hanan.jpg"}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-200">
                  Foto Profil Resmi
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "avatar")}
                    className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-emerald-400 hover:file:bg-slate-700 cursor-pointer"
                  />
                </div>
                {uploadingAvatar && <p className="text-[10px] text-emerald-400 animate-pulse">Mengunggah foto...</p>}
              </div>
            </div>

            {/* Resume CV PDF */}
            <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-rose-400 shrink-0">
                <FileDown className="w-7 h-7 mb-1" />
                <span className="text-[9px] font-mono font-bold">PDF CV</span>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-200">
                  Berkas Dokumen CV (PDF)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "cv")}
                  className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-rose-400 hover:file:bg-slate-700 cursor-pointer"
                />
                {uploadingCv && <p className="text-[10px] text-rose-400 animate-pulse">Mengunggah CV...</p>}
              </div>
            </div>

          </div>
        </div>

        {/* Basic Personal Info */}
        <div className="glass-panel p-6 rounded-3xl space-y-5">
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-emerald-400">
            Identitas Utama & Gelar Profesional
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Nama Lengkap</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-sm text-white focus:border-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Lokasi Domisili</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-sm text-white focus:border-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Personal Branding Tagline
            </label>
            <input
              type="text"
              value={profile.branding_statement}
              onChange={(e) => handleInputChange("branding_statement", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-sm text-white focus:border-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Gelar Profesional Berputar (Satu judul per baris)
            </label>
            <textarea
              rows={4}
              value={profile.titles.join("\n")}
              onChange={(e) => handleTitlesChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-white focus:border-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Bio & Summary */}
        <div className="glass-panel p-6 rounded-3xl space-y-5">
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-emerald-400">
            Deskripsi Profil & Summary
          </h2>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Biografi Singkat (Hero Section)
            </label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-white focus:border-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Summary Lengkap (About Me Section)
            </label>
            <textarea
              rows={4}
              value={profile.about_text}
              onChange={(e) => handleInputChange("about_text", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-white focus:border-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Education Details */}
        <div className="glass-panel p-6 rounded-3xl space-y-5">
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-emerald-400">
            Pendidikan Akademik
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Universitas</label>
              <input
                type="text"
                value={profile.university}
                onChange={(e) => handleInputChange("university", e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Program Studi</label>
              <input
                type="text"
                value={profile.major}
                onChange={(e) => handleInputChange("major", e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">IPK Kumulatif</label>
              <input
                type="text"
                value={profile.gpa}
                onChange={(e) => handleInputChange("gpa", e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Periode Kuliah</label>
              <input
                type="text"
                value={profile.education_period}
                onChange={(e) => handleInputChange("education_period", e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Simpan Seluruh Data Profil</span>
          </button>
        </div>

      </form>
    </div>
  );
}
