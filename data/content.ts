import { PersonalInfo, Project, Experience, Event } from './types';

export const personalInfo: PersonalInfo = {
  name: "matilda glynn-henley",
  title: "investor @ merantix",
  email: "matilda @ merantix dot com",
  bio: [
    "I'm a pre-seed VC at Merantix Capital where we invest at the AI Application layer (check it out here). Previously I founded a company using AI to solve the housing crisis and was a software engineer. I studied CS at Oxford.",
    "If you are building something cool my (work) email is matilda @ merantix dot com."
  ]
};

export const currentProjects: Project[] = [
  {
    title: "threecourses.xyz",
    description: "VC backed invite only community of technical women working in startups in London",
    link: "https://threecourses.xyz"
  },
  {
    title: "OnFabric MCP",
    description: "Building agentic generative interface on top of OnFabric MCP"
  },
  {
    title: "highlighting knowledge project",
    description: "personal knowledge graph based on what you read",
    link: "https://github.com"
  },
  {
    title: "blue dot impact course",
    description: "blue dot impact course"
  }
];

export const pastProjects: Project[] = [
  {
    title: "START Berlin Female Mentorship",
    description: "connecting 15 founders and VCs to female students"
  },
  {
    title: "public affairs newsletter",
    description: "public affairs newsletter"
  },
  {
    title: "data visualisation",
    description: "data visualisation"
  },
  {
    title: "oxford hack project",
    description: "oxford hack project"
  }
];

export const hackathons: Project[] = [
  {
    title: "project lovable",
    link: "https://github.com"
  },
  {
    title: "ef x eleven labs",
    link: "https://github.com"
  },
  {
    title: "AI Find",
    link: "https://github.com"
  },
  {
    title: "chatbots aren't dead",
    link: "https://github.com"
  }
];

export const experiences: Experience[] = [
  {
    title: "Founding Investor",
    company: "Merantix Capital",
    period: "April 2025 - Present",
    description: "Sourced and closed €6M+ across pre-seed AI startups; built internal AI evaluation tools"
  },
  {
    title: "Founder",
    company: "Parlia AI",
    period: "March 2024 - 2025",
    description: "AI planning policy tool; YC interview stage, secured EXIST funding"
  },
  {
    title: "Software Developer",
    company: "Fine Legal",
    period: "Nov 2023 – April 2024",
    description: "Built customer-facing features (React/TypeScript, Java)"
  },
  {
    title: "Previous Roles",
    company: "Softwire, GCHQ",
    period: "2022 - 2023",
    description: "Softwire (Software Dev Intern), GCHQ (Cyber Security Intern)"
  }
];

export const pastEvents: Event[] = [
  {
    title: "AI Open Source",
    link: "https://lu.ma"
  },
  {
    title: "Modelling Molecules",
    link: "https://lu.ma"
  },
  {
    title: "builders and co",
    link: "https://lu.ma"
  }
];
