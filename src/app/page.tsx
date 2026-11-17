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

export default async function HomePage() {
  const profile = db.getProfile();
  const projects = db.getProjects(false);
  const projectCategories = db.getProjectCategories();
  const experiences = db.getExperiences();
  const achievements = db.getAchievements();
  const activities = db.getActivities();
  const skills = db.getSkills();
  const skillCategories = db.getSkillCategories();
  const settings = db.getWebsiteSettings();

  return (
    <div className="relative min-h-screen bg-grid-pattern selection:bg-emerald-500/25 selection:text-emerald-300">
      <Navbar cvUrl={profile.resume_url || settings.cv_url} />
      
      <main className="flex-1">
        <HeroSection profile={profile} settings={settings} />
        <AboutSection profile={profile} />
        <ExperienceSection experiences={experiences} />
        <ProjectsSection projects={projects} categories={projectCategories} />
        <AchievementsSection achievements={achievements} />
        <ActivitiesSection activities={activities} />
        <SkillsSection skills={skills} categories={skillCategories} />
        <ContactSection profile={profile} settings={settings} />
      </main>

      <Footer profile={profile} settings={settings} />
    </div>
  );
}
