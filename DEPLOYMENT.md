# 🚀 Deployment Guide - Faizan Khan Portfolio

This guide will help you deploy your portfolio to production.

## ✅ Pre-Deployment Checklist

Before deploying, verify:

- [x] All personal information updated in `src/data/portfolio.json`
- [x] Contact email is correct: faizankhan15658@gmail.com
- [x] Social media links are working
- [x] No compilation errors (`npm run build` succeeds)
- [x] Portfolio is fully responsive on all devices
- [x] Dark mode works correctly
- [x] All images load properly

## 🌐 Option 1: Deploy to Vercel (Recommended)

### Why Vercel?
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificate
- ✅ Fast global CDN
- ✅ Zero configuration needed

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   
   That's it! Vercel automatically detects Vite and configures everything.

3. **Custom Domain (Optional)**
   - In Vercel dashboard → Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## 🎯 Option 2: Deploy to Netlify

### Steps:

1. **Push to GitHub** (same as above)

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings are auto-detected from `netlify.toml`
   - Click "Deploy site"

## 📂 Option 3: Manual Deployment

For any hosting provider (GitHub Pages, AWS, etc.):

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to your hosting provider

3. **Configure your server** to:
   - Serve `index.html` for all routes (SPA routing)
   - Enable gzip compression
   - Set proper cache headers

## 🔧 Environment Variables (Optional)

If you add any API keys or secrets:

1. Create `.env` file:
   ```
   VITE_API_KEY=your_api_key_here
   ```

2. Add to `.gitignore`:
   ```
   .env
   .env.local
   ```

3. Configure in hosting platform:
   - **Vercel**: Project Settings → Environment Variables
   - **Netlify**: Site Settings → Environment Variables

## 📧 Contact Form Setup

To enable the contact form:

### Option 1: Formspree (Easiest)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Update `src/components/Contact.tsx`:
   ```typescript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formState)
   });
   ```

### Option 2: EmailJS
1. Sign up at [emailjs.com](https://emailjs.com)
2. Install: `npm install @emailjs/browser`
3. Follow EmailJS React documentation

## 🎨 Custom Domain Setup

### For Vercel:
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `faizankhan.dev`)
3. Add DNS records at your domain registrar:
   - Type: `A`, Name: `@`, Value: `76.76.21.21`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`

### For Netlify:
1. Netlify Dashboard → Domain Settings
2. Add custom domain
3. Follow DNS configuration instructions

## 📊 Analytics (Optional)

### Google Analytics:
1. Create account at [analytics.google.com](https://analytics.google.com)
2. Get tracking ID
3. Add to `index.html` or use `react-ga4` package

### Vercel Analytics:
- Enable in Vercel dashboard (free tier available)

## ✅ Post-Deployment Verification

After deployment, check:

- [ ] Site loads without errors
- [ ] All sections display correctly
- [ ] Mobile responsiveness works
- [ ] Dark mode toggle functions
- [ ] Contact form submits successfully
- [ ] All links work (social media, projects)
- [ ] Images load properly
- [ ] SEO meta tags are correct (view page source)

## 🔍 SEO Checklist

- [ ] Update `src/data/portfolio.json` SEO section
- [ ] Add `sitemap.xml` (generate at [xml-sitemaps.com](https://www.xml-sitemaps.com))
- [ ] Submit to Google Search Console
- [ ] Test with [PageSpeed Insights](https://pagespeed.web.dev)
- [ ] Verify Open Graph tags with [opengraph.xyz](https://www.opengraph.xyz)

## 🐛 Troubleshooting

### Build fails?
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 on page refresh?
- Ensure hosting is configured for SPA routing
- Vercel/Netlify handle this automatically
- For other hosts, configure redirect rules

### Images not loading?
- Check image URLs in `portfolio.json`
- Ensure images are publicly accessible
- Use absolute URLs or host on CDN

## 📞 Support

If you need help:
- Email: faizankhan15658@gmail.com
- LinkedIn: [linkedin.com/in/faizan-khan-a40566263](https://www.linkedin.com/in/faizan-khan-a40566263/)

---

Good luck with your deployment! 🚀
