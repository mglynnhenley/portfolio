import { Project } from '@/data/types';

interface PastProjectsProps {
  projects: Project[];
}

export default function PastProjects({ projects }: PastProjectsProps) {
  return (
    <section
      id="past-projects"
      className="max-w-[900px] px-20 py-30 border-t border-foreground/10 animate-fade-in animate-delay-750"
    >
      <h2 className="font-heading text-accent-primary mb-8 text-xs uppercase tracking-wide">
        // past projects
      </h2>

      <ul className="space-y-6">
        {projects.map((project, index) => (
          <li key={index} className="text-foreground leading-relaxed">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-semibold hover:text-accent-primary"
              >
                {project.title} →
              </a>
            ) : (
              <span className="font-semibold">{project.title}</span>
            )}
            {project.description && ` — ${project.description}`}
          </li>
        ))}
      </ul>
    </section>
  );
}
