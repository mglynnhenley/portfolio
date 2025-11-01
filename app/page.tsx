import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Hackathons from '@/components/Hackathons';
import Experience from '@/components/Experience';
import Events from '@/components/Events';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import {
  personalInfo,
  currentProjects,
  pastProjects,
  hackathons,
  experiences,
  pastEvents
} from '@/data/content';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ThemeToggle />
      <Hero name={personalInfo.name} title={personalInfo.title} />
      <About bio={personalInfo.bio} />
      <Projects current={currentProjects} past={pastProjects} />
      <Hackathons hackathons={hackathons} />
      <Experience experiences={experiences} />
      <Events events={pastEvents} />
      <Footer />
    </main>
  );
}
