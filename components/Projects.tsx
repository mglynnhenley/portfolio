import { Project } from '@/data/types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="max-w-4xl px-6 py-12 border-t border-grid-line animate-fade-in animate-delay-300"
    >
      <h2 className="font-mono text-accent-secondary mb-4 text-xs">
        // current projects
      </h2>

      <ul className="space-y-1.5">
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
              <span className="font-medium">{project.title}</span>
            )}
            {' — '}
            {project.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
