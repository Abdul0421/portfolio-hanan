"use client";

import { useState } from "react";
import Image from "next/image";
import { Briefcase, Calendar, Building2, CheckCircle2, ChevronRight, Shield, TrainTrack, ExternalLink } from "lucide-react";
import MotionReveal from "./MotionReveal";
import { Experience } from "@/lib/types";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <MotionReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career & Internship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Pengalaman Profesional & Industri
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Pengalaman langsung di lapangan industri persemenan dan perkeretaapian nasional, mengasah kepekaan sistemik terhadap keselamatan dan operasional.
            </p>
          </MotionReveal>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500 via-sky-500 to-indigo-500/30 md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node Point */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 z-10">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>

                  {/* Spacer for Alternate layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Experience Card Content */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <MotionReveal
                      direction={isEven ? "left" : "right"}
                      delay={0.15 * (index + 1)}
                    >
                      <div className="glass-panel p-6 sm:p-7 rounded-3xl hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl group">
                        
                        {/* Company Header & Logo */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                              {exp.logo_url ? (
                                <Image
                                  src={exp.logo_url}
                                  alt={exp.company}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              ) : (
                                <Building2 className="w-6 h-6 text-slate-400" />
                              )}
                            </div>
                            <div>
                              <span className="text-xs font-mono font-semibold text-emerald-500 dark:text-emerald-400 uppercase tracking-wider block">
                                {exp.period}
                              </span>
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                                {exp.role}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Company & Department info */}
                        <div className="space-y-1 mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>{exp.company}</span>
                          </p>
                          {(exp.department || exp.division) && (
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {[exp.department, exp.division].filter(Boolean).join(" • ")}
                            </p>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                          {exp.description}
                        </p>

                        {/* Responsibilities Bullets */}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <div className="space-y-2 mb-4">
                            <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                              Tanggung Jawab Utama:
                            </p>
                            <ul className="space-y-1.5">
                              {exp.responsibilities.map((resp, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Documentation Thumbnails if available */}
                        {exp.documentation_urls && exp.documentation_urls.length > 0 && (
                          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                            <span className="text-[11px] font-mono text-slate-400">
                              Dokumentasi:
                            </span>
                            <div className="flex gap-1.5">
                              {exp.documentation_urls.map((url, i) => (
                                <div
                                  key={i}
                                  className="relative w-8 h-8 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 cursor-pointer hover:opacity-80 transition-opacity"
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
