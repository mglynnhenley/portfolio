interface AboutProps {
  bio: string[];
}

export default function About({ bio }: AboutProps) {
  return (
    <section
      id="about"
      className="max-w-[900px] px-20 py-30 animate-fade-in animate-delay-150"
    >
      <h2 className="font-heading text-accent-primary mb-8 text-xs uppercase tracking-wide">
        // a bit about me
      </h2>
      <div className="space-y-4 text-foreground leading-relaxed">
        {bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
