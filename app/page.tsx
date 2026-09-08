import {
  personalInfo,
  currentProjects,
  pastProjects,
  hackathons,
  experiences,
  education,
  pastEvents,
  communities,
} from '@/data/content';
import { Project } from '@/data/types';

function ProjectList({ items }: { items: Project[] }) {
  return (
    <ul>
      {items.map((p) => (
        <li key={p.title}>
          {p.link ? (
            <a href={p.link} target="_blank" rel="noopener noreferrer">
              {p.title}
            </a>
          ) : (
            <b>{p.title}</b>
          )}
          {p.description ? ` — ${p.description}` : null}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <main>
      <h1>{personalInfo.name}</h1>
      <p>{personalInfo.title}</p>

      {personalInfo.bio.map((line, i) => (
        <p key={i}>
          {line.split(/(https?:\/\/[^\s)]+)/).map((part, j) =>
            /^https?:\/\//.test(part) ? (
              <a key={j} href={part} target="_blank" rel="noopener noreferrer">
                {part}
              </a>
            ) : (
              part
            )
          )}
        </p>
      ))}

      <hr />

      <h2>Now</h2>
      <ProjectList items={currentProjects} />

      <h2>Hackathons</h2>
      <ProjectList items={hackathons} />

      <h2>Experience</h2>
      <ul>
        {experiences.map((e) => (
          <li key={e.title + e.company}>
            <b>{e.title}</b>, {e.company} ({e.period}) — {e.description}
          </li>
        ))}
      </ul>

      <h2>Past Projects</h2>
      <ProjectList items={pastProjects} />

      <h2>Communities</h2>
      <ProjectList items={communities} />

      <h2>Events</h2>
      <ul>
        {pastEvents.map((ev) => (
          <li key={ev.title}>
            {ev.link ? (
              <a href={ev.link} target="_blank" rel="noopener noreferrer">
                {ev.title}
              </a>
            ) : (
              ev.title
            )}
          </li>
        ))}
      </ul>

      <h2>Education</h2>
      <ul>
        {education.map((e) => (
          <li key={e.title + e.institution}>
            <b>{e.title}</b>, {e.institution} ({e.period}) — {e.description}
          </li>
        ))}
      </ul>

      <hr />

      <p>Email: {personalInfo.email}</p>
    </main>
  );
}
