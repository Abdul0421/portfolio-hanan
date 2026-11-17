"use client";

import Image from "next/image";
import { Users2, Calendar, Building } from "lucide-react";
import MotionReveal from "./MotionReveal";
import { OrganizationActivity } from "@/lib/types";

interface ActivitiesSectionProps {
  activities: OrganizationActivity[];
  headings?: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

export default function ActivitiesSection({ activities, headings }: ActivitiesSectionProps) {
  const badgeText = headings?.badge || "Leadership & Involvement";
  const titleText = headings?.title || "Organisasi & Kepemimpinan";
  const subtitleText = headings?.subtitle || "Pengalaman aktif dalam tata kelola organisasi kemahasiswaan, perancangan publikasi digital, dan pengabdian sosial.";

  return (
    <section id="activities" className="py-24 relative overflow-hidden bg-slate-50/60 dark:bg-[#0a0f19] border-t border-slate-200/80 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <MotionReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase font-ui tracking-wider mb-3">
              <Users2 className="w-3.5 h-3.5" />
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

        {/* Editorial Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {activities.map((item, index) => {
            const docUrl = item.documentation_urls?.[0];

            return (
              <MotionReveal key={item.id} delay={0.1 * ((index % 3) + 1)}>
                <div className="rounded-3xl p-6 sm:p-7 h-full flex flex-col justify-between bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 hover:border-indigo-500/40 shadow-xs hover:shadow-md dark:shadow-none transition-all duration-300 group">
                  
                  <div className="space-y-4">
                    {/* Documentation Photo if exists */}
                    {docUrl && (
                      <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5">
                        <Image
                          src={docUrl}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      </div>
                    )}

                    {/* Category Badge & Period */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border border-indigo-500/30">
                        {item.category}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.period}</span>
                      </span>
                    </div>

                    {/* Position & Organization */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{item.organization}</span>
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Role Tag Footer */}
                  <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span>Posisi: {item.role}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>

                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
