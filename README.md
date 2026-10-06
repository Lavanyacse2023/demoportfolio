# Alex Morgan | Senior Software Engineer Portfolio

A modern, responsive portfolio website for a software engineer featuring a pixel art aesthetic, dark/light theme detection, an interactive AI Chat interface, project modals, an interactive career timeline, and an email-ready contact form.

---

## 🚀 Features & Architecture (15 Layered Prompts Implemented)

1. **Semantic HTML5 Foundation**: Fully structured with `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.
2. **Night Mode Detection via CSS Media Queries**:
   - Automatically adapts to `@media (prefers-color-scheme: dark)` and `@media (prefers-color-scheme: light)`.
   - Includes manual theme toggle button (`#theme-toggle`) persisted in `localStorage`.
3. **Pixel Art Hero Section**:
   - 8-bit Google Fonts (`Press Start 2P`, `Pixelify Sans`).
   - CRT scanlines and pixel grid overlays.
   - Background image (`BackGround.jpg`) with pixel avatar frame (`Profile.jpg`).
   - Interactive RPG HUD stats (LVL 99, HP/MP meters, 3D pixel buttons).
4. **About Me Section**: Profile image, career highlights, and personal interests (retro game dev, custom keyboards, chess).
5. **Skills Section**: Categorized competencies (Frontend, Backend, DevOps) with animated skill progress bars and hover effects.
6. **Interactive Career Timeline**: Chronological career milestones and education with glowing nodes and hover elevations.
7. **Projects Section with Clickable Thumbnails & Modals**:
   - Filter by category (`All`, `Full-Stack`, `Cloud / Backend`, `AI / ML`).
   - Clickable cards that trigger detailed project architecture modals (`PROJECT_INSPECTOR.EXE`).
8. **Embedded Video Showcase**: Responsive 16:9 aspect-ratio video frame with caption bar.
9. **Testimonials Section**: Card containers with 5-star ratings, quote marks, and peer/client recommendations.
10. **Interactive AI Chat Interface**:
    - Simulated AI Alex assistant with smart contextual replies.
    - Quick prompt chips and chat history controls.
    - Code comments for OpenAI / Gemini API integration in `script.js`.
11. **Contact Form with Email API Ready Handler**:
    - High-contrast inputs with validation and submission feedback toast.
    - Integration comments for Resend API / Formspree / EmailJS.
12. **Pixel Art Footer**: Accessible social links (GitHub, LinkedIn, X/Twitter, Discord, Email) with hover animations and auto-updating copyright.
13. **Responsive Design**: Full multi-device support (desktop, tablet, mobile) with mobile navigation drawer.
14. **Visual Enhancements**: Cohesive glassmorphism, pixelated box-shadows, and micro-animations.
15. **Production Deployment Ready**: Zero build tools required—runs cleanly in any static host.

---

## 💻 Running Locally

### Option 1: Python HTTP Server (Port 8080)
```powershell
python -m http.server 8080
```
Open **[http://localhost:8080/](http://localhost:8080/)** in your browser.

### Option 2: Node.js Serve
```powershell
npx -y serve .
```

---

## 🌐 Deployment Instructions

### 1. GitHub Pages
1. Push this repository to GitHub.
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repo-name>/`.

### 2. Vercel / Netlify
1. Connect your GitHub repository on [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Set Build Command to empty and Publish Directory to `./`.
3. Deploy instantly with zero configuration.
