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
  Sparkles,
} from "lucide-react";
import MotionReveal from "./MotionReveal";
import { Skill, SkillCategory } from "@/lib/types";

interface SkillsSectionProps {
  skills: Skill[];
  categories: SkillCategory[];
}

export default function SkillsSection({ skills, categories }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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

  // Dynamic Lucide icon mapper
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
        return "bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border-emerald-500/30";
      case "Advanced":
        return "bg-sky-500/15 text-sky-500 dark:text-sky-400 border-sky-500/30";
      case "Competent":
        return "bg-indigo-500/15 text-indigo-500 dark:text-indigo-400 border-indigo-500/30";
      default:
        return "bg-slate-500/15 text-slate-500 dark:text-slate-400 border-slate-500/30";
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <MotionReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Wrench className="w-3.5 h-3.5" />
              <span>Competencies & Skills</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Keahlian Teknis & Domain Industri
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Penguasaan metodologi optimasi manufaktur, algoritma Computer Vision, full-stack web engineering, dan perangkat desain kreatif.
            </p>
          </MotionReveal>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categoryNames.map((name) => {
            const isSelected = selectedCategory === name;
            return (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20 font-semibold"
                    : "bg-slate-200/70 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800"
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
            <MotionReveal key={skill.id} delay={0.05 * ((index % 6) + 1)}>
              <div className="glass-panel p-5 rounded-2xl flex items-center justify-between gap-3 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-500 dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                    {renderIcon(skill.icon)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-500 transition-colors">
                      {skill.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {skill.category}
                    </p>
                  </div>
                </div>

                {/* Meaningful Proficiency Badge */}
                <span
                  className={`px-2.5 py-1 text-[10px] font-semibold rounded-full border shrink-0 ${getProficiencyStyle(
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
