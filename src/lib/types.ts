export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  stack: string[];
  github?: string;
  live?: string;
  status: "live" | "wip" | "oss" | "coming_soon";
  featured?: boolean;
}

export interface Skill {
  name: string;
  proficiency: number; // 0-100
  icon?: string;
}

export interface SkillCategory {
  label: string;
  prefix: string;
  skills: Skill[];
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  link?: string;
  category: "course" | "hackathon" | "recognition" | "certificate";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  startDate: string;
  endDate: string;
  type: "internship" | "education";
  description: string[];
  stack?: string[];
  location?: string;
  logo?: string;
}

export interface LoungeMessage {
  id: string;
  username: string;
  country: string;
  countryCode: string;
  text: string;
  gifUrl?: string;
  timestamp: number;
  reactions?: Record<string, number>;
  replyTo?: string;
}

export interface VisitorRecord {
  ip: string;
  city: string;
  country: string;
  countryCode: string;
  visits: number;
  lastSeen: string;
}

export interface VisitorStats {
  total: number;
  daily: number;
  weekly: number;
  monthly: number;
  countries: Record<string, number>;
}

export interface SpectrumData {
  uptime: number;
  memoryUsed: number;
  memoryTotal: number;
  cpuLoad: number;
  nodeVersion: string;
  stats: {
    projects: number;
    skills: number;
    credentials: number;
  };
  visitors: VisitorStats;
  timestamp: number;
}

export interface GiphyResult {
  id: string;
  url: string;
  preview: string;
  title: string;
}

export interface GlobeLabel {
  name: string;
  lat: number;
  lon: number;
  slug?: string;
  color?: string;
}

export interface NavLink {
  label: string;
  href: string;
  terminalPath: string;
}
