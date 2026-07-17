🌐 Council of Diplomatic Affairs — Official MUN Website
Where diplomacy meets the next generation.

Official website for the Council of Diplomatic Affairs (CDA) Model United Nations conference. Built with React, TypeScript, and Supabase.


🚀 Live Site
council-of-diplomatic-affairs.vercel.app


✨ Features
🏛️ Full conference website — Home, About, Committees, Schedule, Team, Registration
📋 Live delegate registration with real-time database (Supabase)
🔐 Password-protected /admin page for organizers
📊 Admin dashboard — view all registrations, search, export CSV
💳 Payment status tracking (mark delegates as paid/pending)
🌐 Rotating 3D globe animation on hero section (Three.js)
📱 Fully responsive — mobile, tablet, desktop
⚡ Fast — built with Vite


🛠️ Tech Stack
Layer
Technology
Frontend
React 19 + TypeScript
Build Tool
Vite
Styling
Tailwind CSS v4
Animations
Framer Motion + Three.js
Database
Supabase (PostgreSQL)
Auth
Supabase Auth
Hosting
Vercel
Domain
Coming soon



📁 Project Structure
src/

├── components/

│   ├── Navbar.tsx          # Navigation bar

│   ├── Hero.tsx            # Landing section with 3D globe

│   ├── About.tsx           # About the conference

│   ├── CommitteesList.tsx  # All committees

│   ├── ScheduleTimeline.tsx # Event schedule

│   ├── TeamList.tsx        # Organizing team

│   ├── RegistrationForm.tsx # Delegate registration

│   └── Footer.tsx

├── lib/

│   └── supabase.ts         # Supabase client setup

├── AdminPage.tsx           # /admin dashboard

├── data.ts                 # ← Edit this to update all content

├── types.ts                # TypeScript interfaces

├── main.tsx                # App entry + routing

└── index.css

supabase-setup.sql          # Run this once in Supabase SQL Editor


⚙️ Local Setup
Prerequisites
Node.js 18+
A Supabase account (free at supabase.com)
1. Clone the repo
git clone https://github.com/YOUR_USERNAME/council-of-diplomatic-affairs.git

cd council-of-diplomatic-affairs
2. Install dependencies
npm install
3. Set up Supabase
Create a project at supabase.com
Go to SQL Editor → paste and run supabase-setup.sql
Go to Authentication → Users → Add User → create your admin login
Go to Settings → API → copy your Project URL and anon public key
4. Add environment variables
Create a .env.local file in the root:

VITE_SUPABASE_URL=https://your-project.supabase.co

VITE_SUPABASE_ANON_KEY=eyJhbGci...your-anon-key...
5. Run locally
npm run dev

Opens at http://localhost:5173


🌍 Deployment (Vercel)
Push this repo to GitHub
Go to vercel.com → Add New Project → import repo
Add environment variables in Vercel:
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
Click Deploy ✅

Auto-deploys on every push to main.


✏️ How to Update Content
All website content is in src/data.ts:

// Change event details

export const CONFIG = {

  eventName: "Council of Diplomatic Affairs",

  date: "August 15–16, 2025",

  venue: "Your Venue, City",

  fee: "₹1,200",

}

// Add/edit committees

export const COMMITTEES_DATA = [...]

// Add/edit team members

export const TEAM_DATA = [...]

// Add/edit schedule

export const SCHEDULE_DATA = [...]


🔐 Admin Panel
Access the admin dashboard at:

https://yoursite.com/admin

Features:

🔑 Login with your Supabase Auth credentials
📋 View all delegate registrations in a table
🔍 Search by name, email, institution, or pass ID
💳 Toggle payment status (pending → paid) with one click
📥 Export all data as CSV
🔄 Refresh live data


🗄️ Database Schema
registrations (

  id              uuid primary key

  created_at      timestamptz

  full_name       text

  email           text unique

  whatsapp        text

  institution     text

  primary_committee    text

  secondary_committee  text

  previous_mun_experience text

  position_statement   text

  pass_id         text unique

  payment_status  text  -- 'pending' | 'paid'

  payment_reference text

)


📞 Contact
For event queries — [gargnishant498@gmail.com]

For technical issues — open a GitHub Issue


📄 License
MIT — feel free to fork and adapt for your own MUN conference.



Made with ☕, late nights, and a lot of position papers.
