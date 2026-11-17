"use client";

import { Mail, MessageCircle, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./SocialIcons";
import MotionReveal from "./MotionReveal";
import ContactForm from "./ContactForm";
import { Profile, WebsiteSettings, ContactSettings } from "@/lib/types";

interface ContactSectionProps {
  profile: Profile;
  settings: WebsiteSettings;
  contactSettings?: ContactSettings;
}

export default function ContactSection({ profile, settings, contactSettings }: ContactSectionProps) {
  const socialLinks = settings.social_links || {};

  const badgeText = contactSettings?.section_badge || "Get In Touch";
  const sectionTitle = contactSettings?.section_title || "Mari Berkolaborasi & Terhubung";
  const sectionSubtitle = contactSettings?.section_subtitle || "Have a project in mind? Let's build something meaningful together.";
  const boxTitle = contactSettings?.box_title || "Informasi Kontak";
  const boxDescription = contactSettings?.box_description || "Terbuka untuk diskusi proyek teknik industri, pengembangan model Computer Vision, pembuatan website/dashboard, maupun permohonan narasumber.";
  
  const emailVal = contactSettings?.email || profile.email;
  const whatsappNum = contactSettings?.whatsapp_number || profile.whatsapp || profile.phone || "+62 812-3456-7890";
  const whatsappUrl = contactSettings?.whatsapp_url || socialLinks.whatsapp || `https://wa.me/${whatsappNum.replace(/[^0-9]/g, "")}`;
  const linkedinUrl = contactSettings?.linkedin_url || socialLinks.linkedin;
  const githubUrl = contactSettings?.github_url || socialLinks.github;
  const instagramUrl = contactSettings?.instagram_url || socialLinks.instagram;
  const locationVal = contactSettings?.location || profile.location || "Purwokerto, Jawa Tengah, Indonesia";

  const formTitle = contactSettings?.form_title || "Kirim Pesan Langsung";
  const formSubtitle = contactSettings?.form_subtitle || "Pesan Anda akan otomatis terarsip ke sistem dashboard admin dan mendapat respon secepatnya.";

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50/60 dark:bg-[#0a0f19] border-t border-slate-200/80 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <MotionReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase font-ui tracking-wider mb-3">
              <Mail className="w-3.5 h-3.5" />
              <span>{badgeText}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-formal text-slate-900 dark:text-white tracking-tight">
              {sectionTitle}
            </h2>
            <p className="mt-3 text-base sm:text-lg font-medium text-emerald-600 dark:text-emerald-400 max-w-2xl font-formal italic">
              &ldquo;{sectionSubtitle}&rdquo;
            </p>
          </MotionReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <MotionReveal delay={0.2}>
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-xs dark:shadow-none space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-formal text-slate-900 dark:text-white mb-2">
                    {boxTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {boxDescription}
                  </p>
                </div>

                <div className="space-y-3.5 pt-2">
                  {/* Email */}
                  {emailVal && (
                    <a
                      href={`mailto:${emailVal}`}
                      className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0e1422] border border-slate-200/80 dark:border-white/5 hover:border-emerald-500/40 transition-colors group cursor-pointer shadow-2xs"
                    >
                      <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Email Utama</p>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {emailVal}
                        </p>
                      </div>
                    </a>
                  )}

                  {/* WhatsApp */}
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0e1422] border border-slate-200/80 dark:border-white/5 hover:border-emerald-500/40 transition-colors group cursor-pointer shadow-2xs"
                    >
                      <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">WhatsApp</p>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {whatsappNum}
                        </p>
                      </div>
                    </a>
                  )}

                  {/* LinkedIn */}
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0e1422] border border-slate-200/80 dark:border-white/5 hover:border-sky-500/40 transition-colors group cursor-pointer shadow-2xs"
                    >
                      <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
                        <LinkedinIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">LinkedIn Profile</p>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                          Abdul Rasyid Fadhilah Hanan
                        </p>
                      </div>
                    </a>
                  )}

                  {/* Location */}
                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0e1422] border border-slate-200/80 dark:border-white/5 shadow-2xs">
                    <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Lokasi Domisili</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                        {locationVal}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Social Links row if available */}
                {(githubUrl || instagramUrl) && (
                  <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500 dark:text-slate-400">Social Links:</span>
                    <div className="flex items-center gap-2">
                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-slate-100 dark:bg-[#182133] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white transition-colors"
                          title="GitHub"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {instagramUrl && (
                        <a
                          href={instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-slate-100 dark:bg-[#182133] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                          title="Instagram"
                        >
                          <InstagramIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <MotionReveal delay={0.3}>
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-xs dark:shadow-none space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-formal text-slate-900 dark:text-white">
                    {formTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {formSubtitle}
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
