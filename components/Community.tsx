import type { Community } from '@/data/types';

interface CommunityProps {
  communities: Community[];
}

export default function Community({ communities }: CommunityProps) {
  return (
    <section
      id="community"
      className="max-w-[900px] px-20 py-30 border-t border-foreground/10 animate-fade-in animate-delay-300"
    >
      <h2 className="font-heading text-accent-primary mb-8 text-xs uppercase tracking-wide">
        // community
      </h2>
      <ul className="space-y-6">
        {communities.map((community, index) => (
          <li key={index} className="text-foreground leading-relaxed">
            {community.link ? (
              <a
                href={community.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-semibold hover:text-accent-primary"
              >
                {community.title}
              </a>
            ) : (
              <span className="font-semibold">{community.title}</span>
            )}
            {' — '}
            {community.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
