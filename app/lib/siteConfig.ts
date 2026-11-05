export interface Skill {
  name: string;
  level: number;
  icon: string;
  description: string;
  category?: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
  year: string;
  status: string;
  featured?: boolean;
}

export interface Specialty {
  title: string;
  description: string;
  icon?: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  image: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  milestone: boolean;
}

export interface SiteConfig {
  personal: {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    phone: string;
    email: string;
    location: string;
    mapsQuery: string;
    profileImage: string;
  };
  social: {
    github: string;
    linkedin: string;
    whatsapp: string;
    instagram: string;
    facebook: string;
    twitter: string;
  };
  resume: {
    path: string;
  };
  skills: Skill[];
  projects: Project[];
  specialties: Specialty[];
  certificates: Certificate[];
  timeline: TimelineEvent[];
  meta: {
    title: string;
    description: string;
    twitterHandle: string;
    themeColor: string;
  };
}

export const siteConfig: SiteConfig = {
  personal: {
    name: "Swarnendu koley",
    title: "Creative Developer & 3D Designer",
    tagline: "Crafting digital experiences at the intersection of art and technology",
    bio: "I am a creative developer specializing in immersive web experiences, interactive 3D environments, and performant frontend architecture. With a background in both design and engineering, I bridge the gap between visual storytelling and technical excellence.",
    phone: "+91 7319361593",
    email: "koleyswarnendu9@gmail.com",
    location: "Kolkata, WestBengal",
    mapsQuery: "Kolkata, westBengal",
    profileImage: "/images/profile.webp",
  },
  social: {
    github: "https://github.com/Koley-code",
    linkedin: "https://www.linkedin.com/in/swarnendu-koley-536841328",
    whatsapp: "https://wa.me/+917319361593",
    instagram: "https://www.instagram.com/koleyswarnendu9?stkn=MTRrYmNiMHZ1NHBtaA==",
    facebook: "https://www.facebook.com/share/19TTyCCX5Y/",
    twitter: "https://x.com/koleyswar14581",
  },
  resume: {
    path: "/resume.pdf",
  },
  skills: [
    { name: "HTML", level: 92, icon: "🌐", description: "Semantic markup, forms, accessibility, responsive structure", category: "Frontend" },
    { name: "C", level: 85, icon: "🇨", description: "Pointers, arrays, functions, structures, memory management", category: "Language" },
    { name: "Python", level: 88, icon: "🐍", description: "Core programming, OOP, scripting, data structures", category: "Language" },
    { name: "CSS", level: 90, icon: "🎨", description: "Responsive design, Flexbox, Grid, animations and styling", category: "Frontend" },
    { name: "JavaScript", level: 90, icon: "🟨", description: "DOM manipulation, ES6+, events, asynchronous programming", category: "Language" },
    { name: "Java", level: 82, icon: "☕", description: "OOP, collections, exception handling, core programming", category: "Language" },
    { name: "React", level: 95, icon: "⚛️", description: "Component architecture, hooks, state management", category: "Frontend" },
    { name: "Next.js", level: 92, icon: "▲", description: "App Router, SSR, API routes, edge functions", category: "Framework" },
    { name: "TypeScript", level: 80, icon: "📘", description: "Type safety, generics, advanced patterns", category: "Language" },
    // { name: "Three.js", level: 88, icon: "🧊", description: "WebGL, shaders, 3D scenes, R3F", category: "3D" },
    { name: "Tailwind CSS", level: 93, icon: "🌊", description: "Utility-first styling, custom design systems", category: "Styling" },
    // { name: "GSAP", level: 85, icon: "🎬", description: "ScrollTrigger, timelines, complex animations", category: "Animation" },
    { name: "Node.js", level: 82, icon: "🟢", description: "APIs, serverless, backend integration", category: "Backend" },
    // { name: "Figma", level: 78, icon: "🎨", description: "Design systems, prototyping, collaboration", category: "Design" },
    // { name: "GraphQL", level: 80, icon: "◈", description: "Schema design, Apollo, query optimization", category: "Data" },
    // { name: "PostgreSQL", level: 75, icon: "🐘", description: "Schema design, queries, optimization", category: "Database" },

  ],
  projects: [
    {
      title: "Swarnendu Koley Portfolio",
      description: "A modern responsive developer portfolio showcasing my projects, skills, certifications, journey, and web development experience.",
      image: "/projects/one.webp",
      technologies: ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
      github: "https://github.com/Koley-code",
      live: "https://my-portfolio-amber-five-47.vercel.app",
      year: "2026",
      status: "Live",
      featured: true,
    },
    {
      title: "Chess Game",
      description: "A desktop chess game featuring a classic chessboard interface, legal move handling, turn-based gameplay, and an interactive experience for two players.",
      image: "/projects/two.webp",
      technologies: ["C++", "OOP", "Game Logic"],
      github: "https://github.com/Koley-code",
      live: "https://github.com/Koley-code",
      year: "2026",
      status: "Completed",
      featured: true,
    },
    {
      title: "Dynamic Theme Portfolio",
      description: "An immersive personal portfolio featuring dynamic theme switching, interactive animations, responsive layouts, and a visually engaging experience designed to showcase projects, skills, and creativity.",
      image: "/projects/three.webp",
      technologies: ["React", "TypeScript", "CSS", "Framer Motion"],
      github: "https://github.com/Koley-code",
      live: "https://github.com/Koley-code",
      year: "2026",
      status: "Live",
      featured: true,
    },
    {
      title: "demo card 1",
      description: "demo",
      image: "/projects/four.webp",
      technologies: ["React", "TypeScript", "Storybook", "Tailwind"],
      github: "https://github.com/Koley-code",
      live: "#",
      year: "demo",
      status: "demo",
      featured: false,
    },

    {
      title: "demo card 2",
      description: "demo card",
      image: "/projects/five.webp",
      technologies: ["TypeScript", "Vite", "Vitest"],
      github: "https://github.com/Koley-code",
      live: "#",
      year: "2024",
      status: "demo",
      featured: false,
    },
    {
      title: "demo card 3",
      description: "demo",
      image: "/projects/six.webp",
      technologies: ["React Native", "Expo", "Reanimated"],
      github: "https://github.com/Koley-code",
      live: "#",
      year: "2000",
      status: "demo",
      featured: false,
    },
  ],
  specialties: [
    { title: "Creative Problem Solving", description: "Turning complex challenges into elegant, scalable solutions through first-principles thinking." },
    { title: "Clean Code", description: "Maintainable, well-documented codebases that scale with teams and evolve with requirements." },
    { title: "Responsive Design", description: "Pixel-perfect experiences across all devices, from watches to ultrawide displays." },
    { title: "Performance", description: "Obsessive optimization for Core Web Vitals, bundle sizes, and runtime efficiency." },
    { title: "3D Experiences", description: "Immersive WebGL environments that tell stories and engage users emotionally." },
    { title: "Fast Learning", description: "Rapidly adapting to new technologies, paradigms, and domains with deep comprehension." },
    { title: "Attention to Detail", description: "Polished, refined final products where every pixel and interaction is intentional." },
    { title: "User-Centered Thinking", description: "Designing with empathy, research, and iterative validation to solve real problems." },
  ],
  certificates: [
    { title: "IGNITE 3.4 - Certificate of Completion", issuer: "Wadhwani Foundation", year: "2025", image: "/certificates/one.webp" },
    { title: "Texplorer - Certificate of Participation", issuer: "Sourcify", year: "2024", image: "/certificates/two.webp" },
    { title: "Introduction to Git & GitHub - Certificate of Achievement", issuer: "Code of Phoenix", year: "2024", image: "/certificates/three.webp" },
    // { title: "Full Stack Open", issuer: "University of Helsinki", year: "2024", image: "/certificates/four.jpg" },
    // { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2023", image: "/certificates/five.jpg" },
  ],
  timeline: [
    { year: "2027", title: "Senior Creative Developer", description: "Leading frontend innovation and 3D experiences at a Series B tech startup", milestone: true },
    { year: "2026", title: "Creative Developer", description: "Building award-winning web experiences for global brands and agencies", milestone: true },
    { year: "2025", title: "Frontend Engineer", description: "Specialized in React ecosystems and design systems at a product company", milestone: true },
    { year: "2024", title: "UI/UX Designer", description: "Bridging design and development while learning to code professionally", milestone: true },
    { year: "2023", title: "Started Journey", description: "Began self-taught development path with HTML, CSS, and JavaScript", milestone: true },
  ],
  meta: {
    title: "Swarnnedu Koley — Creative Developer & 3D Designer",
    description: "Portfolio of Swarnendu Koley, a creative developer specializing in immersive web experiences, interactive 3D environments, and performant frontend architecture.",
    twitterHandle: "@koleyswar14581",
    themeColor: "#f8fafc",
  },
};

export const navItems = [
  { label: "HOME", href: "#home", id: "home" },
  { label: "STORY", href: "#story", id: "story" },
  { label: "SKILLS", href: "#skills", id: "skills" },
  { label: "WORKS", href: "#works", id: "works" },
  { label: "PROMISE", href: "#promise", id: "promise" },
  { label: "CERTS", href: "#certificates", id: "certificates" },
  { label: "CONNECT", href: "#connect", id: "connect" },
];

export const commandPaletteItems = [
  { label: "Home", href: "#home", shortcut: "H" },
  { label: "Story", href: "#story", shortcut: "S" },
  { label: "Skills", href: "#skills", shortcut: "K" },
  { label: "Works", href: "#works", shortcut: "W" },
  { label: "Promise", href: "#promise", shortcut: "P" },
  { label: "Certificates", href: "#certificates", shortcut: "C" },
  { label: "Connect", href: "#connect", shortcut: "O" },
  { label: "GitHub", href: siteConfig.social.github, shortcut: "G", external: true },
  { label: "LinkedIn", href: siteConfig.social.linkedin, shortcut: "L", external: true },
  { label: "Resume", href: siteConfig.resume.path, shortcut: "R", external: true },
];
