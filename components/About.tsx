interface AboutProps {
  bio: string[];
}

export default function About({ bio }: AboutProps) {
  return (
    <section
      id="about"
      className="max-w-4xl px-6 py-8 animate-fade-in animate-delay-150"
    >
      <h2 className="font-mono text-accent-secondary mb-6 text-sm md:text-base">
        // a bit about me
      </h2>
      <div className="space-y-4 text-muted leading-relaxed">
        {bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
