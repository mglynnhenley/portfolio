interface AboutProps {
  bio: string[];
}

export default function About({ bio }: AboutProps) {
  return (
    <section
      id="about"
      className="max-w-4xl px-6 py-6 animate-fade-in animate-delay-150"
    >
      <h2 className="font-mono text-accent-secondary mb-3 text-xs">
        // a bit about me
      </h2>
      <div className="space-y-2 text-muted leading-relaxed">
        {bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
