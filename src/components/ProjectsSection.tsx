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
}

export default function ProjectsSection({ projects, categories }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-950/20 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <MotionReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Karya, Proyek & Riset Terpilih
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Menampilkan karya rekayasa sistem terintegrasi, model Computer Vision, dan solusi digital yang siap diimplementasikan di dunia nyata.
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20 font-semibold"
                      : "bg-slate-200/70 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800"
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
              className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center glass-panel rounded-3xl">
            <p className="text-sm text-slate-400">
              Tidak ada proyek yang sesuai dengan kriteria filter atau pencarian Anda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <MotionReveal key={project.id} delay={0.1 * ((index % 3) + 1)}>
                <div
                  onClick={() => setActiveProject(project)}
                  className="glass-panel rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col h-full group cursor-pointer"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <Image
                      src={project.thumbnail_url || "/images/placeholder-project.jpg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />

                    {/* Category & Featured Badge */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-900/85 backdrop-blur-md text-emerald-400 border border-slate-700">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 backdrop-blur-md">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    {/* Quick View Button Hover overlay */}
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Lihat Detail Proyek</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-slate-400">
                        {project.date}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies Tag Badges */}
                    <div className="space-y-3 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-sky-300 border border-slate-200 dark:border-slate-700/80"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Card Footer Action Links */}
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-500 group-hover:text-emerald-400">
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
                              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 transition-colors"
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
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
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
