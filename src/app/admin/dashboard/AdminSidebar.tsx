"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Briefcase,
  Trophy,
  Users2,
  Wrench,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { SessionPayload } from "@/lib/auth";

interface AdminSidebarProps {
  session: SessionPayload;
}

export default function AdminSidebar({ session }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Kelola Profil", href: "/admin/dashboard/profile", icon: User },
    { label: "Proyek & Karya", href: "/admin/dashboard/projects", icon: FolderGit2 },
    { label: "Pengalaman Kerja", href: "/admin/dashboard/experiences", icon: Briefcase },
    { label: "Prestasi & Award", href: "/admin/dashboard/achievements", icon: Trophy },
    { label: "Organisasi & Kegiatan", href: "/admin/dashboard/activities", icon: Users2 },
    { label: "Keahlian & Skills", href: "/admin/dashboard/skills", icon: Wrench },
    { label: "Media Library", href: "/admin/dashboard/media", icon: ImageIcon },
    { label: "Pesan Masuk", href: "/admin/dashboard/messages", icon: MessageSquare },
    { label: "Pengaturan Website", href: "/admin/dashboard/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-xs text-white">
            AFH
          </div>
          <span className="font-bold text-sm text-white">CMS Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-950/95 backdrop-blur-xl border-r border-slate-800/80 flex flex-col justify-between p-4 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2 pt-2">
            <Link href="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-sky-500 to-indigo-600 p-[1.5px] shadow-sm">
                <div className="w-full h-full bg-slate-900 rounded-[9px] flex items-center justify-center font-bold text-xs text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                  AFH
                </div>
              </div>
              <div>
                <span className="font-bold text-sm text-white block">CMS Portal</span>
                <span className="text-[10px] font-mono text-emerald-400 block -mt-0.5">Admin Management</span>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold"
                      : "text-slate-400 hover:text-white hover:bg-slate-900/80"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-emerald-400 hover:bg-slate-900 transition-colors"
          >
            <span>Lihat Website Publik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{session.name || "Admin"}</p>
              <p className="text-[10px] text-slate-400 truncate">{session.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}
    </>
  );
}
