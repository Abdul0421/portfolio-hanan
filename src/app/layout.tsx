import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdul Rasyid Fadhilah Hanan | Portfolio",
  description: "Mahasiswa S1 Teknik Industri Telkom University Purwokerto | HSE & Safety Tech Enthusiast | AI & Computer Vision Developer | Web Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className="scroll-smooth">
      <body className="min-h-screen bg-[#0d1117] text-[#e6edf3] font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
