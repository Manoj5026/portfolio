import Image from "next/image";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPostgresql,
  SiGit,
  SiNginx,
  SiPostman,
  SiGitlab,
  SiLangchain,
  SiLanggraph,
  SiElevenlabs,
} from "react-icons/si";
import { FaCode, FaRobot, FaDatabase, FaAws, FaPlug, FaCloud, FaCogs } from "react-icons/fa";
import { TbLoadBalancer } from "react-icons/tb";
import { MdDns } from "react-icons/md";

const BIO =
  "I'm a Full Stack AI Developer with 1 year of experience who likes owning work end-to-end and turning complex requirements into shipped features. I've built and run a production full-stack platform and serverless data pipelines, and I care about turning underused data into real outcomes—analytics, leads, and better decisions. I stay curious, learn new tools and stacks quickly, and aim for clean, maintainable code. I'm comfortable across frontend, backend, APIs, AI integration, and deployment.";

const SKILLS = [
  { name: "Next.js", icon: SiNextdotjs, color: "text-[#000000]" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933]" },
  { name: "React", icon: SiReact, color: "text-[#61dafb]" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178c6]" },
  { name: "JavaScript", icon: SiJavascript, color: "text-[#f7df1e]" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#336791]" },
  { name: "DynamoDB", icon: FaDatabase, color: "text-[#4053D6]" },
  { name: "Git", icon: SiGit, color: "text-[#f05032]" },
  { name: "GitLab", icon: SiGitlab, color: "text-[#FC6D26]" },
  { name: "Nginx", icon: SiNginx, color: "text-[#009639]" },
  { name: "DNS", icon: MdDns, color: "text-[#64748b]" },
  { name: "REST API", icon: FaCode, color: "text-[#64748b]" },
  { name: "Postman", icon: SiPostman, color: "text-[#FF6C37]" },
  { name: "MCP Servers", icon: FaPlug, color: "text-[#64748b]" },
  { name: "AWS Lightsail", icon: FaAws, color: "text-[#232F3E]" },
  { name: "AWS IAM", icon: FaAws, color: "text-[#232F3E]" },
  { name: "AWS Cognito", icon: FaAws, color: "text-[#232F3E]" },
  { name: "AWS SAM", icon: FaAws, color: "text-[#232F3E]" },
  { name: "CloudFormation", icon: FaAws, color: "text-[#232F3E]" },
  { name: "Lambda", icon: FaAws, color: "text-[#232F3E]" },
  { name: "S3", icon: FaAws, color: "text-[#232F3E]" },
  { name: "Glue (ETL)", icon: FaCogs, color: "text-[#FF9900]" },
  { name: "CloudWatch", icon: FaCloud, color: "text-[#FF4F8B]" },
  { name: "Application Load Balancer", icon: TbLoadBalancer, color: "text-[#232F3E]" },
  { name: "AWS Bedrock", icon: FaRobot, color: "text-[#6366f1]" },
  { name: "ElevenLabs Conversation AI", icon: SiElevenlabs, color: "text-[#000000]" },
  { name: "LangChain", icon: SiLangchain, color: "text-[#1C3C3C]" },
  { name: "LangGraph", icon: SiLanggraph, color: "text-[#1C3C3C]" },
  { name: "Agentic AI", icon: FaRobot, color: "text-[#6366f1]" },
  { name: "Cursor AI IDE", icon: FaCode, color: "text-[#64748b]" },
];

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      {/* Hero: name, photo, bio */}
      <section className="flex flex-col items-center text-center gap-6 mb-16">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-xl overflow-hidden shadow-md ring-2 ring-zinc-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <Image
            src="/image/manojs.JPG"
            alt="Manoj S"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 256px, 288px"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold max-w-2xl">Manoj S</h1>
        <p className="text-lg text-muted-foreground w-full max-w-4xl mx-auto text-justify leading-relaxed">
          {BIO}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-8 text-center">Skills</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {SKILLS.map((skill) => {
            const Icon = skill.icon;
            return (
              <div key={skill.name} className="flex flex-col items-center">
                <Icon size={36} className={`mb-1 ${skill.color}`} />
                <span className="text-xs mt-1">{skill.name}</span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
