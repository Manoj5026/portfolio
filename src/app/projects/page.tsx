import { Card } from "@/components/ui/card";

const PROJECTS = [
  {
    title: "Assistifi (AI Powered Automotive App)",
    description:
      "An Intelligent Automotive Lead Management System Integrating Voice Interaction, AI-Based Product Recommendation and Vehicle Upgrade Workflows.",
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "DynamoDB",
      "AWS Services",
      "Microservices",
      "Agentic Frameworks (OpenAI Agents SDK, LangChain, ElevenLabs)",
    ],
    highlights: [
      "Built and shipped a full-stack automotive platform (Next.js, TypeScript) with multiple REST APIs, multi-tenant architecture, and role-based dashboards for General, Sales, and Service Managers.",
      "Integrated AI across the product: OpenAI multi-agent system that turns CRM and DMS data into analyzed insights and qualified dealer leads; product recommendation and design (Copilot); and ElevenLabs conversation AI for customer-facing voice interactions.",
      "Deployed and operated production on AWS using Lightsail, Load Balancer, DNS, Nginx reverse proxy, and PM2 for process management.",
      "Designed and built serverless microservices (AWS Lambda, SAM) that fetch data from the dealer platform, enrich it, and send it to downstream apps—including scheduled syncs, webhooks, and Glue ETL pipelines.",
      "Managed data storage: PostgreSQL (RDS) for structured data and DynamoDB for unstructured data.",
      "Use Cursor AI IDE for day-to-day development, enabling faster delivery while maintaining clean, maintainable code.",
      "Collaborated in Agile sprints, participating in stand-ups, planning, and retrospectives.",
    ],
  },
  {
    title: "Nustan (Career and Recruitment Platform)",
    description:
      "Admin dashboard and recruitment management for organizations, candidates, and hiring workflows.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Vercel", "Supabase", "OpenAI Agents SDK"],
    highlights: [
      "Designed and implemented the admin experience: professionals, requisitions, organizations, assessments, candidates, culture and assessment profiles, units, user management, and analytics (requisition metrics, page visits).",
      "Integrated Auth0-based authentication with organization-scoped access and Supabase for data; used AWS S3 for resume storage.",
      "Deployed on Vercel; used Cursor AI for development and followed Agile practices (stand-ups, planning, retrospectives).",
      "Virtual interviews: Integrated ElevenLabs voice AI to run conversational virtual interviews with candidates, supporting scalable, consistent screening without live interviewers.",
      "Answer validation: Used OpenAI agents to validate and score candidate answers against job and assessment criteria, improving consistency and reducing manual evaluation effort.",
      "Participated in requirement gathering, stack planning, and documentation",
    ],
  },
];

export default function ProjectsPage() {
  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-extrabold mb-2 text-center">Projects</h1>
      <p className="text-lg text-muted-foreground mb-10 text-center max-w-xl mx-auto">
        Full-stack and AI-driven applications I've built and shipped.
      </p>

      <div className="flex flex-col gap-8 w-full">
        {PROJECTS.map((project) => (
          <Card
            key={project.title}
            className="w-full p-8 group transition-shadow hover:shadow-2xl hover:-translate-y-0.5 duration-200 bg-gradient-to-br from-white/80 via-[#d9f6fd]/60 to-white/80 dark:from-zinc-900/80 dark:via-zinc-800/60 dark:to-zinc-900/80 border border-zinc-200 dark:border-zinc-700"
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-foreground">
                {project.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                {project.highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold text-foreground">Tech stack:</span>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/70 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-foreground/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
