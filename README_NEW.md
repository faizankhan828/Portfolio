# Personal Portfolio Website

A modern, JSON-driven personal portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, dark mode, accessibility-first design, and full responsive layout.

## ✨ Features

### Core Features
- **🎨 JSON-Driven Content**: All content managed through a single `portfolio.json` file
- **🌓 Dark Mode**: Fully functional dark/light theme with system preference detection
- **♿ WCAG 2.1 AA Compliant**: Accessible to all users with screen reader support
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop
- **⚡ High Performance**: Lazy loading images, optimized animations, and reduced motion support
- **🔍 SEO Optimized**: Dynamic meta tags, Open Graph, and Twitter Card support

### Sections
- **Hero**: Animated introduction with parallax effects and CTA buttons
- **About**: Personal introduction and background
- **Projects**: Filterable project showcase with 3D card effects and detail modals
- **Skills**: Visual skill representation with progress indicators
- **Testimonials** (Optional): Client reviews with ratings
- **Timeline** (Optional): Work experience and education history
- **Contact**: Validated contact form with submission handling

### Technical Highlights
- **Framer Motion**: Smooth, performant animations
- **TypeScript**: Full type safety across the application
- **Tailwind CSS**: Utility-first styling with custom theme
- **Custom Hooks**: `useReducedMotion`, `useLazyLoad`, `useTheme`
- **Context API**: Global theme state management
- **Form Validation**: Client-side validation with user-friendly error messages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure your content**
Edit `src/data/portfolio.json` with your information (see [Configuration Guide](#-configuration-guide))

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:5173`

## 📝 Configuration Guide

### Portfolio Data (`src/data/portfolio.json`)

The entire website content is controlled through a single JSON file. Here's the structure:

#### SEO Configuration
```json
{
  "seo": {
    "title": "Your Name - Full Stack Developer",
    "description": "Personal portfolio showcasing projects and skills",
    "keywords": "web developer, react, typescript, portfolio",
    "author": "Your Name",
    "ogImage": "https://your-domain.com/og-image.jpg",
    "siteUrl": "https://your-domain.com"
  }
}
```

#### Settings
```json
{
  "settings": {
    "sectionOrder": ["hero", "about", "projects", "skills", "testimonials", "timeline", "contact"],
    "theme": {
      "defaultMode": "dark",
      "colors": {
        "primary": "#6366f1",
        "secondary": "#8b5cf6",
        "accent": "#ec4899"
      },
      "fontFamily": "Inter, sans-serif"
    }
  }
}
```

**Section Order**: Change the order of sections by rearranging the array. Remove sections to hide them.

#### Hero Section
```json
{
  "hero": {
    "name": "Your Name",
    "title": "Full Stack Developer",
    "tagline": "Building exceptional digital experiences",
    "cta": {
      "primary": { "text": "View My Work", "href": "#projects" },
      "secondary": { "text": "Get in Touch", "href": "#contact" }
    }
  }
}
```

#### Projects
```json
{
  "projects": [
    {
      "id": "project-1",
      "title": "Project Name",
      "summary": "Short description",
      "tags": ["React", "TypeScript", "Node.js"],
      "thumbnailPlaceholder": "https://via.placeholder.com/600x400",
      "shortDescription": "Detailed description of the project",
      "demoUrl": "https://demo.example.com",
      "repoUrl": "https://github.com/username/repo",
      "featured": true
    }
  ]
}
```

#### Skills
```json
{
  "skills": [
    { "name": "React", "level": 90 },
    { "name": "TypeScript", "level": 85 }
  ]
}
```

Level is a percentage (0-100) representing proficiency.

#### Contact
```json
{
  "contact": {
    "email": "your.email@example.com",
    "message": "Let's work together",
    "placeholders": {
      "name": "Your Name",
      "email": "your.email@example.com",
      "message": "Tell me about your project..."
    },
    "social": [
      { "platform": "LinkedIn", "url": "https://linkedin.com/in/username" },
      { "platform": "GitHub", "url": "https://github.com/username" },
      { "platform": "Twitter", "url": "https://twitter.com/username" }
    ]
  }
}
```

### Optional Sections

To add **Testimonials** or **Timeline**:

1. Add the section name to `settings.sectionOrder`
2. Add the data to portfolio.json:

```json
{
  "testimonials": [
    {
      "id": "testimonial-1",
      "name": "Client Name",
      "role": "CEO at Company",
      "avatar": "https://via.placeholder.com/150",
      "content": "Testimonial text",
      "rating": 5
    }
  ],
  "timeline": [
    {
      "id": "timeline-1",
      "year": "2020 - Present",
      "title": "Senior Developer",
      "company": "Tech Company",
      "description": "Description of role",
      "type": "work"
    }
  ]
}
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## 📦 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI** (optional)
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

**Configuration**: The `vercel.json` file is already included with optimal settings.

### Netlify

1. **Install Netlify CLI** (optional)
```bash
npm i -g netlify-cli
```

2. **Deploy**
```bash
netlify deploy --prod
```

Or connect your GitHub repository to Netlify for automatic deployments.

**Configuration**: The `netlify.toml` file is already included with optimal settings.

### Manual Deployment

1. **Build the project**
```bash
npm run build
```

2. **Upload the `dist` folder** to your hosting provider

## 🔧 Contact Form Integration

The contact form currently uses a simulated API call. To connect it to a real backend:

### Option 1: Formspree

1. Sign up at [Formspree](https://formspree.io)
2. Create a new form and get your form ID
3. Update `src/components/Contact.tsx`:

```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formState)
});
if (!response.ok) throw new Error('Failed to send message');
```

### Option 2: EmailJS

1. Sign up at [EmailJS](https://www.emailjs.com)
2. Install EmailJS: `npm install @emailjs/browser`
3. Follow EmailJS React documentation

### Option 3: Custom Backend

Replace the simulated API call in `handleSubmit` with your own backend endpoint.

## 🎨 Customization

### Colors
Edit Tailwind config or update JSON theme colors. Main colors are:
- Primary: `indigo-600` (#6366f1)
- Secondary: `purple-600` (#8b5cf6)
- Accent: `pink-600` (#ec4899)

### Fonts
The project uses Inter font family. To change:
1. Import your font in `src/index.css`
2. Update `fontFamily` in portfolio.json settings

### Animations
Animations are powered by Framer Motion. To modify:
- Edit motion variants in component files
- Adjust animation duration, delay, and easing

### Accessibility
The site respects `prefers-reduced-motion`. Test with:
- System settings → Accessibility → Reduce motion
- Browser DevTools → Rendering → Emulate CSS media feature

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🧪 Testing Checklist

Before deployment, verify:
- [ ] All personal information updated in `portfolio.json`
- [ ] Social media links are correct
- [ ] Project images are uploaded and URLs updated
- [ ] Contact form connects to email service
- [ ] SEO meta tags are customized
- [ ] Dark mode works correctly
- [ ] All sections display properly on mobile
- [ ] No console errors in browser
- [ ] Lighthouse score > 90 for all categories

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Your Name**
- Website: [your-domain.com](https://your-domain.com)
- GitHub: [@username](https://github.com/username)
- LinkedIn: [@username](https://linkedin.com/in/username)

## 🙏 Acknowledgments

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [TypeScript](https://www.typescriptlang.org)

---

Made with ❤️ and React
