"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, FileDown, Mail, MessageCircle, Sparkles, Shield, Cpu, Factory } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./SocialIcons";
import RotatingText from "./RotatingText";
import MotionReveal from "./MotionReveal";
import { Profile, WebsiteSettings } from "@/lib/types";

interface HeroSectionProps {
  profile: Profile;
  settings: WebsiteSettings;
}

export default function HeroSection({ profile, settings }: HeroSectionProps) {
  const titles = profile.titles && profile.titles.length > 0 ? profile.titles : [
    "Industrial Engineering Student",
    "HSE & Safety Technology Enthusiast",
    "AI & Computer Vision Developer",
    "Full-Stack Web Developer",
    "UI/UX Designer",
  ];

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-tr from-emerald-500/10 via-sky-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Personal Intro & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Status / Badge */}
            <MotionReveal delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Telkom University Purwokerto • Industrial Engineering</span>
              </div>
            </MotionReveal>

            {/* Greeting & Name */}
            <MotionReveal delay={0.2}>
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Hello, I&apos;m
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                  {profile.name}
                </h1>
              </div>
            </MotionReveal>

            {/* Animated Rotating Professional Title */}
            <MotionReveal delay={0.3}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xl sm:text-2xl md:text-3xl">
                <span className="text-slate-600 dark:text-slate-300 font-medium">Specializing in</span>
                <RotatingText texts={titles} className="text-xl sm:text-2xl md:text-3xl" />
              </div>
            </MotionReveal>

            {/* Personal Branding Statement */}
            <MotionReveal delay={0.4}>
              <blockquote className="border-l-2 border-emerald-500 pl-4 py-1 italic text-base sm:text-lg font-medium text-slate-700 dark:text-slate-200 max-w-2xl">
                &ldquo;{profile.branding_statement || "Bridging Industrial Engineering, Safety Innovation, and Technology."}&rdquo;
              </blockquote>
            </MotionReveal>

            {/* Short Bio */}
            <MotionReveal delay={0.5}>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                {profile.bio}
              </p>
            </MotionReveal>

            {/* CTAs */}
            <MotionReveal delay={0.6}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href="#projects"
                  onClick={handleScrollToProjects}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore My Work</span>
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </a>

                <a
                  href={profile.resume_url || "/docs/CV_Abdul_Rasyid_Fadhilah_Hanan.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-200/80 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold border border-slate-300 dark:border-slate-700 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <FileDown className="w-4 h-4 text-emerald-500" />
                  <span>Download CV</span>
                </a>
              </div>
            </MotionReveal>

            {/* Social Media Links */}
            <MotionReveal delay={0.7}>
              <div className="flex items-center gap-3 pt-3">
                <span className="text-xs font-mono text-slate-400">Connect:</span>
                {settings.social_links?.github && (
                  <a
                    href={settings.social_links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-slate-200/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.social_links?.linkedin && (
                  <a
                    href={settings.social_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-slate-200/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.social_links?.instagram && (
                  <a
                    href={settings.social_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-slate-200/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                    aria-label="Instagram Profile"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.social_links?.email && (
                  <a
                    href={`mailto:${settings.social_links.email}`}
                    className="p-2 rounded-full bg-slate-200/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                    aria-label="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
                {settings.social_links?.whatsapp && (
                  <a
                    href={settings.social_links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-slate-200/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                    aria-label="WhatsApp Contact"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Visual Showcase Avatar with Floating Tech Badges */}
          <div className="lg:col-span-5 flex justify-center">
            <MotionReveal delay={0.3} className="relative w-full max-w-md">
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-sky-500/20 to-indigo-500/20 rounded-3xl blur-2xl transform scale-95" />

              {/* Main Card Frame */}
              <div className="relative glass-panel rounded-3xl p-4 sm:p-5 border border-slate-700/60 overflow-hidden shadow-2xl">
                
                {/* Tech Pattern Grid Top Right */}
                <div className="absolute top-2 right-2 flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                  <div className="w-2 h-2 rounded-full bg-sky-500/60" />
                  <div className="w-2 h-2 rounded-full bg-indigo-500/60" />
                </div>

                {/* Profile Photo Display */}
                <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                  <Image
                    src={profile.avatar_url || "/images/profile-hanan.jpg"}
                    alt={profile.name}
                    fill
                    priority
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                  {/* Overlay Identity Card Info */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white tracking-tight">
                          Abdul Rasyid Fadhilah Hanan
                        </p>
                        <p className="text-[11px] text-emerald-400 font-mono">
                          GPA 3.65 • S1 Teknik Industri
                        </p>
                      </div>
                      <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                        <Sparkles className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Micro Pills */}
                <div className="absolute -top-3 -left-3 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 shadow-lg text-[11px] font-medium text-slate-200">
                  <Factory className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Industrial Optimization</span>
                </div>

                <div className="absolute -bottom-3 -right-3 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 shadow-lg text-[11px] font-medium text-slate-200">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" />
                  <span>Computer Vision & AI</span>
                </div>
              </div>
            </MotionReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
