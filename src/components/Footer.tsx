"use client";

import Link from "next/link";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./SocialIcons";
import { Profile, WebsiteSettings } from "@/lib/types";

interface FooterProps {
  profile: Profile;
  settings: WebsiteSettings;
}

export default function Footer({ profile, settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = settings.social_links || {};

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#070a10] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-white/10">
          
          {/* Branding & Info */}
          <div className="space-y-0.5 text-center md:text-left">
            <p className="font-bold font-formal text-base tracking-tight text-slate-900 dark:text-white">
              {profile.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-ui">
              Industrial Engineering
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#131927] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white hover:border-emerald-500/40 shadow-2xs transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#131927] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-500/40 shadow-2xs transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#131927] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-500/40 shadow-2xs transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#131927] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/40 shadow-2xs transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-slate-700 dark:text-emerald-400 border border-slate-200 dark:border-emerald-500/30 transition-colors ml-2 cursor-pointer shadow-2xs"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Admin link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p className="text-center sm:text-left">
            © {currentYear} Abdul Rasyid Fadhilah Hanan. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/login"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-mono"
            >
              Admin Portal CMS →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
