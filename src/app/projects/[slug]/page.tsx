import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag, ExternalLink, FileText, Video } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { db } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await db.syncCloud();
  const { slug } = await params;
  const project = db.getProjectBySlug(slug) || db.getProjectById(slug);

  if (!project) {
    notFound();
  }

  const profile = db.getProfile();
  const settings = db.getWebsiteSettings();

  const images = [
    ...(project.thumbnail_url ? [project.thumbnail_url] : []),
    ...(project.gallery_urls || []).filter((u) => u !== project.thumbnail_url),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-grid-pattern selection:bg-emerald-500/25 selection:text-emerald-300">
      <Navbar cvUrl={profile.resume_url || settings.cv_url} />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Proyek</span>
          </Link>
        </div>

        {/* Title Header */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40">
                ★ Featured Project
              </span>
            )}
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5 ml-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{project.date}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        {/* Main Image Gallery */}
        {images.length > 0 && (
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl mb-12">
            <Image
              src={images[0]}
              alt={project.title}
              fill
              priority
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        {/* Details & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
              <h2 className="text-lg font-bold uppercase font-mono tracking-wider text-emerald-600 dark:text-emerald-400">
                Dokumentasi & Arsitektur Sistem
              </h2>
              <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {project.full_content || project.description}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
                Teknologi yang Digunakan
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-sky-300 border border-slate-200 dark:border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Kunjungi Live Demo</span>
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Source Code (GitHub)</span>
                  </a>
                )}
                {project.pdf_url && (
                  <a
                    href={project.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-semibold border border-rose-500/30 transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Unduh Dokumen PDF</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer profile={profile} settings={settings} />
    </div>
  );
}
