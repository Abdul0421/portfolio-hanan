"use client";

import { useState } from "react";
import Image from "next/image";
import { Trophy, Award, Calendar, Building2, ZoomIn, Sparkles } from "lucide-react";
import MotionReveal from "./MotionReveal";
import CertificateModal from "./CertificateModal";
import { Achievement } from "@/lib/types";

interface AchievementsSectionProps {
  achievements: Achievement[];
  headings?: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

export default function AchievementsSection({ achievements, headings }: AchievementsSectionProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const badgeText = headings?.badge || "Honors & Awards";
  const titleText = headings?.title || "Prestasi & Penghargaan";
  const subtitleText = headings?.subtitle || "Pengakuan atas riset aplikatif, penulisan karya ilmiah bereputasi, dan inovasi teknologi industri.";

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-white dark:bg-[#090d16] border-t border-slate-200/80 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <MotionReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase font-ui tracking-wider mb-3">
              <Trophy className="w-3.5 h-3.5" />
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

        {/* Achievement Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {achievements.map((ach) => (
            <div key={ach.id} className="lg:col-span-12">
              <MotionReveal delay={0.2}>
                <div className="relative rounded-3xl p-6 sm:p-8 md:p-10 bg-amber-500/[0.03] dark:bg-[#111726] border border-amber-500/25 dark:border-amber-500/30 shadow-xs dark:shadow-2xl overflow-hidden group">
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* Left: Certificate Preview Card */}
                    <div className="md:col-span-5 relative">
                      <div
                        onClick={() => setSelectedAchievement(ach)}
                        className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-amber-500/30 shadow-md group/cert cursor-pointer"
                      >
                        <Image
                          src={ach.certificate_url || "/images/sertifikat-inpc-2026.jpg"}
                          alt={ach.title}
                          fill
                          className="object-cover group-hover/cert:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold shadow-lg">
                            <ZoomIn className="w-4 h-4" />
                            <span>Perbesar Sertifikat</span>
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 font-mono mt-2.5">
                        Klik gambar sertifikat untuk memperbesar
                      </p>
                    </div>

                    {/* Right: Competition Details */}
                    <div className="md:col-span-7 space-y-4">
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 text-xs font-bold rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <span>{ach.rank}</span>
                        </span>
                        <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                          {ach.level}
                        </span>
                        <span className="px-2.5 py-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                          Tahun {ach.year}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                        {ach.title}
                      </h3>

                      <div className="space-y-1.5 text-xs font-mono text-slate-600 dark:text-slate-300 pb-2 border-b border-slate-200 dark:border-white/10">
                        <p className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-semibold">
                          <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>Ajang: {ach.competition_name}</span>
                        </p>
                        <p className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                          <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>Penyelenggara: {ach.organizer}</span>
                        </p>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {ach.description}
                      </p>

                      <div className="pt-2 flex items-center gap-3">
                        <button
                          onClick={() => setSelectedAchievement(ach)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all hover:-translate-y-0.5 cursor-pointer"
                        >
                          <ZoomIn className="w-4 h-4" />
                          <span>Lihat & Unduh Sertifikat Resmi</span>
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              </MotionReveal>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Zoom Modal */}
      <CertificateModal
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </section>
  );
}
