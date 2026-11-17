"use client";

import { ArrowDown, FileDown, Mail, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./SocialIcons";
import RotatingText from "./RotatingText";
import MotionReveal from "./MotionReveal";
import HeroPortraitCard from "./HeroPortraitCard";
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

  const socialLinks = settings.social_links || {};

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-500/[0.04] rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Personal Intro */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Status Pill */}
            <MotionReveal delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold font-ui tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span>Telkom University Purwokerto • Teknik Industri</span>
              </div>
            </MotionReveal>

            {/* Greeting & Main Name Heading (Dual Theme High Contrast) */}
            <MotionReveal delay={0.2}>
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-slate-500 dark:text-slate-400 font-semibold">
                  HELLO, I&apos;M
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-formal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                  {profile.name}
                </h1>
              </div>
            </MotionReveal>

            {/* Rotating Professional Roles */}
            <MotionReveal delay={0.3}>
              <div className="flex items-center justify-center lg:justify-start min-h-[40px]">
                <RotatingText texts={titles} className="text-xl sm:text-2xl md:text-3xl font-semibold" />
              </div>
            </MotionReveal>

            {/* Personal Branding Quote */}
            <MotionReveal delay={0.4}>
              <blockquote className="border-l-2 border-emerald-500 pl-4 py-2 italic font-formal text-base sm:text-lg text-slate-700 dark:text-slate-200 max-w-2xl bg-slate-100/80 dark:bg-white/[0.03] rounded-r-xl">
                &ldquo;{profile.branding_statement || "Bridging Industrial Engineering, Safety Innovation, and Technology."}&rdquo;
              </blockquote>
            </MotionReveal>

            {/* Short Bio */}
            <MotionReveal delay={0.5}>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-normal">
                {profile.bio}
              </p>
            </MotionReveal>

            {/* Primary Action Buttons */}
            <MotionReveal delay={0.6}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <a
                  href="#projects"
                  onClick={handleScrollToProjects}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold font-ui shadow-md shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>Explore My Work</span>
                  <ArrowDown className="w-4 h-4" />
                </a>

                <a
                  href={profile.resume_url || "/docs/CV_Abdul_Rasyid_Fadhilah_Hanan.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border-slate-300 dark:bg-[#161e30] dark:hover:bg-[#1d273e] dark:text-slate-200 dark:border-white/10 text-xs sm:text-sm font-semibold font-ui border transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
                >
                  <FileDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Download CV</span>
                </a>
              </div>
            </MotionReveal>

            {/* Social Media Links Bar */}
            <MotionReveal delay={0.7}>
              <div className="flex items-center gap-3 pt-3">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Connect:</span>
                
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white dark:bg-[#131927] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white hover:border-emerald-500/50 shadow-xs transition-all"
                    aria-label="GitHub Profile"
                    title="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}

                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white dark:bg-[#131927] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500/50 shadow-xs transition-all"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}

                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white dark:bg-[#131927] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 hover:border-pink-500/50 shadow-xs transition-all"
                    aria-label="Instagram Profile"
                    title="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}

                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="p-2.5 rounded-xl bg-white dark:bg-[#131927] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 shadow-xs transition-all"
                    aria-label="Send Email"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}

                {socialLinks.whatsapp && (
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white dark:bg-[#131927] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 shadow-xs transition-all"
                    aria-label="WhatsApp Contact"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}
              </div>
            </MotionReveal>

          </div>

          {/* Right Column: Interactive 3D Animated Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <MotionReveal delay={0.3} className="w-full">
              <HeroPortraitCard
                avatarUrl={profile.avatar_url || "/images/profile-hanan.jpg"}
                name={profile.name}
                gpa={profile.gpa || "3.68"}
                major="S1 Teknik Industri"
              />
            </MotionReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
