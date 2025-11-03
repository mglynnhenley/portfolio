import { Event } from '@/data/types';

interface EventsProps {
  events: Event[];
}

export default function Events({ events }: EventsProps) {
  return (
    <section
      id="events"
      className="max-w-[900px] px-20 py-30 border-t border-foreground/10 animate-fade-in animate-delay-750"
    >
      <h2 className="font-heading text-accent-primary mb-8 text-xs uppercase tracking-wide">
        // events
      </h2>
      <div>
        <h3 className="font-semibold mb-4 text-foreground">past</h3>
        <ul className="space-y-6">
          {events.map((event, index) => (
            <li key={index} className="text-foreground leading-relaxed">
              {event.link ? (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-semibold hover:text-accent-primary"
                >
                  {event.title}
                </a>
              ) : (
                <span className="font-semibold">{event.title}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
