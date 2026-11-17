"use client";

import { useState } from "react";
import Image from "next/image";
import { FolderGit2, Search, ExternalLink, FileText, Sparkles, Tag, ArrowRight, Eye } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import MotionReveal from "./MotionReveal";
import ProjectModal from "./ProjectModal";
import { Project, ProjectCategory } from "@/lib/types";

interface ProjectsSectionProps {
  projects: Project[];
  categories: ProjectCategory[];
  headings?: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

export default function ProjectsSection({ projects, categories, headings }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const badgeText = headings?.badge || "Portfolio Showcase";
  const titleText = headings?.title || "Karya, Proyek & Riset Terpilih";
  const subtitleText = headings?.subtitle || "Implementasi nyata Computer Vision, otomasi industri, dan aplikasi web berbasis data.";

  const filterCategories = [
    { id: "all", name: "All Projects" },
    ...categories,
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" ||
      project.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-50/60 dark:bg-[#0a0f19] border-t border-slate-200/80 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <MotionReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase font-ui tracking-wider mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
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

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-none">
            {filterCategories.map((cat) => {
              const isSelected =
                (cat.name === "All Projects" && selectedCategory === "All") ||
                cat.name === selectedCategory;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name === "All Projects" ? "All" : cat.name)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-emerald-600 dark:bg-emerald-500 text-white shadow-xs"
                      : "bg-white dark:bg-[#111726] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-2xs"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari proyek atau teknologi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:border-emerald-500 shadow-2xs transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-xs">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Tidak ada proyek yang sesuai dengan kriteria filter atau pencarian Anda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <MotionReveal key={project.id} delay={0.1 * ((index % 3) + 1)}>
                <div
                  onClick={() => setActiveProject(project)}
                  className="rounded-3xl overflow-hidden bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 shadow-xs hover:shadow-xl dark:shadow-none transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full group cursor-pointer"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                    <Image
                      src={project.thumbnail_url || "/images/placeholder-project.jpg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-[#111726] via-transparent to-transparent opacity-80" />

                    {/* Category & Featured Badge */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white/95 dark:bg-[#0e1422]/90 backdrop-blur-md text-emerald-700 dark:text-emerald-400 border border-slate-200 dark:border-white/10 shadow-xs">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 flex items-center gap-1 backdrop-blur-md">
                          <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {project.date}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies Tag Badges */}
                    <div className="space-y-3 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-[#182133] text-slate-700 dark:text-sky-300 border border-slate-200/80 dark:border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Card Footer Action Links */}
                      <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <span className="inline-flex items-center gap-1">
                          Detail Spesifikasi
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>

                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          {project.project_url && (
                            <a
                              href={project.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                              title="Live Demo"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                              title="GitHub Repository"
                            >
                              <GithubIcon className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
