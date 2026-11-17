"use client";

import { useState } from "react";
import Image from "next/image";
import { Briefcase, Calendar, Building2, CheckCircle2 } from "lucide-react";
import MotionReveal from "./MotionReveal";
import { Experience } from "@/lib/types";

interface ExperienceSectionProps {
  experiences: Experience[];
  headings?: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

export default function ExperienceSection({ experiences, headings }: ExperienceSectionProps) {
  const badgeText = headings?.badge || "Career & Internship";
  const titleText = headings?.title || "Pengalaman Profesional & Industri";
  const subtitleText = headings?.subtitle || "Pengalaman magang langsung pada operasional pabrik semen dan sarana perkeretaapian nasional.";

  return (
    <section id="experience" className="py-16 sm:py-20 relative overflow-hidden bg-white dark:bg-[#090d16] border-t border-slate-200/80 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <MotionReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase font-ui tracking-wider mb-2.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{badgeText}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-formal text-slate-900 dark:text-white tracking-tight">
              {titleText}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl font-formal">
              {subtitleText}
            </p>
          </MotionReveal>
        </div>

        {/* Timeline Container (Compact & Refined) */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-3 bottom-3 w-0.5 bg-gradient-to-b from-emerald-500 via-sky-500 to-indigo-500/30 md:-translate-x-1/2" />

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node Point (Compact) */}
                  <div className="absolute left-4 md:left-1/2 top-4 -translate-x-1/2 w-6 h-6 rounded-full bg-white dark:bg-[#0a0f19] border-2 border-emerald-500 flex items-center justify-center shadow-xs z-10">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>

                  {/* Spacer for Alternate layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Experience Card Content */}
                  <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-6">
                    <MotionReveal
                      direction={isEven ? "left" : "right"}
                      delay={0.15 * (index + 1)}
                    >
                      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 dark:bg-[#111726] border border-slate-200/90 dark:border-white/10 hover:border-emerald-500/40 shadow-xs hover:shadow-md dark:shadow-none transition-all duration-200 group">
                        
                        {/* Company Header & Logo */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="relative w-10 h-10 rounded-lg bg-white dark:bg-[#182133] border border-slate-200 dark:border-white/10 overflow-hidden shrink-0 flex items-center justify-center shadow-2xs p-1">
                            {exp.logo_url ? (
                              <Image
                                src={exp.logo_url}
                                alt={exp.company}
                                fill
                                className="object-contain p-1"
                                unoptimized
                              />
                            ) : (
                              <Building2 className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                              {exp.period}
                            </span>
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight truncate">
                              {exp.role}
                            </h3>
                          </div>
                        </div>

                        {/* Company & Department info */}
                        <div className="space-y-0.5 mb-2.5 pb-2.5 border-b border-slate-200 dark:border-white/10">
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 leading-snug">
                            <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span className="truncate">{exp.company}</span>
                          </p>
                          {(exp.department || exp.division) && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                              {[exp.department, exp.division].filter(Boolean).join(" • ")}
                            </p>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3 font-normal">
                          {exp.description}
                        </p>

                        {/* Responsibilities Bullets (Compact & Crisp) */}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <div className="space-y-1.5 mb-3 p-3 rounded-xl bg-white dark:bg-[#0e1422] border border-slate-200/80 dark:border-white/5">
                            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                              Tanggung Jawab Utama:
                            </p>
                            <ul className="space-y-1">
                              {exp.responsibilities.map((resp, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-1.5 text-[11.5px] text-slate-700 dark:text-slate-300 leading-snug"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Documentation Thumbnails if available */}
                        {exp.documentation_urls && exp.documentation_urls.length > 0 && (
                          <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center gap-2">
                            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                              Dokumentasi:
                            </span>
                            <div className="flex gap-1.5">
                              {exp.documentation_urls.map((url, i) => (
                                <div
                                  key={i}
                                  className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:scale-105 transition-transform"
                                >
                                  <Image
                                    src={url}
                                    alt={`Dokumentasi ${exp.company}`}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </MotionReveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
