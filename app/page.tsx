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
import KoiPond from '@/components/KoiPond';
import ThemeToggle from '@/components/ThemeToggle';
import FishToggle from '@/components/FishToggle';

// Turns bare URLs and [text](url) into links.
function linkify(text: string) {
  return text.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s)]+)/).map((part, j) => {
    const md = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    const [label, href] = md ? [md[1], md[2]] : [part, part];
    return md || /^https?:\/\//.test(part) ? (
      <a key={j} href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    ) : (
      part
    );
  });
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
      <FishToggle />
      <TapColors />
      <KoiPond />
      <div className="page-controls">
        <ThemeToggle />
      </div>
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

      <p>
        <small>
          The koi are inspired by{' '}
          <a href="https://github.com/Dao-Ho/portfolio" target="_blank" rel="noopener noreferrer">
            Dao Ho&apos;s koi pond
          </a>
          ; the turtles by{' '}
          <a href="https://x.com/stackedlol" target="_blank" rel="noopener noreferrer">
            @stackedlol
          </a>
          &apos;s ASCII ocean.
        </small>
      </p>
    </main>
  );
}
