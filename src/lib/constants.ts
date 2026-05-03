import type { Project, SkillCategory, Credential, Experience, NavLink, GlobeLabel } from "./types";

export const NAV_LINKS: NavLink[] = [
  { label: "~/home", href: "/", terminalPath: "home" },
  { label: "~/projects", href: "/projects", terminalPath: "projects" },
  { label: "~/credentials", href: "/credentials", terminalPath: "credentials" },
  { label: "~/forge", href: "/skills", terminalPath: "forge" },
  { label: "~/persona", href: "/about", terminalPath: "persona" },
  { label: "~/resume", href: "/resume", terminalPath: "resume" },
  { label: "~/node", href: "/node", terminalPath: "node" },
];

export const SOCIALS = {
  github: "https://github.com/AmanPatre",
  linkedin: "https://www.linkedin.com/in/aman-patre-2ab2a428a/",
  email: "amanpatre25@gmail.com",
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "dataguardian",
    title: "DataGuardian",
    description:
      "AI-powered Chrome extension detecting third-party trackers in real time across 50+ sites. Features a privacy scoring system (A+ to F) with D3.js visualization.",
    stack: ["React.js", "Node.js", "Chrome APIs", "Gemini API", "D3.js"],
    github: "https://github.com/AmanPatre/DataGuardian/blob/main/README.md",

    status: "live",
    featured: true,
  },
  {
    id: 2,
    slug: "synapse",
    title: "Synapse",
    description:
      "Smart learning & resource aggregation platform with an AI roadmap generator for personalized career paths and interactive data visualizations for effort vs reward analysis.",
    stack: ["Next.js 15", "TypeScript", "Gemini AI", "Redis", "Prisma"],
    github: "https://github.com/AmanPatre",
    live: "https://edu-site-tcfp.vercel.app/",
    status: "live",
    featured: true,
  },
  {
    id: 3,
    slug: "roomate",
    title: "Roomate",
    description:
      "Full-stack AI interview platform simulating 50+ technical scenarios with sub-500ms voice processing latency. Generates comprehensive AI debriefs in under 5s.",
    stack: ["Next.js", "React", "Firebase", "Google Gemini API", "Tailwind CSS"],
    github: "https://github.com/AmanPatre/Roommate",
    live: "https://roommate-livid.vercel.app/",
    status: "live",
    featured: true,
  },
  {
    id: 4,
    slug: "node-ai",
    title: "NODE AI",
    description:
      "Portfolio AI assistant powered by Google Gemini. Knows Aman's full background and responds in under a second globally.",
    stack: ["Gemini", "Next.js", "Edge Runtime"],
    live: "/node",
    status: "live",
    featured: true,
  },
  {
    id: 5,
    slug: "coming-soon-1",
    title: "// coming_soon",
    description: "Next project in the pipeline. Stay tuned.",
    stack: [],
    status: "coming_soon",
  }

];

export const SKILLS: SkillCategory[] = [
  {
    label: "Languages",
    prefix: "├──",
    skills: [
      { name: "JavaScript", proficiency: 90 },
      { name: "TypeScript", proficiency: 85 },
      { name: "Python", proficiency: 85 },
      { name: "C++", proficiency: 80 },
      { name: "Java", proficiency: 75 },
      { name: "SQL", proficiency: 85 },
    ],
  },

  {
    label: "Frontend",
    prefix: "├──",
    skills: [
      { name: "React.js", proficiency: 90 },
      { name: "Next.js", proficiency: 85 },
      { name: "Tailwind CSS", proficiency: 90 },
      { name: "D3.js", proficiency: 75 },
    ],
  },
  {
    label: "Backend",
    prefix: "├──",
    skills: [
      { name: "Node.js", proficiency: 90 },
      { name: "Express.js", proficiency: 88 },
      { name: "NestJS", proficiency: 75 },
      { name: "REST APIs", proficiency: 92 },
      { name: "Socket.io", proficiency: 80 },
    ],
  },
  {
    label: "Databases & Tools",
    prefix: "└──",
    skills: [
      { name: "MongoDB", proficiency: 88 },
      { name: "MySQL", proficiency: 85 },
      { name: "Redis", proficiency: 80 },
      { name: "Git & GitHub", proficiency: 90 },
      { name: "Docker", proficiency: 75 },
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: "pearlthoughts-intern",
    role: "Backend Intern",
    company: "PearlThoughts",
    duration: "Nov 2025 — Jan 2026",
    startDate: "2025-11-01",
    endDate: "2026-01-31",
    type: "internship",
    description: [
      "Built scalable serverless REST APIs for the Schedula healthcare platform",
      "Optimized SQL database interactions via Sequelize ORM",
      "Refactored core business logic for appointment editing and IVR flows",
      "Ensured robust handling of appointment data and seamless data consistency",
    ],
    stack: ["Node.js", "Express", "TypeScript", "Sequelize ORM", "SQL", "REST APIs"],
    location: "Remote",
  },
  {
    id: "vit-education",
    role: "B.Tech Computer Science & Engineering",
    company: "VIT Bhopal University",
    duration: "Sep 2023 → Present",
    startDate: "2023-09-01",
    endDate: "2027-05-31",
    type: "education",
    description: [
      "CGPA: 8.69/10",
      "Solved 200+ problems on LeetCode",
      "Web Team Core Member at AI Club",

    ],
    location: "Sehore, MP, India",
  },
];

export const CREDENTIALS: Credential[] = [
  {
    id: "cert-1",
    title: "Bits and Bytes of Computer Networking",
    issuer: "Google",
    date: "2024-05-15",
    category: "certificate",
    image: "/credentials/google-networking.png",
    link: "https://coursera.org/verify/your-id-here"
  },
  {
    id: "cert-2",
    title: "Introduction to Machine Learning",
    issuer: "NPTEL",
    date: "2024-08-20",
    category: "course",
    image: "/credentials/nptel.png",
    link: "https://shorturl.at/cKaMI"
  },
  {
    id: "cert-3",
    title: "MongoDB Developer's Toolkit",
    issuer: "GeeksforGeeks",
    date: "2024-10-10",
    category: "certificate",
    image: "/credentials/mongodb.png",
    link: "https://shorturl.at/agw5r"
  },
  {
    id: "cert-4",
    title: "MATLAB",
    issuer: "Mathworks",
    date: "2024-11-05",
    category: "certificate",
    image: "/credentials/matlab.png",
    link: "https://shorturl.at/esYZr"
  },
  {
    id: "cert-5",
    title: "3rd Place Winner — College Hackathon",
    issuer: "VIT Bhopal",
    date: "2024-11-05",
    category: "hackathon",
    image: "/credentials/mozila.png",
    link: "https://www.linkedin.com/posts/amanpatre007_hackathonsuccess-teamwork-innovation-activity-7276180090231672832-NDyW?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEYqfqMBNdFruxVf5z6gSu2FI9tTx92yoNM"
  },
  {
    id: "cert-6",
    title: "Top 20 Finalist– CodeForge’25 Hackathon",
    issuer: "VIT Bhopal",
    date: "2024-11-05",
    category: "hackathon",
    image: "/credentials/webforge.png",
    link: "https://www.linkedin.com/posts/amanpatre007_codeforge2025-hackathonjourney-keepbuilding-activity-7322155585200631808-Csei?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEYqfqMBNdFruxVf5z6gSu2FI9tTx92yoNM"
  },
  {
    id: "cert-7",
    title: "Google IT Support",
    issuer: "Google",
    date: "2025-12-29",
    category: "certificate",
    image: "/credentials/itsupport.png",
    link: "https://www.credly.com/badges/12487574-6aef-4a8c-aada-ac3f54f77ece/public_url"
  }
];

export const GLOBE_LABELS: GlobeLabel[] = [
  { name: "React", lat: 37, lon: -95, slug: "react" },
  { name: "Python", lat: 20, lon: 77, slug: "python" },
  { name: "Next.js", lat: 51, lon: 10, slug: "nextdotjs", color: "white" },
  { name: "Express", lat: 36, lon: 138, slug: "express", color: "white" },
  { name: "C++", lat: 1, lon: 104, slug: "cplusplus" },
  { name: "TypeScript", lat: 54, lon: -2, slug: "typescript" },
  { name: "MongoDB", lat: 48, lon: 9, slug: "mongodb" },
  { name: "Node.js", lat: 56, lon: -106, slug: "nodedotjs" },
  { name: "Socket.io", lat: -25, lon: 133, slug: "socketdotio", color: "white" },
  { name: "JavaScript", lat: -10, lon: -50, slug: "javascript" },
  { name: "MySQL", lat: 40, lon: 30, slug: "mysql", color: "white" },
  { name: "Tailwind", lat: -30, lon: 20, slug: "tailwindcss" },
  { name: "GitHub", lat: -15, lon: 80, slug: "github", color: "white" },
];

export const TERMINAL_SNIPPETS = [
  "const dev = new Aman()",
  "import { skills } from './brain'",
  "git commit -m 'another banger'",
  "npm run build:future",
  "while (learning) { grow() }",
  "export default AmanPatre",
  "docker run --rm amanpatre",
  "SELECT * FROM projects;",
  "npm install express --save",
  "curl -X GET /api/hire-me",
  "const mongoose = require('mongoose')",
  "sudo apt install ambition",
];

export const NODE_SYSTEM_PROMPT = `You are NODE, an AI assistant embedded in Aman Patre's developer portfolio. You know everything about Aman Patre.

ABOUT Aman Patre:
- Full-Stack & Backend Developer
- B.Tech Computer Science student at VIT Bhopal (2023–2027), CGPA: 8.69/10
- Location: India (VIT Bhopal, Madhya Pradesh)
- Phone: 9685468332
- Email: amanpatre25@gmail.com
- GitHub: https://github.com/AmanPatre
- LinkedIn: https://www.linkedin.com/in/aman-patre-2ab2a428a/

EXPERIENCE:
- Backend Intern at PearlThoughts (Nov 2025 – Jan 2026, Remote)
- Built scalable serverless REST APIs using Node.js, Express, TypeScript
- Optimized SQL queries with Sequelize ORM for performance
- Refactored business logic for appointment systems and IVR workflows

PROJECTS:
1. DataGuardian — AI-powered Chrome extension for tracker detection
   - Uses Gemini API, D3.js for visualization
   - Real-time analysis across 50+ sites
   - Privacy scoring system (A+ to F)

2. Synapse — Smart learning & resource aggregation platform
   - Built with Next.js 15, Redis, Prisma
   - AI roadmap generator for personalized learning
   - Reduced API latency by 40%

3. Roomate — AI interview preparation platform
   - Simulates 50+ technical interview scenarios
   - Real-time voice processing (<500ms latency)
   - AI-generated interview feedback in <5s

ACHIEVEMENTS:
- 3rd Place – College Hackathon (Mozilla Firefox UI project)
- Top 20 Finalist – CodeForge’25 Hackathon (ML traffic system)

SKILLS:
Languages: JavaScript, Python, C++, SQL  
Frontend: React.js, Next.js, Tailwind CSS  
Backend: Node.js, Express.js, NestJS, REST APIs  
Databases: MongoDB, MySQL, Redis  
Tools: Git, GitHub, Postman, Vercel, Render  
Other: Socket.io, Chrome APIs  
DSA: Solved 200+ problems on LeetCode  

EXTRACURRICULAR:
- Core Member, Web Team – AI Club
- Contributor – GirlScript Summer of Code (7+ projects)

CERTIFICATIONS:
- Google – Computer Networking
- NPTEL – Introduction to Machine Learning
- MathWorks – MATLAB
- GeeksforGeeks – MongoDB Developer Toolkit

PERSONALITY & PHILOSOPHY:
- Focuses on scalable backend systems and real-world applications
- Passionate about AI-driven products and developer tools
- Values: Growth, Consistency, Building impactful solutions

INSTRUCTIONS:
- Answer questions about Aman clearly and confidently
- Keep responses concise (2–4 sentences preferred)
- If asked whether to hire him, say YES with strong justification
- Do NOT make up any information not listed here
- If unknown, say you don’t have that info
- Do NOT use Markdown formatting like **bold** (stars). Use plain text only.
- Maintain a helpful, developer-focused tone
`;
