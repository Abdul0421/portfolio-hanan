import Link from "next/link";
import {
  FolderGit2,
  Briefcase,
  Trophy,
  Users2,
  MessageSquare,
  Image as ImageIcon,
  PlusCircle,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { db } from "@/lib/db";

export default async function AdminDashboardOverview() {
  const profile = db.getProfile();
  const projects = db.getProjects(true);
  const experiences = db.getExperiences();
  const achievements = db.getAchievements();
  const activities = db.getActivities();
  const messages = db.getMessages();
  const media = db.getMediaLibrary();

  const unreadMessagesCount = messages.filter((m) => !m.is_read).length;

  const kpis = [
    {
      label: "Total Proyek",
      count: projects.length,
      href: "/admin/dashboard/projects",
      icon: FolderGit2,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Pengalaman Kerja",
      count: experiences.length,
      href: "/admin/dashboard/experiences",
      icon: Briefcase,
      color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    },
    {
      label: "Prestasi & Award",
      count: achievements.length,
      href: "/admin/dashboard/achievements",
      icon: Trophy,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      label: "Organisasi & Kegiatan",
      count: activities.length,
      href: "/admin/dashboard/activities",
      icon: Users2,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      label: "Pesan Masuk",
      count: messages.length,
      badge: unreadMessagesCount > 0 ? `${unreadMessagesCount} Baru` : undefined,
      href: "/admin/dashboard/messages",
      icon: MessageSquare,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
    {
      label: "Media & File",
      count: media.length,
      href: "/admin/dashboard/media",
      icon: ImageIcon,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Dynamic CMS Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Selamat Datang, {profile.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Seluruh perubahan konten yang Anda lakukan pada dashboard ini langsung disimpan secara permanen dan otomatis diperbarui di website publik.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <span>Pratinjau Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={kpi.label}
              href={kpi.href}
              className="glass-panel p-5 sm:p-6 rounded-2xl hover:border-slate-600 transition-all duration-200 hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl border ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {kpi.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white animate-pulse">
                    {kpi.badge}
                  </span>
                )}
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {kpi.count}
              </p>
              <p className="text-xs font-medium text-slate-400 mt-0.5 group-hover:text-emerald-400 transition-colors">
                {kpi.label} →
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Quick Actions */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Aksi Cepat (Quick Actions)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Link
              href="/admin/dashboard/projects"
              className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 text-xs font-semibold text-slate-200 transition-colors block"
            >
              + Tambah Proyek Baru
            </Link>
            <Link
              href="/admin/dashboard/achievements"
              className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 text-xs font-semibold text-slate-200 transition-colors block"
            >
              + Tambah Prestasi
            </Link>
            <Link
              href="/admin/dashboard/experiences"
              className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-sky-500/40 text-xs font-semibold text-slate-200 transition-colors block"
            >
              + Tambah Pengalaman
            </Link>
            <Link
              href="/admin/dashboard/media"
              className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/40 text-xs font-semibold text-slate-200 transition-colors block"
            >
              + Unggah Media Baru
            </Link>
            <Link
              href="/admin/dashboard/profile"
              className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-600 text-xs font-semibold text-slate-200 transition-colors block sm:col-span-2"
            >
              ⚙ Edit Data Profil & Kontak
            </Link>
          </div>
        </div>

        {/* Recent Messages Inbox Preview */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-rose-400" />
              <span>Pesan Masuk Terbaru</span>
            </h2>
            <Link
              href="/admin/dashboard/messages"
              className="text-xs font-semibold text-emerald-400 hover:underline"
            >
              Lihat Semua ({messages.length}) →
            </Link>
          </div>

          {messages.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">
              Belum ada pesan yang masuk melalui formulir kontak.
            </p>
          ) : (
            <div className="space-y-2.5">
              {messages.slice(0, 3).map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3.5 rounded-2xl border transition-colors ${
                    !msg.is_read
                      ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                      : "bg-slate-900/40 border-slate-800/80 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span className="font-semibold text-slate-200">{msg.name} ({msg.email})</span>
                    <span>{new Date(msg.created_at).toLocaleDateString("id-ID")}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-100">{msg.subject}</p>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
