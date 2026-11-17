"use client";

import Link from "next/link";
import { Mail, MessageCircle, Heart, ArrowUp } from "lucide-react";
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
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-950/80 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800/80">
          
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-sky-500 to-indigo-600 p-[1.5px] shadow-sm">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-xs text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                  AFH
                </span>
              </div>
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                {profile.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Industrial Engineering • AI • HSE Tech
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-500 transition-colors"
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
                className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-sky-500 transition-colors"
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
                className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 transition-colors ml-2 cursor-pointer"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Admin link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © {currentYear} Abdul Rasyid Fadhilah Hanan. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/login"
              className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-mono"
            >
              Admin Dashboard CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
