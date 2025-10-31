import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import portfolioData from './data/portfolio.json'
import type { PortfolioData } from './types/portfolio'

const data = portfolioData as PortfolioData;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={data.settings.theme.defaultMode}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
