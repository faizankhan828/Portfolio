import './App.css'
import { useState, useEffect } from 'react'
import SEO from './components/SEO'
import LoadingScreen from './components/LoadingScreen'
import AnimatedBackground from './components/AnimatedBackground'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
// import Testimonials from './components/Testimonials'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import portfolioData from './data/portfolio.json'
import type { PortfolioData } from './types/portfolio'
import type { ReactNode } from 'react'

const data = portfolioData as PortfolioData;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Map section names to components
  const sectionComponents: Record<string, ReactNode> = {
    hero: <Hero data={data.hero} />,
    about: <About data={data.about} />,
    projects: <Projects data={data.projects} />,
    skills: <Skills data={data.skills} />,
    // testimonials: data.testimonials ? <Testimonials data={data.testimonials} /> : null,
    timeline: data.timeline ? <Timeline data={data.timeline} /> : null,
    contact: <Contact data={data.contact} />,
  };

  // Render sections in the order specified in settings
  const orderedSections = data.settings.sectionOrder
    .map(sectionName => sectionComponents[sectionName])
    .filter(Boolean); // Remove null sections

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950">
      <SEO data={data.seo} />
      <AnimatedBackground />
      <div className="relative z-10">
        <Navigation />
        <main id="main-content">
          {orderedSections}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
