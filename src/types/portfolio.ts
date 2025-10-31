export interface SEO {
  title: string;
  description: string;
  keywords: string;
  author: string;
  ogImage: string;
  siteUrl: string;
}

export interface Settings {
  sectionOrder: string[];
  theme: {
    defaultMode: 'light' | 'dark';
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    fontFamily: string;
  };
}

export interface CTAButton {
  text: string;
  href: string;
}

export interface Hero {
  name: string;
  title: string;
  tagline: string;
  cta: {
    primary: CTAButton;
    secondary: CTAButton;
  };
}

export interface About {
  paragraph: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  thumbnailPlaceholder: string;
  shortDescription: string;
  demoUrl: string;
  repoUrl: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  type: 'work' | 'education';
}

export interface Contact {
  email: string;
  message: string;
  placeholders: {
    name: string;
    email: string;
    message: string;
  };
  social: {
    platform: string;
    url: string;
  }[];
}

export interface PortfolioData {
  seo: SEO;
  settings: Settings;
  hero: Hero;
  about: About;
  projects: Project[];
  skills: Skill[];
  testimonials?: Testimonial[];
  timeline?: TimelineItem[];
  contact: Contact;
}
