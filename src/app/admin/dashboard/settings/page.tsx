"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Globe,
  Share2,
} from "lucide-react";
import { WebsiteSettings } from "@/lib/types";

export default function AdminSettingsManagement() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.settings) setSettings(data.settings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof WebsiteSettings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const handleSocialChange = (platform: string, value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      social_links: {
        ...settings.social_links,
        [platform]: value,
      },
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Gagal menyimpan pengaturan");

      setStatus({
        type: "success",
        message: "Pengaturan website berhasil diperbarui dan tersimpan permanen!",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan";
      setStatus({ type: "error", message: msg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Memuat pengaturan website...</span>
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-emerald-400" />
            <span>Pengaturan Global & SEO Website</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Konfigurasi metadata mesin pencari (SEO), tautan media sosial, teks footer, dan parameter umum.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Simpan Pengaturan</span>
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

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* SEO & Meta */}
        <div className="p-6 rounded-3xl bg-[#111624] border border-white/10 space-y-4 shadow-lg">
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-emerald-400 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>SEO & Metadata Mesin Pencari</span>
          </h2>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Judul Website (SEO Title)
            </label>
            <input
              type="text"
              value={settings.site_title}
              onChange={(e) => handleInputChange("site_title", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Deskripsi Meta (SEO Description)
            </label>
            <textarea
              rows={3}
              value={settings.site_description}
              onChange={(e) => handleInputChange("site_description", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Kata Kunci Meta (Keywords)
            </label>
            <input
              type="text"
              value={settings.meta_keywords}
              onChange={(e) => handleInputChange("meta_keywords", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="p-6 rounded-3xl bg-[#111624] border border-white/10 space-y-4 shadow-lg">
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-emerald-400 flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            <span>Tautan Media Sosial & Kontak</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">GitHub URL</label>
              <input
                type="url"
                value={settings.social_links?.github || ""}
                onChange={(e) => handleSocialChange("github", e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">LinkedIn URL</label>
              <input
                type="url"
                value={settings.social_links?.linkedin || ""}
                onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Instagram URL</label>
              <input
                type="url"
                value={settings.social_links?.instagram || ""}
                onChange={(e) => handleSocialChange("instagram", e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">WhatsApp URL</label>
              <input
                type="url"
                value={settings.social_links?.whatsapp || ""}
                onChange={(e) => handleSocialChange("whatsapp", e.target.value)}
                placeholder="https://wa.me/6281234567890"
                className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Footer & General */}
        <div className="p-6 rounded-3xl bg-[#111624] border border-white/10 space-y-4 shadow-lg">
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-emerald-400">
            Footer & Hak Cipta
          </h2>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Teks Hak Cipta Footer
            </label>
            <input
              type="text"
              value={settings.footer_text}
              onChange={(e) => handleInputChange("footer_text", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white"
            />
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Simpan Seluruh Pengaturan Website</span>
          </button>
        </div>

      </form>
    </div>
  );
}

