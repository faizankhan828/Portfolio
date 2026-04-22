import './App.css'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SEO from './components/SEO'
import LoadingScreen from './components/LoadingScreen'
import portfolioData from './data/portfolio.json'
import type { PortfolioData } from './types/portfolio'
import { useReducedMotion } from './hooks/useReducedMotion'

const data = portfolioData as PortfolioData

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const typingStack = ['MERN', 'Django', 'Flutter', 'Machine Learning', 'NLP', 'AI']

const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: '◼',
    skills: ['React.js', 'Tailwind CSS', 'TypeScript', 'HTML/CSS', 'Flutter'],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '◉',
    skills: ['Node.js', 'Express.js', 'Django', 'Python', 'REST APIs'],
  },
  {
    id: 'ai',
    title: 'AI / ML',
    icon: '⟡',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Transformers', 'OpenAI API'],
  },
  {
    id: 'database',
    title: 'Database',
    icon: '⌁',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL'],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: '⌘',
    skills: ['Git', 'Docker', 'Postman', 'VS Code', 'Linux'],
  },
]

type FeaturedProject = {
  title: string
  category: string
  description: string
  stack: string[]
  accent: string
  demoUrl: string
  githubUrl: string
  highlights?: string[]
}

const featuredProjects: FeaturedProject[] = [
  {
    title: 'License Plate Detection (ALPR)',
    category: 'ML / Computer Vision',
    description:
      'Automatic License Plate Recognition pipeline built with YOLOv8 and OCR for detection-to-text extraction, with structured logging and report outputs for monitoring and analytics.',
    stack: ['Python', 'YOLOv8', 'OpenCV', 'OCR', 'Pandas', 'Jupyter'],
    accent: 'from-[#4F8EF7] via-[#00d4ff] to-[#7B5CF5]',
    demoUrl: 'https://github.com/faizankhan828/ALPR-License-Plate-Recognition',
    githubUrl: 'https://github.com/faizankhan828/ALPR-License-Plate-Recognition',
    highlights: [
      'Computer vision workflow for plate localization with YOLOv8 and text extraction via OCR.',
      'End-to-end outputs include processed video, detection logs, and summary CSV reports.',
      'Data-oriented implementation with tracking artifacts such as detections and vehicle database records.',
    ],
  },
  {
    title: 'Travello AI Travel Platform',
    category: 'Full-Stack Web App',
    description:
      'Production-grade travel platform with user dashboard, admin and super-admin analytics, AI chatbot, AI itinerary generation, real-time hotel scraping, and recommendation pipelines.',
    stack: ['React 18', 'Django DRF', 'PostgreSQL', 'Redis', 'Puppeteer', 'Gemini', 'Stripe', 'LightGBM'],
    accent: 'from-[#00d4ff] via-[#4F8EF7] to-[#7B5CF5]',
    demoUrl: 'https://travello-beryl.vercel.app/',
    githubUrl: 'https://github.com/faizankhan828/Travello',
    highlights: [
      'Google OAuth + JWT + Email OTP flow with Gmail SMTP and secure account activation.',
      'AI chatbot, Hugging Face based recommendation flow, sightseeing intelligence, and itinerary generation.',
      'Real-time Booking.com scraper using Puppeteer with caching, LightGBM-assisted ranking, and Stripe checkout with verified webhooks.',
    ],
  },
  {
    title: 'Softronix E-commerce Platform',
    category: 'Full-Stack Commerce App',
    description:
      'TypeScript-first e-commerce platform organized with dedicated frontend and backend layers, focused on reliable checkout flows, product operations, and production-style admin workflows.',
    stack: ['TypeScript', 'JavaScript', 'Frontend + Backend', 'Admin Panel', 'E-commerce'],
    accent: 'from-[#7B5CF5] via-[#4F8EF7] to-[#00d4ff]',
    demoUrl: 'https://github.com/faizankhan828/Softronix_E-commerce',
    githubUrl: 'https://github.com/faizankhan828/Softronix_E-commerce',
    highlights: [
      'Monorepo-style structure with separate frontend and backend application layers.',
      'Commerce-focused iteration around wishlist, cart, and checkout UX flows.',
      'Operational maturity through admin panel workstreams and security hardening updates.',
    ],
  },
  {
    title: 'WebVulnScanner (IS Project)',
    category: 'Cybersecurity / AppSec Tooling',
    description:
      'Python-based web vulnerability scanner designed for Information Security workflows, combining page crawling, attack-surface checks, and structured risk reporting for faster remediation cycles.',
    stack: ['Python 3.12', 'BeautifulSoup', 'Requests', 'OWASP Top 10', 'JSON/HTML Reporting'],
    accent: 'from-blue-400 via-cyan-500 to-teal-400',
    demoUrl: 'https://github.com/faizankhan828/IS-project',
    githubUrl: 'https://github.com/faizankhan828/IS-project',
    highlights: [
      'Automated checks for SQL injection, XSS, insecure login forms, CSRF gaps, open redirects, and missing security headers.',
      'End-to-end pipeline with crawler, testing engine, and modular vulnerability detectors mapped to common OWASP risk areas.',
      'Produces actionable JSON and HTML reports with risk-level classification (high, medium, low, info) for security review.',
    ],
  },
  {
    title: 'Social Media Clone',
    category: 'MERN / Django Hybrid',
    description:
      'Feature-rich social experience covering profiles, follow graphs, content feeds, and real-time interactions with a mobile-first interface.',
    stack: ['React', 'Django', 'Auth', 'Responsive UI'],
    accent: 'from-violet-500 via-fuchsia-500 to-blue-500',
    demoUrl: '#contact',
    githubUrl: 'https://github.com/faizankhan828/Django-Deployment-',
  },
  {
    title: 'Portfolio Engineering System',
    category: 'Frontend Platform',
    description:
      'A high-performance React portfolio platform with motion-first presentation, modular sections, and a recruiter-focused content hierarchy.',
    stack: ['React', 'TypeScript', 'Framer Motion', 'Tailwind'],
    accent: 'from-cyan-500 via-sky-500 to-indigo-500',
    demoUrl: '#hero',
    githubUrl: 'https://github.com/faizankhan',
  },
]

const moreProjects = [
  {
    title: 'Flutter Productivity App',
    description: 'Cross-platform mobile concept for task management and lightweight workflow orchestration.',
    stack: ['Flutter', 'Firebase', 'Mobile UX'],
  },
  {
    title: 'NLP Chatbot Engine',
    description: 'Conversation system designed for intent routing, summarization, and structured knowledge responses.',
    stack: ['Python', 'spaCy', 'Transformers'],
  },
  {
    title: 'API Design Toolkit',
    description: 'Reusable backend blueprint for authentication, validation, and scalable endpoint structure.',
    stack: ['Node.js', 'Express', 'REST'],
  },
  {
    title: 'Data Insight Dashboard',
    description: 'Visual analysis dashboard concept for operational metrics and admin oversight.',
    stack: ['React', 'Charts', 'SQL'],
  },
]

const timeline = [
  {
    year: '2022 - 2026',
    title: 'Computer Science Student',
    company: 'NUML, Pakistan',
    bullets: [
      'Building a strong software foundation across algorithms, systems, and practical engineering.',
      'Focusing on applied AI, backend design, and modern web architecture.',
      'Turning academic work into production-minded portfolio projects.',
    ],
  },
  {
    year: '2024',
    title: 'Full-Stack Development Certification',
    company: 'Udemy',
    bullets: [
      'Completed structured training across Python, Django, React, and REST API workflows.',
      'Applied the curriculum through full-stack projects and deployment practice.',
    ],
  },
  {
    year: '2024',
    title: 'AI / ML Practice',
    company: 'Independent Projects',
    bullets: [
      'Built recommendation and NLP concepts using traditional ML and transformer-based patterns.',
      'Focused on practical model deployment, usability, and system integration.',
    ],
  },
  {
    year: 'Now',
    title: 'Freelance-Ready Engineer',
    company: 'Remote / Pakistan',
    bullets: [
      'Positioned to architect, build, and ship full-stack and AI-powered systems for clients and teams.',
      'Available for product builds, MVPs, backend APIs, and intelligent automation work.',
    ],
  },
]

const services = [
  {
    title: 'Full-Stack Web Development',
    description: 'MERN and Django systems built for secure, maintainable, production-grade delivery.',
    icon: '⇄',
  },
  {
    title: 'AI & Machine Learning Solutions',
    description: 'Applied ML workflows, model integration, and decision-support systems that create measurable value.',
    icon: '◌',
  },
  {
    title: 'NLP Systems & Chatbots',
    description: 'Conversational interfaces, text classification pipelines, and transformer-assisted automation.',
    icon: '✦',
  },
  {
    title: 'Mobile App Development',
    description: 'Flutter apps with smooth interactions, clean states, and cross-platform consistency.',
    icon: '▣',
  },
  {
    title: 'API Design & Integration',
    description: 'RESTful endpoints, authentication flows, and integration layers that connect products cleanly.',
    icon: '◬',
  },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/faizan-khan-a40566263/', icon: 'in' },
  { label: 'GitHub', href: 'https://github.com/faizankhan828', icon: 'gh' },
  { label: 'Email', href: 'mailto:faizankhan15658@gmail.com', icon: '@' },
]

function Icon({ type }: { type: string }) {
  const common = 'h-4 w-4 shrink-0'

  if (type === 'gh') {
    return <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.72.5 12.17c0 5.15 3.29 9.52 7.86 11.08.58.11.79-.26.79-.58v-2.06c-3.2.71-3.88-1.38-3.88-1.38-.53-1.38-1.3-1.74-1.3-1.74-1.06-.76.08-.75.08-.75 1.17.08 1.79 1.23 1.79 1.23 1.04 1.83 2.73 1.3 3.4.99.11-.76.41-1.3.75-1.6-2.55-.3-5.23-1.3-5.23-5.79 0-1.28.44-2.32 1.17-3.14-.12-.29-.51-1.46.11-3.04 0 0 .95-.31 3.12 1.2.9-.26 1.87-.39 2.83-.4.96.01 1.93.14 2.83.4 2.17-1.51 3.12-1.2 3.12-1.2.62 1.58.23 2.75.11 3.04.73.82 1.17 1.86 1.17 3.14 0 4.5-2.69 5.49-5.25 5.78.42.37.8 1.11.8 2.24v3.32c0 .32.21.7.8.58 4.57-1.56 7.86-5.93 7.86-11.08C23.5 5.72 18.35.5 12 .5Z"/></svg>
  }

  if (type === 'in') {
    return <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6A2.5 2.5 0 1 1 4.98 3.5ZM.75 8.25h3.48v15H.75v-15Zm6.1 0h3.33v2.05h.05c.46-.87 1.58-2.05 3.25-2.05 3.47 0 4.1 2.28 4.1 5.25v9.75h-3.48v-8.65c0-2.06-.04-4.72-2.87-4.72-2.87 0-3.31 2.24-3.31 4.56v8.81H6.85v-15Z"/></svg>
  }

  if (type === '@') {
    return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true"><path d="M17 15.5a4.5 4.5 0 1 1-9 0V9a4.5 4.5 0 1 1 9 0v6.5Zm0-6.5v4.5a2.5 2.5 0 1 1-5 0V9"/><circle cx="12" cy="12" r="9"/></svg>
  }

  return null
}

function SectionLabel({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200 shadow-[0_0_25px_rgba(0,212,255,0.12)] backdrop-blur-xl">
        <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(0,212,255,0.8)]" />
        {eyebrow}
      </div>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
        {description}
      </p>
      <div className="section-divider mx-auto mt-6 w-40" />
    </motion.div>
  )
}

function useTypewriter(words: string[]) {
  const shouldReduceMotion = useReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)
  const [display, setDisplay] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplay(words[0] ?? '')
      return undefined
    }

    const currentWord = words[wordIndex % words.length] ?? ''
    const timeout = window.setTimeout(() => {
      if (!deleting) {
        if (display.length < currentWord.length) {
          setDisplay(currentWord.slice(0, display.length + 1))
        } else {
          setDeleting(true)
        }
      } else if (display.length > 0) {
        setDisplay(currentWord.slice(0, display.length - 1))
      } else {
        setDeleting(false)
        setWordIndex((value) => (value + 1) % words.length)
      }
    }, deleting ? 45 : 80)

    return () => window.clearTimeout(timeout)
  }, [deleting, display, shouldReduceMotion, wordIndex, words])

  return display
}

function Navbar() {
  const shouldReduceMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map(({ href }) => document.getElementById(href.replace('#', '')))
      .filter((section): section is HTMLElement => section !== null)

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 140
      let currentSection = sections[0]?.id ?? 'hero'

      for (const section of sections) {
        if (section.offsetTop <= scrollPosition) {
          currentSection = section.id
        } else {
          break
        }
      }

      setActiveSection(currentSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/0 transition-all duration-300 ${
        scrolled ? 'border-white/10 bg-[#0a0a0f]/80 shadow-[0_8px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#hero"
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-bold text-white shadow-[0_0_30px_rgba(79,142,247,0.22)] backdrop-blur-xl"
          aria-label="Go to top"
        >
          <span className="gradient-text text-base tracking-tight">FK</span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-2 shadow-[0_0_25px_rgba(0,212,255,0.08)] backdrop-blur-xl lg:flex">
          {navItems.map((item) => {
            const active = activeSection === item.href.replace('#', '')
            return (
              <a
                key={item.label}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  active ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(0,212,255,0.16)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((value) => !value)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(0,212,255,0.08)] backdrop-blur-xl transition-all duration-300 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
          <span aria-hidden="true">{mobileMenuOpen ? '×' : '☰'}</span>
        </button>

        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-[#4F8EF7] to-[#7B5CF5] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(79,142,247,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(123,92,245,0.35)] sm:inline-flex"
        >
          Hire Me
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
            className="mx-4 mb-4 grid gap-2 rounded-3xl border border-white/10 bg-[#0f1017]/95 p-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:mx-6 lg:hidden"
          >
            {navItems.map((item) => {
              const active = activeSection === item.href.replace('#', '')

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    active ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/6 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#4F8EF7] to-[#7B5CF5] px-4 py-3 text-sm font-semibold text-white"
            >
              Hire Me
              <span aria-hidden="true">↗</span>
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const typingText = useTypewriter(typingStack)

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hero-mesh opacity-100" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,142,247,0.15),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(0,212,255,0.12),transparent_22%),radial-gradient(circle_at_50%_70%,rgba(123,92,245,0.14),transparent_30%)]" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1400px] items-center gap-16 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.06fr_0.94fr] lg:px-8 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200 backdrop-blur-xl">
            Full-Stack & AI Engineer
          </div>

          <h1 className="mt-6 text-5xl font-semibold leading-[0.94] tracking-[-0.05em] text-white sm:text-6xl lg:text-[4.4rem] xl:text-[4.9rem]">
            Building intelligent,
            <span className="gradient-text block">scalable software.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Faizan Khan bridges modern web engineering with applied AI to architect production-grade systems, ship reliable products, and deploy software that feels deliberate at every layer.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#4F8EF7] to-[#7B5CF5] px-6 py-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(79,142,247,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(123,92,245,0.38)]"
            >
              View My Work
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="mt-8 inline-flex min-h-12 flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 backdrop-blur-xl sm:flex-nowrap">
            <span className="text-cyan-300">Typing stack:</span>
            <span className="min-w-[8rem] font-medium text-white sm:min-w-[12rem]">{typingText || ' '}</span>
            <span className="h-5 w-px animate-pulse bg-cyan-300/80" />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { value: '4', label: 'Featured case studies' },
              { value: '6+', label: 'Core technology domains' },
              { value: 'AI', label: 'Production-minded delivery' },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="text-2xl font-semibold text-white">{item.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute -left-4 top-8 h-24 w-24 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -right-8 top-24 h-28 w-28 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111118]/80 p-4 shadow-[0_0_60px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
            <div className="rounded-[1.5rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(79,142,247,0.24),transparent_35%),linear-gradient(180deg,rgba(17,17,24,0.92),rgba(10,10,15,0.98))] p-6 sm:p-8">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-slate-500">
                <span>AI / Web / Mobile</span>
                <span>Faizan Khan</span>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[24rem] overflow-hidden rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,212,255,0.14),transparent_32%)]" />
                  <div className="absolute left-4 top-4 h-20 w-20 rounded-full border border-cyan-300/20 bg-cyan-400/10 blur-[0.5px]" />
                  <div className="absolute bottom-10 right-8 h-24 w-24 rounded-full border border-violet-300/20 bg-violet-500/10 blur-[0.5px]" />

                  <div className="relative flex h-full flex-col items-center justify-center text-center">
                    <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(79,142,247,0.22),rgba(17,17,24,0.85)_55%)] shadow-[0_0_60px_rgba(79,142,247,0.18)]">
                      <div className="absolute inset-6 rounded-full border border-white/10" />
                      <div className="absolute inset-10 rounded-full border border-cyan-300/10" />
                      <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0f]/90 text-4xl font-semibold text-white shadow-[0_0_35px_rgba(0,212,255,0.16)]">
                        FK
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-300 backdrop-blur-xl">
                      Architecting full-stack systems with AI-aware product thinking.
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-500">
                      <span>Execution</span>
                      <span>Production-grade</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        ['System design', '84%'],
                        ['AI integration', '91%'],
                        ['Frontend polish', '88%'],
                      ].map(([label, value]) => (
                        <div key={label} className="space-y-2">
                          <div className="flex items-center justify-between text-sm text-slate-300">
                            <span>{label}</span>
                            <span className="text-cyan-200">{value}</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/8">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#4F8EF7] via-[#00d4ff] to-[#7B5CF5]"
                              style={{ width: value }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      ['15+', 'Project deliverables'],
                      ['3+', 'Technical domains'],
                      ['ML', 'Model deployment'],
                      ['API', 'Integration focus'],
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                        <div className="text-2xl font-semibold text-white">{value}</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {['MERN', 'Django', 'Flutter'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-center text-sm font-medium text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section-shell">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionLabel
          eyebrow="About"
          title="A specialist focused on systems that ship"
          description="Faizan Khan does not position work as hobby projects. The framing here is deliberate: architecting scalable interfaces, backend systems, and AI-driven features that feel ready for production from day one."
        />

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#4F8EF7]/20 via-[#00d4ff]/10 to-[#7B5CF5]/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111118]/90 p-5 shadow-[0_0_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="aspect-[4/5] rounded-[1.6rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-6">
                <div className="flex h-full flex-col justify-between rounded-[1.35rem] border border-white/8 bg-[linear-gradient(145deg,rgba(10,10,15,0.92),rgba(17,17,24,0.7))] p-6">
                  <div className="flex items-start justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                    <span>Pakistan</span>
                    <span>Available now</span>
                  </div>

                  <div className="mx-auto flex h-60 w-60 items-center justify-center rounded-full border border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(79,142,247,0.22),rgba(17,17,24,0.92)_55%)] shadow-[0_0_50px_rgba(79,142,247,0.18)]">
                    <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0f] text-5xl font-semibold text-white">
                      FK
                    </div>
                  </div>

                  <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                    {[
                      ['Location', 'Pakistan'],
                      ['Status', 'Open to freelance and full-time'],
                      ['Languages', 'English, Urdu'],
                      ['Focus', 'Web, mobile, AI'],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                        <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{label}</div>
                        <div className="mt-2 text-sm text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="rounded-[2rem] border border-white/10 bg-[#111118]/80 p-6 shadow-[0_0_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8 lg:p-10"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Profile</div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              I do not just write code. I architect systems.
            </h3>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
              Faizan Khan is a full-stack MERN developer, Python and Django engineer, Flutter developer, and machine learning / NLP specialist who builds with clarity, speed, and operational discipline. The work leans toward production-grade delivery, where interfaces, APIs, and AI features all reinforce a single product vision.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-400 sm:text-base">
              His edge is architectural: connecting frontends, backends, databases, and intelligent services into software that is scalable, explainable, and recruiter-ready.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Full-stack', 'React, Node, Django'],
                ['AI / ML', 'NLP, prediction, automation'],
                ['Mobile', 'Flutter and API-driven apps'],
              ].map(([title, value]) => (
                <div key={title} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-500">{title}</div>
                  <div className="mt-2 text-sm text-white">{value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const [activeGroup, setActiveGroup] = useState(skillGroups[0].id)
  const currentGroup = skillGroups.find((group) => group.id === activeGroup) ?? skillGroups[0]

  return (
    <section id="skills" className="section-shell">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionLabel
          eyebrow="Skills"
          title="My Technical Arsenal"
          description="The emphasis is on capability clusters rather than vanity progress bars: grouped by frontend, backend, AI, databases, and the tooling that makes delivery reliable."
        />

        <div className="rounded-[2rem] border border-white/10 bg-[#111118]/85 p-5 shadow-[0_0_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-6 lg:p-8">
          <div className="flex flex-wrap gap-3">
            {skillGroups.map((group) => {
              const active = group.id === activeGroup
              return (
                <button
                  key={group.id}
                  onClick={() => setActiveGroup(group.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    active
                      ? 'border-cyan-300/30 bg-white/10 text-white shadow-[0_0_22px_rgba(0,212,255,0.12)]'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/15 hover:text-white'
                  }`}
                >
                  <span className="text-cyan-300">{group.icon}</span>
                  {group.title}
                </button>
              )
            })}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[0.84fr_1.16fr]">
            <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(79,142,247,0.12),rgba(17,17,24,0.85))] p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Selected group</div>
              <h3 className="mt-3 text-2xl font-semibold text-white">{currentGroup.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                This category is represented as a chip-based grid so the page reads like a premium agency site rather than a beginner portfolio with progress bars.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ['Delivery', 'Production-minded'],
                  ['Focus', 'System architecture'],
                  ['UX', 'Clean and intentional'],
                  ['Motion', 'Subtle and functional'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{label}</div>
                    <div className="mt-2 text-sm text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {currentGroup.skills.map((skill) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="group rounded-[1.35rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-[#4F8EF7] to-[#7B5CF5] text-sm font-semibold text-white shadow-[0_0_18px_rgba(79,142,247,0.26)]">
                    {skill.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="text-sm font-medium text-white">{skill}</div>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/8">
                    <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-[#4F8EF7] via-[#00d4ff] to-[#7B5CF5]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const [showMore, setShowMore] = useState(false)

  return (
    <section id="projects" className="section-shell">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionLabel
          eyebrow="Featured Work"
          title="Portfolio case studies that read like product work"
          description="The first four cards are presented as featured work with richer layouts. Supporting builds are tucked into a collapsible grid so the section stays premium, not cluttered."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#111118]/85 shadow-[0_0_45px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:shadow-[0_0_60px_rgba(0,212,255,0.12)]"
            >
              <div className={`h-56 bg-gradient-to-br ${project.accent} p-6`}>
                <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_32%),linear-gradient(180deg,rgba(10,10,15,0.38),rgba(10,10,15,0.85))] p-5 text-white">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/80">
                    <span>{project.category}</span>
                    <span>Featured</span>
                  </div>
                  <div>
                    <div className="mb-3 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                      Case study visual
                    </div>
                    <div className="max-w-sm text-2xl font-semibold tracking-tight">{project.title}</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-[1.35rem] font-semibold tracking-tight text-white">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>

                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(0,212,255,0.9)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={project.githubUrl} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-cyan-300/25 hover:bg-white/8">
                    <span className="text-white"><Icon type="gh" /></span>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={() => setShowMore((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-cyan-300/25 hover:bg-white/8"
          >
            {showMore ? 'Hide more work' : 'Show more work'}
            <span aria-hidden="true">{showMore ? '−' : '+'}</span>
          </button>
        </div>

        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            >
              {moreProjects.map((project) => (
                <div key={project.title} className="rounded-[1.5rem] border border-white/10 bg-[#111118]/80 p-5 backdrop-blur-xl">
                  <div className="text-xs uppercase tracking-[0.26em] text-slate-500">Additional build</div>
                  <h4 className="mt-3 text-lg font-semibold text-white">{project.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section-shell">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <SectionLabel
          eyebrow="Experience"
          title="My Journey"
          description="A vertical timeline that reads as a development arc, not a resume dump. Each entry emphasizes growth, build quality, and systems thinking."
        />

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-cyan-400 via-blue-500 to-violet-500 sm:left-4" />
          <div className="space-y-6">
            {timeline.map((entry) => (
              <motion.article
                key={entry.title}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative rounded-[1.8rem] border border-white/10 bg-[#111118]/85 p-6 shadow-[0_0_45px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-7"
              >
                <div className="absolute -left-[2.05rem] top-8 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-300/25 bg-[#0a0a0f] shadow-[0_0_20px_rgba(0,212,255,0.25)] sm:-left-[2.35rem]">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#4F8EF7] to-[#7B5CF5]" />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">{entry.year}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Milestone</span>
                </div>
                <div className="mt-4 text-xl font-semibold text-white">{entry.title}</div>
                <div className="mt-1 text-sm text-cyan-200">{entry.company}</div>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-300">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section-shell">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionLabel
          eyebrow="Services"
          title="What I do"
          description="A freelance-ready service grid that communicates range without feeling generic. Each card ties the offer back to product outcomes and technical depth."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {services.map((service) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.42, ease: 'easeOut' }}
              className="group rounded-[1.6rem] border border-white/10 bg-[#111118]/80 p-5 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:shadow-[0_0_32px_rgba(0,212,255,0.08)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#4F8EF7] to-[#7B5CF5] text-xl text-white shadow-[0_0_20px_rgba(79,142,247,0.22)]">
                {service.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{service.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  return (
    <section id="contact" className="section-shell pb-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionLabel
          eyebrow="Contact"
          title="Let's build something extraordinary"
          description="This contact area is intentionally minimal and premium: direct contact details on one side, a compact form on the other, with no white panels or template filler."
        />

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#111118]/85 p-6 shadow-[0_0_45px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Direct</div>
            <h3 className="mt-3 text-2xl font-semibold text-white">Reach out for builds, consulting, or collaboration</h3>
            <div className="mt-6 space-y-4">
              {[
                ['Email', 'faizankhan15658@gmail.com', 'mailto:faizankhan15658@gmail.com', 'email'],
                ['LinkedIn', 'linkedin.com/in/faizan-khan-a40566263', 'https://www.linkedin.com/in/faizan-khan-a40566263/', 'in'],
                ['GitHub', 'github.com/faizankhan828', 'https://github.com/faizankhan828', 'gh'],
                ['Location', 'Pakistan', '#', ''],
              ].map(([label, value, href, icon]) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 rounded-[1.4rem] border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-cyan-300/20 hover:bg-white/8"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-[#4F8EF7] to-[#7B5CF5] text-white">
                    <Icon type={icon} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{label}</div>
                    <div className="mt-1 text-sm text-white">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-cyan-300/20 hover:bg-white/8"
                >
                  <span className="text-white"><Icon type={social.icon} /></span>
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#111118]/85 p-6 shadow-[0_0_45px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Message</div>
            <h3 className="mt-3 text-2xl font-semibold text-white">Start the conversation</h3>

            <form
              className="mt-6 grid gap-4"
              onSubmit={async (event) => {
                event.preventDefault()

                if (!formState.name || !formState.email || !formState.message) {
                  setSubmitStatus('error')
                  return
                }

                setSubmitStatus('sending')

                try {
                  const response = await fetch('https://formsubmit.co/ajax/faizankhan15658@gmail.com', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Accept: 'application/json',
                    },
                    body: JSON.stringify({
                      name: formState.name,
                      email: formState.email,
                      message: formState.message,
                      _subject: 'New Portfolio Contact Message',
                      _captcha: 'false',
                    }),
                  })

                  if (!response.ok) {
                    throw new Error('Unable to send message')
                  }

                  setSubmitStatus('success')
                  setFormState({ name: '', email: '', message: '' })
                } catch {
                  setSubmitStatus('error')
                }
              }}
            >
              {[
                { label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
                { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
              ].map((field) => (
                <label key={field.name} className="grid gap-2 text-sm text-slate-300">
                  <span>{field.label}</span>
                  <input
                    type={field.type}
                    value={formState[field.name as keyof typeof formState]}
                    onChange={(event) => setFormState((previous) => ({ ...previous, [field.name]: event.target.value }))}
                    placeholder={field.placeholder}
                    className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-300/30 focus:bg-white/8"
                  />
                </label>
              ))}

              <label className="grid gap-2 text-sm text-slate-300">
                <span>Message</span>
                <textarea
                  rows={6}
                  value={formState.message}
                  onChange={(event) => setFormState((previous) => ({ ...previous, message: event.target.value }))}
                  placeholder="Describe the product, audience, scope, or timeline."
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-300/30 focus:bg-white/8"
                />
              </label>

              <button
                type="submit"
                disabled={submitStatus === 'sending'}
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#4F8EF7] to-[#7B5CF5] px-6 text-sm font-semibold text-white shadow-[0_0_28px_rgba(79,142,247,0.24)] transition-all duration-300 hover:-translate-y-0.5"
              >
                {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                  Message sent successfully. You will receive it in your inbox.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                  Message could not be sent. Please verify your details and try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#09090d]">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-lg font-semibold text-white">Faizan Khan</div>
            <p className="mt-2 max-w-xl text-sm leading-7 text-slate-400">
              Full-Stack MERN Developer, Python and Django Engineer, Flutter Developer, Machine Learning and NLP Engineer, AI Developer.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.24em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Faizan Khan</span>
          <span>Built for recruiter-grade first impressions.</span>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1400)
    return () => window.clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a0f] text-white selection:bg-cyan-300/30 selection:text-white">
      <SEO data={data.seo} />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,142,247,0.12),transparent_0_22%),radial-gradient(circle_at_80%_10%,rgba(0,212,255,0.12),transparent_0_20%),radial-gradient(circle_at_50%_80%,rgba(123,92,245,0.1),transparent_0_24%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.85)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.85)_1px,transparent_1px)] [background-size:64px_64px]" />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
