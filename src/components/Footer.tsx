import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h2 className="font-bold text-lg mb-1">Manoj S</h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            Full Stack AI Developer
          </p>
        </div>
        <div className="flex gap-4 items-center md:ml-auto">
          <a href="https://github.com/Manoj5026" aria-label="GitHub" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
            <Github size={22} />
          </a>
          <a href="https://www.linkedin.com/in/manojs81" aria-label="LinkedIn" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
            <Linkedin size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
}
