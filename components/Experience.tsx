import type { Experience } from '@/data/types';

interface ExperienceProps {
  experiences: Experience[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="max-w-4xl px-6 py-16 border-t border-grid-line animate-fade-in animate-delay-600"
    >
      <h2 className="font-mono text-accent-secondary mb-8 text-sm md:text-base">
        // things i've done
      </h2>
      <ul className="space-y-6">
        {experiences.map((exp, index) => (
          <li key={index} className="text-muted leading-relaxed">
            <div className="flex flex-col sm:flex-row sm:gap-2 mb-1">
              <span className="font-medium text-foreground">
                {exp.title}, {exp.company}
              </span>
              <span className="text-sm">({exp.period})</span>
            </div>
            <p>{exp.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
