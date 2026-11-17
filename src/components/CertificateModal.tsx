"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut, Download, Award, Calendar, Building2 } from "lucide-react";
import { Achievement } from "@/lib/types";

interface CertificateModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export default function CertificateModal({ achievement, onClose }: CertificateModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setZoomLevel(1);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (achievement) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [achievement, onClose]);

  if (!achievement) return null;

  const certUrl = achievement.certificate_url || "/images/sertifikat-inpc-2026.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-panel rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700/60 text-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Action Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{achievement.rank}</span>
            </span>
            <span className="px-2.5 py-0.5 text-xs text-slate-400">
              {achievement.level}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              title="Perkecil"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-400 w-10 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              title="Perbesar"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <a
              href={certUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30"
              title="Unduh Sertifikat"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-2"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Certificate Zoom Container */}
          <div className="w-full overflow-auto max-h-[55vh] flex items-center justify-center p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div
              className="transition-transform duration-200 origin-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <Image
                src={certUrl}
                alt={achievement.title}
                width={800}
                height={550}
                className="rounded-lg shadow-2xl object-contain max-w-full h-auto"
                unoptimized
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {achievement.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>Penyelenggara: {achievement.organizer}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>Tahun: {achievement.year}</span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
              {achievement.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
