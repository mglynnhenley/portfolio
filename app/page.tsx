import Hero from '@/components/Hero';
import About from '@/components/About';
import Community from '@/components/Community';
import Projects from '@/components/Projects';
import PastProjects from '@/components/PastProjects';
import Hackathons from '@/components/Hackathons';
import Experience from '@/components/Experience';
import Events from '@/components/Events';
import Footer from '@/components/Footer';
import {
  personalInfo,
  currentProjects,
  pastProjects,
  hackathons,
  experiences,
  pastEvents,
  communities
} from '@/data/content';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero name={personalInfo.name} title={personalInfo.title} />
      <About bio={personalInfo.bio} />
      <Projects projects={currentProjects} />
      <Community communities={communities} />
      <Hackathons hackathons={hackathons} />
      <Experience experiences={experiences} />
      <Events events={pastEvents} />
      <PastProjects projects={pastProjects} />
      <Footer />
    </main>
  );
}
