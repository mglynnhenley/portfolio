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
import TapColors from '@/components/TapColors';

function linkify(text: string) {
  return text.split(/(https?:\/\/[^\s)]+)/).map((part, j) =>
    /^https?:\/\//.test(part) ? (
      <a key={j} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      part
    )
  );
}

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
      <TapColors />
      <h1>{personalInfo.name}</h1>
      <p>
        {personalInfo.title}
        {personalInfo.site ? (
          <>
            {' · '}
            <a href={`https://${personalInfo.site}`} target="_blank" rel="noopener noreferrer">
              {personalInfo.site}
            </a>
          </>
        ) : null}
      </p>

      {personalInfo.bio.map((line, i) =>
        Array.isArray(line) ? (
          <ul key={i}>
            {line.map((item, j) => (
              <li key={j}>{linkify(item)}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{linkify(line)}</p>
        )
      )}

      <fieldset>
        <legend>Now</legend>
        <p>Exploring ideas in AI safety — here are a few things I&apos;ve worked on and built:</p>
        <ProjectList items={currentProjects} />
        <p><b>I&apos;m actively looking for cofounders.</b></p>
      </fieldset>

      <fieldset>
        <legend>Hackathons</legend>
        <ProjectList items={hackathons} />
      </fieldset>

      <fieldset>
        <legend>Experience</legend>
        <ul>
          {experiences.map((e) => (
            <li key={e.title + e.company}>
              <b>{e.title}</b>, {e.company} ({e.period}) — {e.description}
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend>Past Projects</legend>
        <ProjectList items={pastProjects} />
      </fieldset>

      <fieldset>
        <legend>Communities</legend>
        <ProjectList items={communities} />
      </fieldset>

      <fieldset>
        <legend>Events</legend>
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
      </fieldset>

      <fieldset>
        <legend>Education</legend>
        <ul>
          {education.map((e) => (
            <li key={e.title + e.institution}>
              <b>{e.title}</b>, {e.institution} ({e.period}) — {e.description}
            </li>
          ))}
        </ul>
      </fieldset>

      <hr />

      <p>Email: {personalInfo.email}</p>
    </main>
  );
}
