import type { Experience } from '@/data/types';

interface ExperienceProps {
  experiences: Experience[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="max-w-[900px] px-20 py-30 border-t border-foreground/10 animate-fade-in animate-delay-600"
    >
      <h2 className="font-heading text-accent-primary mb-8 text-xs uppercase tracking-wide">
        // things i've done
      </h2>
      <ul className="space-y-8">
        {experiences.map((exp, index) => (
          <li key={index} className="text-foreground leading-relaxed">
            <div className="flex flex-col sm:flex-row sm:gap-2 mb-2">
              <span className="font-semibold text-foreground">
                {exp.title}, {exp.company}
              </span>
              <span className="text-sm text-foreground/70">({exp.period})</span>
            </div>
            <p>{exp.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
