interface HeroProps {
  name: string;
  title: string;
}

export default function Hero({ name, title }: HeroProps) {
  return (
    <section className="max-w-[900px] px-20 pt-40 pb-32 animate-fade-in">
      <p className="text-foreground text-xs mb-6 font-mono">
        currently living in{' '}
        <span className="text-accent-primary font-bold">paris</span>
        {' '}at{' '}
        <a
          href="https://joinpluto.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-accent-primary"
        >
          pluto hacker house
        </a>
      </p>

      <h1 className="text-5xl font-bold mb-4 text-accent-primary">{name}</h1>
      <p className="text-foreground text-lg mb-8">{title}</p>

      <nav className="flex flex-wrap gap-6 font-mono text-xs">
        <a
          href="#projects"
          className="text-foreground hover:text-accent-primary"
        >
          projects
        </a>
        <a
          href="#community"
          className="text-foreground hover:text-accent-primary"
        >
          community
        </a>
        <a
          href="#hackathons"
          className="text-foreground hover:text-accent-primary"
        >
          hackathons
        </a>
        <a
          href="#events"
          className="text-foreground hover:text-accent-primary"
        >
          events
        </a>
        <a
          href="#experience"
          className="text-foreground hover:text-accent-primary"
        >
          experience
        </a>
      </nav>
    </section>
  );
}
