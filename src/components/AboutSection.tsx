"use client";

import Image from "next/image";
import { GraduationCap, Award, Briefcase, Users, FileDown, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import MotionReveal from "./MotionReveal";
import CounterAnimation from "./CounterAnimation";
import { Profile } from "@/lib/types";

interface AboutSectionProps {
  profile: Profile;
  headings?: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

export default function AboutSection({ profile, headings }: AboutSectionProps) {
  const gpaNum = parseFloat(profile.gpa) || 3.65;
  const badgeText = headings?.badge || "About Me";
  const titleText = headings?.title || "Profil & Rekam Jejak Akademik";
  const subtitleText = headings?.subtitle || "Mengintegrasikan prinsip keteknikan industri dengan rekayasa kecerdasan buatan untuk sistem produksi yang aman, terukur, dan efisien.";

  const corePillars = [
    {
      title: "Industrial Engineering",
      desc: "Value Stream Mapping (VSM), eliminasi waste lini manufaktur, perancangan tata letak stasiun kerja, dan analisis Fishbone & Pareto.",
    },
    {
      title: "HSE & Safety Innovation",
      desc: "Identifikasi bahaya kerja (HIRADC), safety briefing harian, inspeksi berkala, serta inovasi kepatuhan K3 berbasis computer vision.",
    },
    {
      title: "AI & Computer Vision",
      desc: "Implementasi model deteksi multiobjek YOLOv8, OpenCV, dan algoritma deep learning untuk pemantauan cerdas real-time di smart factory.",
    },
    {
      title: "Full-Stack Development",
      desc: "Pembangunan dashboard monitoring terintegrasi, arsitektur REST API, manajemen database permanen, dan rancang bangun web modern.",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50/60 dark:bg-[#0a0f19] border-t border-b border-slate-200 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <MotionReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase font-ui tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{badgeText}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-formal text-slate-900 dark:text-white tracking-tight">
              {titleText}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl font-formal">
              {subtitleText}
            </p>
          </MotionReveal>
        </div>

        {/* Dynamic Metric Counter Cards (High-Contrast Dual-Theme) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <MotionReveal delay={0.1}>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 text-center hover:border-emerald-500/40 shadow-xs transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-1">
                <CounterAnimation value={profile.stats?.projects_count || 8} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Proyek & Inovasi
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 text-center hover:border-amber-500/40 shadow-xs transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 dark:text-amber-400 mb-1">
                <CounterAnimation value={gpaNum} decimals={2} />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                IPK Kumulatif (Skala 4.00)
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.3}>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 text-center hover:border-sky-500/40 shadow-xs transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-sky-600 dark:text-sky-400 mb-1">
                <CounterAnimation value={profile.stats?.achievements_count || 4} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Prestasi & Penghargaan
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.4}>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 text-center hover:border-indigo-500/40 shadow-xs transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                <CounterAnimation value={profile.stats?.organizations_count || 5} />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Organisasi & Kepemimpinan
              </p>
            </div>
          </MotionReveal>
        </div>

        {/* Two-Column Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Education & Academic History */}
          <div className="lg:col-span-5 space-y-6">
            <MotionReveal delay={0.2}>
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Riwayat Pendidikan
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      Academic Background
                    </p>
                  </div>
                </div>

                {/* Higher Education */}
                <div className="relative pl-6 pb-6 border-l-2 border-emerald-500/40 space-y-1.5">
                  <div className="absolute -left-[9px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-[#111726]" />
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold block">
                    {profile.education_period || "2024 – Sekarang"}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {profile.university || "Universitas Telkom Purwokerto"}
                  </h4>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {profile.major || "S1 Teknik Industri"}
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-semibold">
                      IPK: {profile.gpa} / 4.00
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Mahasiswa Aktif</span>
                  </div>
                </div>

                {/* Secondary Education */}
                <div className="relative pl-6 space-y-1 border-l-2 border-slate-200 dark:border-white/10">
                  <div className="absolute -left-[9px] top-0.5 w-4 h-4 rounded-full bg-slate-400 dark:bg-slate-600 border-4 border-white dark:border-[#111726]" />
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">
                    {profile.highschool_period || "2021 – 2024"}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {profile.highschool || "SMA Negeri 1 Baturraden"}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Banyumas, Jawa Tengah
                  </p>
                </div>

                {/* Location */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{profile.location || "Purwokerto, Jawa Tengah, Indonesia"}</span>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: In-depth Summary & Core Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <MotionReveal delay={0.3}>
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    Dedikasi pada Rekayasa Sistem & Keamanan Industri
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {profile.about_text}
                  </p>
                </div>

                {/* Core Focus Pillars */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    Fokus Kompetensi Utama:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {corePillars.map((pillar) => (
                      <div
                        key={pillar.title}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0e1422] border border-slate-200/80 dark:border-white/5 space-y-1.5"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
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
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Tertarik melihat portofolio lengkap & riwayat pengalaman saya?
                  </span>
                  <a
                    href={profile.resume_url || "/docs/CV_Abdul_Rasyid_Fadhilah_Hanan.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
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
