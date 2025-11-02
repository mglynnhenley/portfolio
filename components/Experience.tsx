import type { Experience } from '@/data/types';

interface ExperienceProps {
  experiences: Experience[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="max-w-4xl px-6 py-8 border-t border-grid-line animate-fade-in animate-delay-600"
    >
      <h2 className="font-mono text-accent-secondary mb-4 text-xs">
        // things i've done
      </h2>
      <ul className="space-y-3">
        {experiences.map((exp, index) => (
          <li key={index} className="text-muted leading-relaxed">
            <div className="flex flex-col sm:flex-row sm:gap-2 mb-1">
              <span className="font-medium text-foreground text-sm">
                {exp.title}, {exp.company}
              </span>
              <span className="text-xs">({exp.period})</span>
            </div>
            <p className="text-sm">{exp.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
