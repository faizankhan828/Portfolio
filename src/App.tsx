import './App.css'
import { useState, useEffect, lazy, Suspense } from 'react'
import SEO from './components/SEO'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Footer from './components/Footer'
import portfolioData from './data/portfolio.json'
import type { PortfolioData } from './types/portfolio'

// Lazy load heavy components for better performance
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const Timeline = lazy(() => import('./components/Timeline'))
const Contact = lazy(() => import('./components/Contact'))

const data = portfolioData as PortfolioData;

// Simple section loader
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Premium loading experience with smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Premium 2.5 second loading for professional feel

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950">
      <SEO data={data.seo} />
      <div className="relative z-10">
        <Navigation />
        <main id="main-content">
          {/* Hero loads immediately - critical content */}
          <Hero data={data.hero} />
          
          {/* Lazy load other sections as user scrolls */}
          <Suspense fallback={<SectionLoader />}>
            <About data={data.about} />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Projects data={data.projects} />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Skills data={data.skills} />
          </Suspense>
          
          {data.timeline && (
            <Suspense fallback={<SectionLoader />}>
              <Timeline data={data.timeline} />
            </Suspense>
          )}
          
          <Suspense fallback={<SectionLoader />}>
            <Contact data={data.contact} />
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
