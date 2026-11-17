"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileDown, Shield, Code, Cpu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  cvUrl?: string;
}

export default function Navbar({ cvUrl = "/docs/CV_Abdul_Rasyid_Fadhilah_Hanan.pdf" }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Achievements", href: "#achievements" },
    { label: "Activities", href: "#activities" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Initials AFH */}
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-sky-500 to-indigo-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-sm shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                  AFH
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition-colors">
                Hanan
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 dark:text-slate-400 -mt-1 flex items-center gap-1">
                <span>IE</span>
                <span className="text-emerald-500">•</span>
                <span>AI</span>
                <span className="text-sky-500">•</span>
                <span>HSE</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 p-1.5 rounded-full bg-slate-100/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 text-xs font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold shadow-xs"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/25 transition-all duration-200 hover:shadow-md hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Buka navigasi menu"
              className="p-2 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel mt-2 mx-4 p-4 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
              >
                <FileDown className="w-4 h-4" />
                <span>Download CV (Curriculum Vitae)</span>
              </a>
              <Link
                href="/admin/login"
                className="w-full text-center py-2 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Portal CMS Admin →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
