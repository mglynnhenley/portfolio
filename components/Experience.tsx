import type { Experience } from '@/data/types';

interface ExperienceProps {
  experiences: Experience[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="max-w-4xl mx-auto px-6 py-16 border-t border-grid-line animate-fade-in animate-delay-600"
    >
      <h2 className="font-mono text-accent-secondary mb-8 text-sm md:text-base">
        // work i've done
      </h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="border border-grid-line p-6 hover:border-accent-primary/50 hover:shadow-lg hover:shadow-accent-primary/10 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
              <h3 className="font-semibold text-foreground">
                {exp.title}, {exp.company}
              </h3>
              <span className="text-muted text-sm whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            <p className="text-muted leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
