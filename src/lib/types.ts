export interface Profile {
  id: string;
  name: string;
  titles: string[];
  bio: string;
  about_text: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  university: string;
  major: string;
  gpa: string;
  education_period: string;
  highschool: string;
  highschool_period: string;
  avatar_url: string;
  resume_url: string;
  branding_statement: string;
  stats: {
    projects_count: number;
    achievements_count: number;
    experience_years: number;
    organizations_count: number;
  };
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  full_content?: string;
  technologies: string[];
  thumbnail_url: string;
  gallery_urls: string[];
  video_url?: string;
  pdf_url?: string;
  project_url?: string;
  github_url?: string;
  date: string;
  featured: boolean;
  published: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  department: string;
  division: string;
  period: string;
  description: string;
  responsibilities: string[];
  logo_url?: string;
  documentation_urls: string[];
  order: number;
  created_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  competition_name: string;
  level: string;
  rank: string;
  organizer: string;
  year: string;
  description: string;
  certificate_url: string;
  documentation_urls: string[];
  featured: boolean;
  order: number;
  created_at: string;
}

export interface OrganizationActivity {
  id: string;
  title: string;
  organization: string;
  role: string;
  period: string;
  category: "Organisasi" | "Kepanitiaan" | "Pengabdian Masyarakat" | "Komunitas";
  description: string;
  documentation_urls: string[];
  order: number;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: "Expert" | "Advanced" | "Competent" | "Intermediate";
  icon?: string;
  order: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface WebsiteSettings {
  site_title: string;
  site_description: string;
  meta_keywords: string;
  favicon_url: string;
  social_links: {
    github: string;
    linkedin: string;
    instagram: string;
    email: string;
    whatsapp: string;
  };
  footer_text: string;
  cv_url: string;
}

export interface MediaItem {
  id: string;
  name: string;
  original_name: string;
  url: string;
  file_type: "image" | "video" | "pdf" | "document";
  size: number;
  mime_type: string;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: string;
}

export interface DatabaseSchema {
  admin_user: AdminUser;
  profile: Profile;
  projects: Project[];
  project_categories: ProjectCategory[];
  experiences: Experience[];
  achievements: Achievement[];
  activities: OrganizationActivity[];
  skills: Skill[];
  skill_categories: SkillCategory[];
  messages: Message[];
  website_settings: WebsiteSettings;
  media_library: MediaItem[];
}
