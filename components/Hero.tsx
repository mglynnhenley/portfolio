interface HeroProps {
  name: string;
  title: string;
}

export default function Hero({ name, title }: HeroProps) {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-20 pb-8 animate-fade-in">
      <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">{name}</h1>
      <p className="text-muted text-lg md:text-xl">{title}</p>

      <nav className="flex flex-wrap gap-6 mt-12 font-mono text-sm md:text-base">
        <a
          href="#projects"
          className="underline hover:text-accent-primary transition-colors"
        >
          stuff on the side
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
          events i've hosted
        </a>
        <a
          href="#experience"
          className="underline hover:text-accent-primary transition-colors"
        >
          things i've done
        </a>
      </nav>
    </section>
  );
}
