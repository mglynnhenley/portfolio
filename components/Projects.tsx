import { Project } from '@/data/types';

interface ProjectsProps {
  current: Project[];
  past: Project[];
}

export default function Projects({ current, past }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="max-w-4xl px-6 py-16 border-t border-grid-line animate-fade-in animate-delay-300"
    >
      <h2 className="font-mono text-accent-secondary mb-8 text-sm md:text-base">
        // stuff on the side
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="font-semibold mb-3 text-foreground">current</h3>
          <ul className="space-y-2.5">
            {current.map((project, index) => (
              <li key={index} className="text-muted leading-relaxed">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-accent-primary transition-colors"
                  >
                    {project.title}
                  </a>
                ) : (
                  <span className="font-medium">{project.title}</span>
                )}
                {' — '}
                {project.description}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-foreground">past</h3>
          <ul className="space-y-2.5">
            {past.map((project, index) => (
              <li key={index} className="text-muted leading-relaxed">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-accent-primary transition-colors"
                  >
                    {project.title}
                  </a>
                ) : (
                  <span>{project.title}</span>
                )}
                {project.description && ` — ${project.description}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
