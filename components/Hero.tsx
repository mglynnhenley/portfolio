interface HeroProps {
  name: string;
  title: string;
}

export default function Hero({ name, title }: HeroProps) {
  return (
    <section className="max-w-4xl px-6 pt-20 pb-8 animate-fade-in">
      <p className="text-muted text-sm md:text-base mb-8 font-mono">
        currently living in{' '}
        <span className="text-accent-primary font-bold">paris</span>
        {' '}at{' '}
        <a
          href="https://joinpluto.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-secondary hover:text-accent-primary transition-colors underline"
        >
          pluto hacker house
        </a>
      </p>

      <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">{name}</h1>
      <p className="text-muted text-lg md:text-xl mb-12">{title}</p>

      <nav className="flex flex-wrap gap-6 font-mono text-sm md:text-base">
        <a
          href="#projects"
          className="underline hover:text-accent-primary transition-colors"
        >
          projects
        </a>
        <a
          href="#community"
          className="underline hover:text-accent-primary transition-colors"
        >
          community
        </a>
        <a
          href="#hackathons"
          className="underline hover:text-accent-primary transition-colors"
        >
          hackathons
        </a>
        <a
          href="#events"
          className="underline hover:text-accent-primary transition-colors"
        >
          events
        </a>
        <a
          href="#experience"
          className="underline hover:text-accent-primary transition-colors"
        >
          experience
        </a>
      </nav>
    </section>
  );
}
