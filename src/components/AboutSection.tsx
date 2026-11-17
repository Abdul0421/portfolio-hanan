"use client";

import Image from "next/image";
import { GraduationCap, Award, Briefcase, Users, FileDown, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import MotionReveal from "./MotionReveal";
import CounterAnimation from "./CounterAnimation";
import { Profile } from "@/lib/types";

interface AboutSectionProps {
  profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const gpaNum = parseFloat(profile.gpa) || 3.65;

  const corePillars = [
    {
      title: "Industrial Engineering",
      desc: "Analisis VSM, eliminasi pemborosan lini produksi, Pareto & Fishbone analysis, dan optimasi tata letak stasiun kerja.",
    },
    {
      title: "HSE & Safety Innovation",
      desc: "Implementasi HIRADC, inspeksi K3 berkala, investigasi insiden, dan modernisasi kepatuhan safety menggunakan AI.",
    },
    {
      title: "AI & Computer Vision",
      desc: "Pengembangan arsitektur deteksi objek real-time menggunakan YOLOv8, OpenCV, dan pemrosesan citra untuk smart manufacturing.",
    },
    {
      title: "Full-Stack Development",
      desc: "Pembuatan dashboard monitoring interaktif, web application responsif, arsitektur RESTful API, dan integrasi database permanen.",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950/20 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <MotionReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Me</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Profil & Latar Belakang Profesional
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Memadukan ketajaman analisis teknik industri dengan kapabilitas rekayasa perangkat lunak dan otomasi berbasis kecerdasan buatan.
            </p>
          </MotionReveal>
        </div>

        {/* Dynamic Metric Counter Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <MotionReveal delay={0.1}>
            <div className="glass-panel p-6 rounded-2xl text-center group hover:border-emerald-500/50 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-500 dark:text-emerald-400 mb-1">
                <CounterAnimation value={profile.stats?.projects_count || 8} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Proyek & Inovasi
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <div className="glass-panel p-6 rounded-2xl text-center group hover:border-amber-500/50 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 dark:text-amber-400 mb-1">
                <CounterAnimation value={gpaNum} decimals={2} />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Indeks Prestasi Kumulatif (IPK)
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.3}>
            <div className="glass-panel p-6 rounded-2xl text-center group hover:border-sky-500/50 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-sky-500 dark:text-sky-400 mb-1">
                <CounterAnimation value={profile.stats?.achievements_count || 4} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Prestasi & Penghargaan
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.4}>
            <div className="glass-panel p-6 rounded-2xl text-center group hover:border-indigo-500/50 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-500 dark:text-indigo-400 mb-1">
                <CounterAnimation value={profile.stats?.organizations_count || 5} />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Organisasi & Kepanitiaan
              </p>
            </div>
          </MotionReveal>
        </div>

        {/* Two-Column Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Education & Academic History */}
          <div className="lg:col-span-5 space-y-6">
            <MotionReveal delay={0.2}>
              <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Riwayat Pendidikan
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Academic Background
                    </p>
                  </div>
                </div>

                {/* Higher Education */}
                <div className="relative pl-6 pb-6 border-l-2 border-emerald-500/40 space-y-1">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-900" />
                  <span className="text-xs font-mono text-emerald-500 dark:text-emerald-400 font-semibold">
                    {profile.education_period || "2024 – Sekarang"}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {profile.university || "Universitas Telkom Purwokerto"}
                  </h4>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {profile.major || "S1 Teknik Industri"}
                  </p>
                  <div className="pt-1.5 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 dark:text-amber-400 text-xs font-semibold">
                      IPK: {profile.gpa} / 4.00
                    </span>
                    <span className="text-xs text-slate-500">Mahasiswa Aktif</span>
                  </div>
                </div>

                {/* Secondary Education */}
                <div className="relative pl-6 space-y-1 border-l-2 border-slate-300 dark:border-slate-800">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-400 dark:bg-slate-700 border-4 border-slate-900" />
                  <span className="text-xs font-mono text-slate-500">
                    {profile.highschool_period || "2021 – 2024"}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {profile.highschool || "SMA Negeri 1 Baturraden"}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Banyumas, Jawa Tengah
                  </p>
                </div>

                {/* Location & Quick Info */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{profile.location || "Purwokerto, Jawa Tengah, Indonesia"}</span>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: In-depth Summary & Core Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <MotionReveal delay={0.3}>
              <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    Dedikasi pada Rekayasa Sistem & Keamanan Industri
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {profile.about_text}
                  </p>
                </div>

                {/* Core Focus Pillars */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    Fokus Kompetensi Utama:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {corePillars.map((pillar) => (
                      <div
                        key={pillar.title}
                        className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-1.5"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                            {pillar.title}
                          </h5>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Download CTA */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    Tertarik mempelajari rekam jejak lengkap saya?
                  </span>
                  <a
                    href={profile.resume_url || "/docs/CV_Abdul_Rasyid_Fadhilah_Hanan.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Unduh Curriculum Vitae (CV)</span>
                  </a>
                </div>
              </div>
            </MotionReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
