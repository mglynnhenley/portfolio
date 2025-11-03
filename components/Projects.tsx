import { Project } from '@/data/types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="max-w-[900px] px-20 py-30 border-t border-foreground/10 animate-fade-in animate-delay-300"
    >
      <h2 className="font-heading text-accent-primary mb-8 text-xs uppercase tracking-wide">
        // current projects
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
            {' — '}
            {project.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
