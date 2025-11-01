import { Project } from '@/data/types';

interface HackathonsProps {
  hackathons: Project[];
}

export default function Hackathons({ hackathons }: HackathonsProps) {
  return (
    <section
      id="hackathons"
      className="max-w-4xl mx-auto px-6 py-16 border-t border-grid-line animate-fade-in animate-delay-450"
    >
      <h2 className="font-mono text-accent-secondary mb-8 text-sm md:text-base">
        // hackathons
      </h2>
      <ul className="space-y-2.5">
        {hackathons.map((hackathon, index) => (
          <li key={index} className="text-muted leading-relaxed">
            {hackathon.link ? (
              <a
                href={hackathon.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent-primary transition-colors"
              >
                {hackathon.title}
              </a>
            ) : (
              <span className="font-medium">{hackathon.title}</span>
            )}
            {hackathon.description && ` — ${hackathon.description}`}
          </li>
        ))}
      </ul>
    </section>
  );
}
