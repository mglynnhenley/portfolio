import { Project } from '@/data/types';

interface PastProjectsProps {
  projects: Project[];
}

export default function PastProjects({ projects }: PastProjectsProps) {
  return (
    <section
      id="past-projects"
      className="max-w-4xl px-6 py-16 border-t border-grid-line animate-fade-in animate-delay-750"
    >
      <h2 className="font-mono text-accent-secondary mb-8 text-sm md:text-base">
        // past projects
      </h2>

      <ul className="space-y-2.5">
        {projects.map((project, index) => (
          <li key={index} className="text-muted leading-relaxed">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-secondary font-semibold underline hover:text-accent-primary transition-colors"
              >
                {project.title} →
              </a>
            ) : (
              <span>{project.title}</span>
            )}
            {project.description && ` — ${project.description}`}
          </li>
        ))}
      </ul>
    </section>
  );
}
