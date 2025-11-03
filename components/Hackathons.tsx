import { Project } from '@/data/types';

interface HackathonsProps {
  hackathons: Project[];
}

export default function Hackathons({ hackathons }: HackathonsProps) {
  return (
    <section
      id="hackathons"
      className="max-w-[900px] px-20 py-30 border-t border-foreground/10 animate-fade-in animate-delay-450"
    >
      <h2 className="font-heading text-accent-primary mb-8 text-xs uppercase tracking-wide">
        // hackathons
      </h2>
      <ul className="space-y-6">
        {hackathons.map((hackathon, index) => (
          <li key={index} className="text-foreground leading-relaxed">
            {hackathon.link ? (
              <a
                href={hackathon.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-semibold hover:text-accent-primary"
              >
                {hackathon.title}
              </a>
            ) : (
              <span className="font-semibold">{hackathon.title}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
