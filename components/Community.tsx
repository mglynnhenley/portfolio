import { Community } from '@/data/types';

interface CommunityProps {
  communities: Community[];
}

export default function Community({ communities }: CommunityProps) {
  return (
    <section
      id="community"
      className="max-w-4xl px-6 py-16 border-t border-grid-line animate-fade-in animate-delay-300"
    >
      <h2 className="font-mono text-accent-secondary mb-8 text-sm md:text-base">
        // community
      </h2>
      <ul className="space-y-2.5">
        {communities.map((community, index) => (
          <li key={index} className="text-muted leading-relaxed">
            {community.link ? (
              <a
                href={community.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent-primary transition-colors"
              >
                {community.title}
              </a>
            ) : (
              <span className="font-medium">{community.title}</span>
            )}
            {' — '}
            {community.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
