"use client";

import { useState } from "react";
import {
  Wrench,
  Workflow,
  BarChart3,
  Gauge,
  ShieldCheck,
  Box,
  Terminal,
  Scan,
  Eye,
  UserCheck,
  Globe,
  Code2,
  Palette,
  Database,
  PenTool,
  Video,
  Layout,
  Laptop,
  Tv,
  FileSpreadsheet,
  Users,
  Mic,
  Award,
} from "lucide-react";
import MotionReveal from "./MotionReveal";
import { Skill, SkillCategory } from "@/lib/types";

interface SkillsSectionProps {
  skills: Skill[];
  categories: SkillCategory[];
  headings?: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

export default function SkillsSection({ skills, categories, headings }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const badgeText = headings?.badge || "Competencies & Skills";
  const titleText = headings?.title || "Keahlian Teknis & Domain Industri";
  const subtitleText = headings?.subtitle || "Penguasaan metodologi analisis proses industri, algoritma Computer Vision, dan engineering perangkat lunak.";

  const categoryNames = [
    "All",
    ...(categories.length > 0
      ? categories.map((c) => c.name)
      : [
          "Industrial Engineering",
          "AI & Computer Vision",
          "Web Development",
          "Design & Multimedia",
          "Productivity Tools",
          "Soft Skills",
        ]),
  ];

  const filteredSkills = skills.filter((skill) => {
    if (selectedCategory === "All") return true;
    return skill.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const renderIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case "workflow":
        return <Workflow className="w-5 h-5" />;
      case "barchart3":
        return <BarChart3 className="w-5 h-5" />;
      case "gauge":
        return <Gauge className="w-5 h-5" />;
      case "shieldcheck":
        return <ShieldCheck className="w-5 h-5" />;
      case "box":
        return <Box className="w-5 h-5" />;
      case "terminal":
        return <Terminal className="w-5 h-5" />;
      case "scan":
        return <Scan className="w-5 h-5" />;
      case "eye":
        return <Eye className="w-5 h-5" />;
      case "usercheck":
        return <UserCheck className="w-5 h-5" />;
      case "globe":
        return <Globe className="w-5 h-5" />;
      case "code2":
        return <Code2 className="w-5 h-5" />;
      case "palette":
        return <Palette className="w-5 h-5" />;
      case "database":
        return <Database className="w-5 h-5" />;
      case "pentool":
        return <PenTool className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      case "layout":
        return <Layout className="w-5 h-5" />;
      case "laptop":
        return <Laptop className="w-5 h-5" />;
      case "tv":
        return <Tv className="w-5 h-5" />;
      case "filespreadsheet":
        return <FileSpreadsheet className="w-5 h-5" />;
      case "users":
        return <Users className="w-5 h-5" />;
      case "mic":
        return <Mic className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  const getProficiencyStyle = (prof: string) => {
    switch (prof) {
      case "Expert":
        return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30";
      case "Advanced":
        return "bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30";
      case "Competent":
        return "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-500/30";
      default:
        return "bg-slate-500/15 text-slate-700 dark:text-slate-400 border-slate-500/30";
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-white dark:bg-[#090d16] border-t border-slate-200/80 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <MotionReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase font-ui tracking-wider mb-3">
              <Wrench className="w-3.5 h-3.5" />
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

        {/* Category Tabs (Responsive Scrollable on Mobile/Tab, Centered on Desktop) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto max-w-full px-2 sm:px-0 pb-4 mb-10 scrollbar-none">
          {categoryNames.map((name) => {
            const isSelected = selectedCategory === name;
            return (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-emerald-600 dark:bg-emerald-500 text-white shadow-xs"
                    : "bg-white dark:bg-[#111726] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 shadow-2xs"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredSkills.map((skill, index) => (
            <MotionReveal key={skill.id} delay={0.04 * ((index % 6) + 1)}>
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-[#111726] border border-slate-200 dark:border-white/10 flex items-center justify-between gap-3 hover:border-emerald-500/40 shadow-2xs hover:shadow-md dark:shadow-none transition-all duration-300 hover:-translate-y-0.5 group">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#182133] text-emerald-600 dark:text-emerald-400 border border-slate-200/80 dark:border-white/5 shrink-0 group-hover:scale-110 shadow-xs transition-transform">
                    {renderIcon(skill.icon)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {skill.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {skill.category}
                    </p>
                  </div>
                </div>

                {/* Meaningful Proficiency Badge */}
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-md border shrink-0 ${getProficiencyStyle(
                    skill.proficiency
                  )}`}
                >
                  {skill.proficiency}
                </span>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
