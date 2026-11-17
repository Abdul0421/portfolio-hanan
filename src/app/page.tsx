import { db } from "@/lib/db";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  await db.syncCloud();
  const profile = db.getProfile();
  const projects = db.getProjects(false);
  const projectCategories = db.getProjectCategories();
  const experiences = db.getExperiences();
  const achievements = db.getAchievements();
  const activities = db.getActivities();
  const skills = db.getSkills();
  const skillCategories = db.getSkillCategories();
  const settings = db.getWebsiteSettings();
  const contactSettings = db.getContactSettings();
  const headings = db.getSectionHeadings();

  return (
    <div className="relative min-h-screen bg-grid-pattern selection:bg-emerald-500/25 selection:text-emerald-300">
      <Navbar cvUrl={profile.resume_url || settings.cv_url} />
      
      <main className="flex-1">
        <HeroSection profile={profile} settings={settings} />
        <AboutSection profile={profile} headings={headings.about} />
        <ExperienceSection experiences={experiences} headings={headings.experience} />
        <ProjectsSection projects={projects} categories={projectCategories} headings={headings.projects} />
        <AchievementsSection achievements={achievements} headings={headings.achievements} />
        <ActivitiesSection activities={activities} headings={headings.activities} />
        <SkillsSection skills={skills} categories={skillCategories} headings={headings.skills} />
        <ContactSection profile={profile} settings={settings} contactSettings={contactSettings} />
      </main>

      <Footer profile={profile} settings={settings} />
    </div>
  );
}
