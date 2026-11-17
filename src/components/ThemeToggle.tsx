"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("af_theme") as "dark" | "light" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = saved || (systemPrefersDark ? "dark" : "dark"); // Default dark mode
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (t: "dark" | "light") => {
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("af_theme", next);
    applyTheme(next);
  };

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full bg-slate-800/40 border border-slate-700/50 ${className}`} />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={`Beralih ke mode ${theme === "dark" ? "terang" : "gelap"}`}
      aria-label="Toggle theme"
      className={`p-2 rounded-full transition-all duration-300 relative group
        ${
          theme === "dark"
            ? "bg-slate-800/80 text-amber-300 hover:bg-slate-700/90 border border-slate-700/60"
            : "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300"
        } ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 transition-transform group-hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform group-hover:-rotate-12" />
      )}
    </button>
  );
}
