"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Mail,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  MessageCircle,
  MapPin,
  Sparkles,
  Phone,
  Send,
  Eye,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/SocialIcons";
import { ContactSettings } from "@/lib/types";

export default function AdminContactManagement() {
  const [contact, setContact] = useState<ContactSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.contact) setContact(data.contact);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ContactSettings, value: string) => {
    if (!contact) return;
    setContact({ ...contact, [field]: value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;
    setSaving(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (!res.ok) throw new Error("Gagal menyimpan perubahan kontak");

      setStatus({
        type: "success",
        message: "Pengaturan bagian kontak berhasil diperbarui dan disinkronkan ke seluruh website!",
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
        <span>Memuat pengaturan kontak...</span>
      </div>
    );
  }

  if (!contact) return null;

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="w-6 h-6 text-emerald-400" />
            <span>Kelola Bagian Kontak (Contact Section)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ubah teks ajakan, nomor WhatsApp, alamat email, link sosial media, dan domisili yang tampil di halaman utama.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/#contact"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-white/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Pratinjau di Web</span>
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Simpan Perubahan</span>
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

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section Titles & Branding */}
          <div className="p-6 rounded-3xl bg-[#111624] border border-white/10 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Judul & Teks Ajakan Section</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Badge Section
                </label>
                <input
                  type="text"
                  value={contact.section_badge}
                  onChange={(e) => handleInputChange("section_badge", e.target.value)}
                  placeholder="Misal: Get In Touch"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Judul Section
                </label>
                <input
                  type="text"
                  value={contact.section_title}
                  onChange={(e) => handleInputChange("section_title", e.target.value)}
                  placeholder="Misal: Mari Berkolaborasi & Terhubung"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Slogan / Kutipan Subtitle CTA
              </label>
              <input
                type="text"
                value={contact.section_subtitle}
                onChange={(e) => handleInputChange("section_subtitle", e.target.value)}
                placeholder="Have a project in mind? Let's build something meaningful together."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="pt-2 border-t border-white/5 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Judul Box Info Kontak (Kiri)
                </label>
                <input
                  type="text"
                  value={contact.box_title}
                  onChange={(e) => handleInputChange("box_title", e.target.value)}
                  placeholder="Misal: Informasi Kontak"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Deskripsi Pengantar Info Kontak
                </label>
                <textarea
                  rows={2}
                  value={contact.box_description}
                  onChange={(e) => handleInputChange("box_description", e.target.value)}
                  placeholder="Terbuka untuk diskusi proyek teknik industri, pengembangan model Computer Vision..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors resize-y"
                />
              </div>
            </div>
          </div>

          {/* Direct Communication Channels */}
          <div className="p-6 rounded-3xl bg-[#111624] border border-white/10 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Saluran Komunikasi Langsung</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Email Utama</span>
                </label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Lokasi Domisili</span>
                </label>
                <input
                  type="text"
                  value={contact.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Purwokerto, Jawa Tengah, Indonesia"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Nomor WhatsApp (Tampilan)</span>
                </label>
                <input
                  type="text"
                  value={contact.whatsapp_number}
                  onChange={(e) => handleInputChange("whatsapp_number", e.target.value)}
                  placeholder="+62 812-3456-7890"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Link Direct WhatsApp (wa.me)</span>
                </label>
                <input
                  type="url"
                  value={contact.whatsapp_url}
                  onChange={(e) => handleInputChange("whatsapp_url", e.target.value)}
                  placeholder="https://wa.me/6281234567890"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-white/5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>LinkedIn Profile URL</span>
                </label>
                <input
                  type="url"
                  value={contact.linkedin_url}
                  onChange={(e) => handleInputChange("linkedin_url", e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5 text-slate-300" />
                    <span>GitHub Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={contact.github_url}
                    onChange={(e) => handleInputChange("github_url", e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                    <span>Instagram Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={contact.instagram_url}
                    onChange={(e) => handleInputChange("instagram_url", e.target.value)}
                    placeholder="https://instagram.com/username"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Header Customization */}
          <div className="p-6 rounded-3xl bg-[#111624] border border-white/10 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Header Formulir Pesan (Kanan)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Judul Formulir
                </label>
                <input
                  type="text"
                  value={contact.form_title}
                  onChange={(e) => handleInputChange("form_title", e.target.value)}
                  placeholder="Misal: Kirim Pesan Langsung"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Keterangan Petunjuk Form
                </label>
                <input
                  type="text"
                  value={contact.form_subtitle}
                  onChange={(e) => handleInputChange("form_subtitle", e.target.value)}
                  placeholder="Pesan Anda akan otomatis terarsip ke sistem dashboard..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Bottom Action Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Simpan & Terapkan Perubahan Kontak</span>
            </button>
          </div>

        </div>

        {/* Right Column: Real-Time Live Preview */}
        <div className="lg:col-span-4 space-y-4 sticky top-6">
          <div className="p-5 rounded-3xl bg-[#111624] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Live Preview Kartu Kontak</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400 font-mono">
                Sesuai di Web
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-base font-bold text-white font-formal">
                  {contact.box_title || "Informasi Kontak"}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {contact.box_description || "Terbuka untuk diskusi proyek..."}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-slate-500">Email Utama</p>
                    <p className="text-xs text-white truncate font-medium">{contact.email}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-slate-500">WhatsApp</p>
                    <p className="text-xs text-white truncate font-medium">{contact.whatsapp_number}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-sky-500/15 text-sky-400">
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-slate-500">LinkedIn</p>
                    <p className="text-xs text-white truncate font-medium">{contact.linkedin_url || "Belum diatur"}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-slate-500">Domisili</p>
                    <p className="text-xs text-white truncate font-medium">{contact.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 text-[11px] text-slate-500">
              💡 Perubahan pada nomor WhatsApp, email, dan sosial media di sini otomatis memperbarui ikon kontak di Hero, Footer, dan kartu kontak publik.
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}

