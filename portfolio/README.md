# Regonda Udayasri: Portfolio

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide icons.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production check
```

## Where to edit content

All content lives in `src/data/`, so you never touch layout code to update the site.

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, headline, intro, email, GitHub, LinkedIn, resume path, profile photo, hero highlights |
| `projects.ts` | Project cards, detail view, workflow diagrams, repo and **demo video** links |
| `skills.ts` | Skill categories |
| `education.ts` | Degree, CGPA, semester SGPA, coursework |

Other places: `src/components/Experience.tsx` (internship, achievements, certifications).

### Interactive features
- **Command menu:** press `Ctrl K` (or `⌘ K`) or use the search button in the header. Items are listed in `src/components/CommandPalette.tsx`.
- **Anomaly detector lab:** `src/components/AnomalyLab.tsx`. The sample log is illustrative and labelled as such; the anomaly counts come from the repo README. Edit `kinds` and `rows` at the top of the file.
- **Ask my terminal:** `src/components/TerminalSection.tsx`. Answers are built from `src/data/*`, so editing your data updates the terminal too.
- **Hero rotating line:** `workingWith` in `src/data/profile.ts`. **Tech strip:** `items` in `src/components/TechMarquee.tsx`.

### Add your photo
1. Put `profile.jpg` in `public/`.
2. In `src/data/profile.ts` set `profileImage: "/profile.jpg"`.

### Add a project repo or demo video
In `src/data/projects.ts`, add `repo: "https://github.com/..."` and/or `demo: "https://..."` to a project. The buttons appear automatically; nothing renders when a link is absent.

### Replace the resume
Overwrite `public/Regonda_Udayasri_Resume.pdf` (keep the file name).

## Deploy to Vercel

**Option A: through GitHub (recommended)**
1. Create a new GitHub repository (for example `portfolio`) and push this folder:
   ```bash
   git init && git add . && git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/udayasri-regonda/portfolio.git
   git push -u origin main
   ```
2. Go to <https://vercel.com/new>, sign in with GitHub, import the repository.
3. Framework is detected as Next.js. Leave defaults and click **Deploy**.
4. Every later `git push` redeploys automatically.

**Option B: CLI**
```bash
npm i -g vercel
vercel        # follow prompts
vercel --prod
```

### Professional URL
1. Buy a domain (for example `udayasriregonda.com` or `.dev`) from any registrar.
2. In Vercel: **Project → Settings → Domains → Add**, enter the domain, and add the DNS records Vercel shows you.
3. In **Settings → Environment Variables** add `NEXT_PUBLIC_SITE_URL` = `https://your-domain` and redeploy. This sets the canonical URL, sitemap and social-preview links.

Until then your free `*.vercel.app` URL works and the sitemap picks it up automatically.

## Notes
- The contact form composes an email in the visitor's mail app (no backend needed). To receive messages directly, connect a form service such as Formspree and swap the handler in `src/components/Contact.tsx`.
- Animations respect `prefers-reduced-motion`; the theme choice is remembered per browser.
