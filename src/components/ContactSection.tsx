"use client";

import { Mail, MessageCircle, MapPin, Sparkles, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./SocialIcons";
import MotionReveal from "./MotionReveal";
import ContactForm from "./ContactForm";
import { Profile, WebsiteSettings } from "@/lib/types";

interface ContactSectionProps {
  profile: Profile;
  settings: WebsiteSettings;
}

export default function ContactSection({ profile, settings }: ContactSectionProps) {
  const socialLinks = settings.social_links || {};

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950/20 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <MotionReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Mail className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Mari Berkolaborasi & Terhubung
            </h2>
            <p className="mt-3 text-base sm:text-lg font-medium text-emerald-600 dark:text-emerald-400 max-w-2xl">
              &ldquo;Have a project in mind? Let&apos;s build something meaningful together.&rdquo;
            </p>
          </MotionReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <MotionReveal delay={0.2}>
              <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Informasi Kontak
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Terbuka untuk diskusi proyek teknik industri, pengembangan model Computer Vision, pembuatan website/dashboard, maupun undangan pembicara.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Email */}
                  {profile.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/50 transition-colors group"
                    >
                      <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-500 group-hover:scale-110 transition-transform">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-mono text-slate-400">Email Utama</p>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {profile.email}
                        </p>
                      </div>
                    </a>
                  )}

                  {/* WhatsApp */}
                  {socialLinks.whatsapp && (
                    <a
                      href={socialLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/50 transition-colors group"
                    >
                      <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-500 group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-mono text-slate-400">WhatsApp</p>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {profile.whatsapp || "+62 812-3456-7890"}
                        </p>
                      </div>
                    </a>
                  )}

                  {/* LinkedIn */}
                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-sky-500/50 transition-colors group"
                    >
                      <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-500 group-hover:scale-110 transition-transform">
                        <LinkedinIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-mono text-slate-400">LinkedIn Profile</p>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                          Abdul Rasyid Fadhilah Hanan
                        </p>
                      </div>
                    </a>
                  )}

                  {/* Location */}
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
                    <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-500">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-mono text-slate-400">Lokasi</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                        {profile.location || "Purwokerto, Jawa Tengah, Indonesia"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <MotionReveal delay={0.3}>
              <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Kirim Pesan Langsung
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Pesan Anda akan otomatis terarsip ke sistem dashboard admin dan mendapat respon secepatnya.
                  </p>
                </div>

                <ContactForm />
              </div>
            </MotionReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
