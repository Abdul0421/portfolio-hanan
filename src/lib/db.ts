import fs from "fs";
import path from "path";
import seedData from "@/data/seed.json";
import { supabase, isSupabaseConfigured } from "./supabase";
import {
  DatabaseSchema,
  Profile,
  Project,
  ProjectCategory,
  Experience,
  Achievement,
  OrganizationActivity,
  Skill,
  SkillCategory,
  Message,
  WebsiteSettings,
  ContactSettings,
  SectionHeadings,
  MediaItem,
  AdminUser,
} from "./types";

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "db.json");
const TMP_FILE = path.join("/tmp", "portfolio_db.json");

let inMemoryDb: DatabaseSchema | null = null;

function ensureDbFile(): DatabaseSchema {
  if (inMemoryDb) {
    return inMemoryDb;
  }

  // Check /tmp/portfolio_db.json first (if previously updated on serverless)
  try {
    if (fs.existsSync(TMP_FILE)) {
      const raw = fs.readFileSync(TMP_FILE, "utf-8");
      inMemoryDb = JSON.parse(raw) as DatabaseSchema;
      return inMemoryDb;
    }
  } catch (err) {
    // ignore
  }

  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      inMemoryDb = JSON.parse(raw) as DatabaseSchema;
      return inMemoryDb;
    }
  } catch (err) {
    console.error("Failed to parse db.json:", err);
  }

  const initialData = seedData as unknown as DatabaseSchema;
  inMemoryDb = initialData;
  return initialData;
}

async function syncFromSupabase(): Promise<DatabaseSchema> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("portfolio_state")
        .select("data")
        .eq("id", "main")
        .single();

      if (!error && data?.data) {
        inMemoryDb = data.data as DatabaseSchema;
        return inMemoryDb;
      } else if (error && (error.code === "PGRST116" || error.message.includes("0 rows"))) {
        const initial = ensureDbFile();
        await supabase
          .from("portfolio_state")
          .upsert({ id: "main", data: initial, updated_at: new Date().toISOString() });
        return initial;
      }
    } catch (e) {
      console.warn("Supabase sync warning:", e);
    }
  }
  return ensureDbFile();
}

function saveDb(data: DatabaseSchema): void {
  inMemoryDb = data;

  if (isSupabaseConfigured && supabase) {
    (async () => {
      try {
        const { error } = await supabase
          .from("portfolio_state")
          .upsert({ id: "main", data, updated_at: new Date().toISOString() });
        if (error) console.warn("Supabase cloud upsert warning:", error.message);
      } catch (err: unknown) {
        console.warn("Supabase cloud save error:", err);
      }
    })();
  }

  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);
  } catch (fsErr: unknown) {
    // Serverless (Netlify / Vercel) read-only filesystem fallback
    try {
      fs.writeFileSync(TMP_FILE, JSON.stringify(data, null, 2), "utf-8");
    } catch (tmpErr) {
      console.warn("Could not write to /tmp, retained in memory:", tmpErr);
    }
  }
}

export const db = {
  syncCloud(): Promise<DatabaseSchema> {
    return syncFromSupabase();
  },

  getRaw(): DatabaseSchema {
    return ensureDbFile();
  },

  // ADMIN
  getAdminUser(): AdminUser {
    const data = ensureDbFile();
    return data.admin_user;
  },
  updateAdminPassword(hash: string): void {
    const data = ensureDbFile();
    data.admin_user.password_hash = hash;
    saveDb(data);
  },

  // PROFILE
  getProfile(): Profile {
    const data = ensureDbFile();
    return data.profile;
  },
  updateProfile(updates: Partial<Profile>): Profile {
    const data = ensureDbFile();
    data.profile = { ...data.profile, ...updates };
    saveDb(data);
    return data.profile;
  },

  // PROJECTS
  getProjects(includeUnpublished = false): Project[] {
    const data = ensureDbFile();
    let projects = [...(data.projects || [])];
    if (!includeUnpublished) {
      projects = projects.filter((p) => p.published);
    }
    return projects.sort((a, b) => a.order - b.order);
  },
  getProjectBySlug(slug: string): Project | undefined {
    const data = ensureDbFile();
    return data.projects?.find((p) => p.slug === slug);
  },
  getProjectById(id: string): Project | undefined {
    const data = ensureDbFile();
    return data.projects?.find((p) => p.id === id);
  },
  createProject(item: Omit<Project, "id" | "created_at" | "updated_at">): Project {
    const data = ensureDbFile();
    const newProject: Project = {
      ...item,
      id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    data.projects = [newProject, ...(data.projects || [])];
    saveDb(data);
    return newProject;
  },
  updateProject(id: string, updates: Partial<Project>): Project | null {
    const data = ensureDbFile();
    const index = data.projects?.findIndex((p) => p.id === id);
    if (index === -1 || index === undefined) return null;
    data.projects[index] = {
      ...data.projects[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    saveDb(data);
    return data.projects[index];
  },
  deleteProject(id: string): boolean {
    const data = ensureDbFile();
    const initialLen = data.projects?.length || 0;
    data.projects = (data.projects || []).filter((p) => p.id !== id);
    saveDb(data);
    return data.projects.length < initialLen;
  },

  // PROJECT CATEGORIES
  getProjectCategories(): ProjectCategory[] {
    const data = ensureDbFile();
    return (data.project_categories || []).sort((a, b) => a.order - b.order);
  },
  saveProjectCategories(categories: ProjectCategory[]): void {
    const data = ensureDbFile();
    data.project_categories = categories;
    saveDb(data);
  },

  // EXPERIENCES
  getExperiences(): Experience[] {
    const data = ensureDbFile();
    return (data.experiences || []).sort((a, b) => a.order - b.order);
  },
  createExperience(item: Omit<Experience, "id" | "created_at">): Experience {
    const data = ensureDbFile();
    const newExp: Experience = {
      ...item,
      id: `exp-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    data.experiences = [...(data.experiences || []), newExp];
    saveDb(data);
    return newExp;
  },
  updateExperience(id: string, updates: Partial<Experience>): Experience | null {
    const data = ensureDbFile();
    const index = data.experiences?.findIndex((e) => e.id === id);
    if (index === -1 || index === undefined) return null;
    data.experiences[index] = { ...data.experiences[index], ...updates };
    saveDb(data);
    return data.experiences[index];
  },
  deleteExperience(id: string): boolean {
    const data = ensureDbFile();
    const initialLen = data.experiences?.length || 0;
    data.experiences = (data.experiences || []).filter((e) => e.id !== id);
    saveDb(data);
    return data.experiences.length < initialLen;
  },

  // ACHIEVEMENTS
  getAchievements(): Achievement[] {
    const data = ensureDbFile();
    return (data.achievements || []).sort((a, b) => a.order - b.order);
  },
  createAchievement(item: Omit<Achievement, "id" | "created_at">): Achievement {
    const data = ensureDbFile();
    const newAch: Achievement = {
      ...item,
      id: `ach-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    data.achievements = [...(data.achievements || []), newAch];
    saveDb(data);
    return newAch;
  },
  updateAchievement(id: string, updates: Partial<Achievement>): Achievement | null {
    const data = ensureDbFile();
    const index = data.achievements?.findIndex((a) => a.id === id);
    if (index === -1 || index === undefined) return null;
    data.achievements[index] = { ...data.achievements[index], ...updates };
    saveDb(data);
    return data.achievements[index];
  },
  deleteAchievement(id: string): boolean {
    const data = ensureDbFile();
    const initialLen = data.achievements?.length || 0;
    data.achievements = (data.achievements || []).filter((a) => a.id !== id);
    saveDb(data);
    return data.achievements.length < initialLen;
  },

  // ACTIVITIES & ORGANIZATIONS
  getActivities(): OrganizationActivity[] {
    const data = ensureDbFile();
    return (data.activities || []).sort((a, b) => a.order - b.order);
  },
  createActivity(item: Omit<OrganizationActivity, "id" | "created_at">): OrganizationActivity {
    const data = ensureDbFile();
    const newAct: OrganizationActivity = {
      ...item,
      id: `act-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    data.activities = [...(data.activities || []), newAct];
    saveDb(data);
    return newAct;
  },
  updateActivity(id: string, updates: Partial<OrganizationActivity>): OrganizationActivity | null {
    const data = ensureDbFile();
    const index = data.activities?.findIndex((a) => a.id === id);
    if (index === -1 || index === undefined) return null;
    data.activities[index] = { ...data.activities[index], ...updates };
    saveDb(data);
    return data.activities[index];
  },
  deleteActivity(id: string): boolean {
    const data = ensureDbFile();
    const initialLen = data.activities?.length || 0;
    data.activities = (data.activities || []).filter((a) => a.id !== id);
    saveDb(data);
    return data.activities.length < initialLen;
  },

  // SKILLS
  getSkills(): Skill[] {
    const data = ensureDbFile();
    return (data.skills || []).sort((a, b) => a.order - b.order);
  },
  createSkill(item: Omit<Skill, "id">): Skill {
    const data = ensureDbFile();
    const newSkill: Skill = {
      ...item,
      id: `sk-${Date.now()}`,
    };
    data.skills = [...(data.skills || []), newSkill];
    saveDb(data);
    return newSkill;
  },
  updateSkill(id: string, updates: Partial<Skill>): Skill | null {
    const data = ensureDbFile();
    const index = data.skills?.findIndex((s) => s.id === id);
    if (index === -1 || index === undefined) return null;
    data.skills[index] = { ...data.skills[index], ...updates };
    saveDb(data);
    return data.skills[index];
  },
  deleteSkill(id: string): boolean {
    const data = ensureDbFile();
    const initialLen = data.skills?.length || 0;
    data.skills = (data.skills || []).filter((s) => s.id !== id);
    saveDb(data);
    return data.skills.length < initialLen;
  },

  // SKILL CATEGORIES
  getSkillCategories(): SkillCategory[] {
    const data = ensureDbFile();
    return (data.skill_categories || []).sort((a, b) => a.order - b.order);
  },
  saveSkillCategories(categories: SkillCategory[]): void {
    const data = ensureDbFile();
    data.skill_categories = categories;
    saveDb(data);
  },

  // MESSAGES
  getMessages(): Message[] {
    const data = ensureDbFile();
    return (data.messages || []).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },
  createMessage(item: Pick<Message, "name" | "email" | "subject" | "message">): Message {
    const data = ensureDbFile();
    const newMsg: Message = {
      ...item,
      id: `msg-${Date.now()}`,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    data.messages = [newMsg, ...(data.messages || [])];
    saveDb(data);
    return newMsg;
  },
  markMessageRead(id: string, is_read = true): boolean {
    const data = ensureDbFile();
    const msg = data.messages?.find((m) => m.id === id);
    if (!msg) return false;
    msg.is_read = is_read;
    saveDb(data);
    return true;
  },
  deleteMessage(id: string): boolean {
    const data = ensureDbFile();
    const initialLen = data.messages?.length || 0;
    data.messages = (data.messages || []).filter((m) => m.id !== id);
    saveDb(data);
    return data.messages.length < initialLen;
  },

  // WEBSITE SETTINGS
  getWebsiteSettings(): WebsiteSettings {
    const data = ensureDbFile();
    return data.website_settings;
  },
  updateWebsiteSettings(updates: Partial<WebsiteSettings>): WebsiteSettings {
    const data = ensureDbFile();
    data.website_settings = { ...data.website_settings, ...updates };
    saveDb(data);
    return data.website_settings;
  },

  // CONTACT SETTINGS & CHANNELS
  getContactSettings(): ContactSettings {
    const data = ensureDbFile();
    if (!data.contact_settings) {
      data.contact_settings = {
        section_badge: "Get In Touch",
        section_title: "Mari Berkolaborasi & Terhubung",
        section_subtitle: "Have a project in mind? Let's build something meaningful together.",
        box_title: "Informasi Kontak",
        box_description: "Terbuka untuk diskusi proyek teknik industri, pengembangan model Computer Vision, pembuatan website/dashboard, maupun permohonan narasumber.",
        email: data.profile.email || "abdulrasyidhanan@gmail.com",
        whatsapp_number: data.profile.phone || "+62 812-3456-7890",
        whatsapp_url: data.website_settings?.social_links?.whatsapp || "https://wa.me/6281234567890",
        linkedin_url: data.website_settings?.social_links?.linkedin || "https://linkedin.com/in/abdul-rasyid-fadhilah-hanan",
        github_url: data.website_settings?.social_links?.github || "https://github.com/afhanan",
        instagram_url: data.website_settings?.social_links?.instagram || "https://instagram.com/afhanan_",
        location: data.profile.location || "Purwokerto, Jawa Tengah, Indonesia",
        form_title: "Kirim Pesan Langsung",
        form_subtitle: "Pesan Anda akan otomatis terarsip ke sistem dashboard admin dan mendapat respon secepatnya.",
      };
      saveDb(data);
    }
    return data.contact_settings;
  },
  updateContactSettings(updates: Partial<ContactSettings>): ContactSettings {
    const data = ensureDbFile();
    const current = this.getContactSettings();
    const updated = { ...current, ...updates };
    data.contact_settings = updated;

    // Sync relevant fields to profile and website_settings
    if (updates.email) {
      data.profile.email = updates.email;
      if (data.website_settings?.social_links) data.website_settings.social_links.email = updates.email;
    }
    if (updates.whatsapp_number) {
      data.profile.phone = updates.whatsapp_number;
    }
    if (updates.whatsapp_url && data.website_settings?.social_links) {
      data.website_settings.social_links.whatsapp = updates.whatsapp_url;
    }
    if (updates.linkedin_url && data.website_settings?.social_links) {
      data.website_settings.social_links.linkedin = updates.linkedin_url;
    }
    if (updates.github_url && data.website_settings?.social_links) {
      data.website_settings.social_links.github = updates.github_url;
    }
    if (updates.instagram_url && data.website_settings?.social_links) {
      data.website_settings.social_links.instagram = updates.instagram_url;
    }
    if (updates.location) {
      data.profile.location = updates.location;
    }

    saveDb(data);
    return updated;
  },

  // SECTION HEADINGS & TITLES
  getSectionHeadings(): SectionHeadings {
    const data = ensureDbFile();
    if (!data.section_headings) {
      data.section_headings = {
        about: {
          badge: "About Me",
          title: "Profil & Rekam Jejak Akademik",
          subtitle: "Mengintegrasikan prinsip keteknikan industri dengan rekayasa kecerdasan buatan untuk sistem produksi yang aman, terukur, dan efisien.",
        },
        experience: {
          badge: "Career & Internship",
          title: "Pengalaman Profesional & Industri",
          subtitle: "Pengalaman magang langsung pada operasional pabrik semen dan sarana perkeretaapian nasional.",
        },
        projects: {
          badge: "Portfolio Showcase",
          title: "Karya, Proyek & Riset Terpilih",
          subtitle: "Implementasi nyata Computer Vision, otomasi industri, dan aplikasi web berbasis data.",
        },
        achievements: {
          badge: "Honors & Awards",
          title: "Prestasi & Penghargaan",
          subtitle: "Pengakuan atas riset aplikatif, penulisan karya ilmiah bereputasi, dan inovasi teknologi industri.",
        },
        activities: {
          badge: "Leadership & Involvement",
          title: "Organisasi & Kepemimpinan",
          subtitle: "Pengalaman aktif dalam tata kelola organisasi kemahasiswaan, perancangan publikasi digital, dan pengabdian sosial.",
        },
        skills: {
          badge: "Competencies & Skills",
          title: "Keahlian Teknis & Domain Industri",
          subtitle: "Penguasaan metodologi analisis proses industri, algoritma Computer Vision, dan engineering perangkat lunak.",
        },
      };
      saveDb(data);
    }
    return data.section_headings;
  },
  updateSectionHeadings(updates: Partial<SectionHeadings>): SectionHeadings {
    const data = ensureDbFile();
    const current = this.getSectionHeadings();
    const updated: SectionHeadings = {
      about: { ...current.about, ...(updates.about || {}) },
      experience: { ...current.experience, ...(updates.experience || {}) },
      projects: { ...current.projects, ...(updates.projects || {}) },
      achievements: { ...current.achievements, ...(updates.achievements || {}) },
      activities: { ...current.activities, ...(updates.activities || {}) },
      skills: { ...current.skills, ...(updates.skills || {}) },
    };
    data.section_headings = updated;
    saveDb(data);
    return updated;
  },

  // MEDIA LIBRARY
  getMediaLibrary(): MediaItem[] {
    const data = ensureDbFile();
    return (data.media_library || []).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },
  addMediaItem(item: Omit<MediaItem, "id" | "created_at">): MediaItem {
    const data = ensureDbFile();
    const newItem: MediaItem = {
      ...item,
      id: `med-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    data.media_library = [newItem, ...(data.media_library || [])];
    saveDb(data);
    return newItem;
  },
  deleteMediaItem(id: string): boolean {
    const data = ensureDbFile();
    const item = data.media_library?.find((m) => m.id === id);
    if (!item) return false;

    // Remove local file if it resides in public/uploads/
    if (item.url.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", item.url);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error("Failed to delete local uploaded file:", err);
        }
      }
    }

    data.media_library = data.media_library.filter((m) => m.id !== id);
    saveDb(data);
    return true;
  },
};

