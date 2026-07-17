# Council of Diplomatic Affairs — MUN Website

Official website for the **Council of Diplomatic Affairs (CDA)** Model United Nations conference.

## 🌐 Live Site
> Add your deployment URL here after hosting

## 🛠️ Tech Stack
- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **Lucide React** (icons)

## 📁 Project Structure
```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── CommitteesList.tsx
│   ├── ScheduleTimeline.tsx
│   ├── TeamList.tsx
│   ├── RegistrationForm.tsx
│   └── Footer.tsx
├── data.ts        ← Edit this to update content
├── types.ts
├── main.tsx
└── index.css
```

## 🚀 Run Locally

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# Opens at http://localhost:3000

# Build for production
npm run build
```

## ✏️ How to Edit Content
All website content (committees, team, schedule) is in **`src/data.ts`** — edit that file to update everything.

## 🌍 Deploy
This site can be deployed for free on **Vercel**:
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repo
3. Framework: **Vite** → Deploy ✅
