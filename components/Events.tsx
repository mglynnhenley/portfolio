import { Event } from '@/data/types';

interface EventsProps {
  events: Event[];
}

export default function Events({ events }: EventsProps) {
  return (
    <section
      id="events"
      className="max-w-4xl px-6 py-8 border-t border-grid-line animate-fade-in animate-delay-750"
    >
      <h2 className="font-mono text-accent-secondary mb-4 text-xs">
        // events
      </h2>
      <div>
        <h3 className="font-semibold mb-2 text-foreground text-sm">past</h3>
        <ul className="space-y-1.5">
          {events.map((event, index) => (
            <li key={index} className="text-muted leading-relaxed">
              {event.link ? (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-accent-primary transition-colors"
                >
                  {event.title}
                </a>
              ) : (
                <span>{event.title}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
