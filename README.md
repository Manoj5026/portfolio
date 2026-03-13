# Manoj S | Portfolio

A personal portfolio site with a blog and an admin panel for managing content. The admin tab is visible only when the user is logged in.

**Live site:** [https://portfolio-manojs.vercel.app/](https://portfolio-manojs.vercel.app/)  
**Admin login:** [https://portfolio-manojs.vercel.app/admin/login](https://portfolio-manojs.vercel.app/admin/login)

---

## What I Built

- **Portfolio pages** — Home, Projects, and Blog sections with a responsive layout
- **Blog display** — Blog listing and post display powered by Supabase
- **Admin panel UI** — Login-protected admin area for managing posts; admin link appears only when logged in
- **Image storage** — Uploads and media stored in Supabase Storage
- **Database** — Blog posts and related data in Supabase (PostgreSQL)

---

## Tech Stack

| Area           | Technology                          |
|----------------|-------------------------------------|
| Framework      | Next.js 16 (App Router)             |
| UI             | React 19, TypeScript, Tailwind CSS  |
| Database       | Supabase (PostgreSQL)               |
| Image storage  | Supabase Storage                    |
| Deployment     | Vercel                              |
| Icons          | Lucide React, React Icons           |

---

## AI Tools Used

| Tool                 | How it helped                                                                 |
|----------------------|-------------------------------------------------------------------------------|
| **Cursor IDE**       | Used to write and refactor code across the app (components, pages, API routes, styling). |
| **ChatGPT**          | Used to design the posts table schema and validate structure for Supabase.   |
| **Supabase MCP**     | Connected the Supabase MCP server to interact with the database (tables, data, schema) from the IDE. |

**Rough split:** ~80% of the code was written with AI assistance (Cursor + ChatGPT); the rest was written or adjusted manually (logic, wiring, env, and deployment).

**Understanding:** I reviewed and understood the AI-generated code, adjusted it for this project, and used it alongside manual implementation for auth, routing, and styling.

---

## Run the Project Locally

### 1. Clone and install

```bash
git clone https://github.com/Manoj5026/portfolio.git
cd portfolio-app
npm install
```

### 2. Environment variables

Create a `.env.local` file in the project root with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin (cookie-based login)
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

### 3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For the admin panel, go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and sign in with the credentials you set in `.env.local`.

---

## Deploy (Vercel)

The app is **frontend-only** on [Vercel](https://vercel.com), with Supabase as backend and storage. Deployed surface: portfolio pages, blog display, and admin panel UI. Import the repo and add the same env vars from `.env.local` in Vercel **Settings → Environment Variables**.
