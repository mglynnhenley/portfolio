import { PersonalInfo, Project, Experience, Event, Community } from './types';

export const personalInfo: PersonalInfo = {
  name: "matilda glynn-henley",
  title: "investor @ merantix",
  email: "matilda @ merantix dot com",
  bio: [
    "I'm a pre-seed VC at Merantix Capital where we invest at the AI Application layer (check it out here https://www.merantix-capital.com/). Previously I founded a company using AI to solve the housing crisis and was a software engineer. I studied CS at Oxford.",
    "If you are building something cool my (work) email is matilda @ merantix dot com."
  ]
};

export const currentProjects: Project[] = [
  {
    title: "OnFabric Generative Interfaces",
    description: "Building agentic generative interface on top of OnFabric MCP",
    link: "https://github.com/mglynnhenley/onfabric-demo"
  },
  {
    title: "Pluto Hacker House",
    description: "Living in Paris and running operations @ pluto",
    link: "https://joinpluto.io"
  },
  {
    title: "Blue Dot dot AGI Strategy",
    description: "Exploring AI Control Defenses"
  }
];

export const pastProjects: Project[] = [
  {
    title: "Data Visualization (JavaScript, D3.js)",
    description: "Created a front-end project visualising female headliners at UK music festivals",
    link: "https://femaleheadlinersatukmusicfestival.netlify.app/"
  },
  {
    title: "Investment Memo Generator (Python, Langchain)",
    description: "Agentic workflow for generating investment memos",
    link: "https://github.com/mglynnhenley/deal_evaluator"
  },
  {
    title: "Legal Front-End User Flow & Portal (React, TypeScript, Next.js, Java)",
    description: "User-friendly front-end flow and internal portal for legal case management",
    link: "https://flow-st.fine.so/en/gambling/desktop"
  },
  {
    title: "Turtle Charity Mobile App (React Native, TypeScript, Express, MS SQL Server)",
    description: "Built a full-stack charity app with backend and database integration"
  },
  {
    title: "Tinder Scraper for Oxford Hack (Python, TypeScript, React)",
    description: "Built a bot to match Tinder profiles with Facebook's Ox-love page (Not submitted due to regulations)"
  },
  {
    title: "ML to detect hidden messages in SVGs (Python - scikit-learn)",
    description: "Developed a Python tool for detecting hidden messages in images"
  },
  {
    title: "Python Module for Distributed Music Playback (Python, C++)",
    description: "Developed a module for synchronous music playback across Raspberry Pi devices",
    link: "https://github.com/mglynnhenley/asynchronousSingingMicrobits"
  },
  {
    title: "Legal News Website (Next.js, React, TypeScript)",
    description: "Built a blog platform with search (prefix search tree for linear time complexity), cached favourites, and email validation",
    link: "https://github.com/mglynnhenley/legalNews"
  },
];

export const hackathons: Project[] = [
  {
    title: "project lovable",
    description: "AI-powered project management and collaboration tool built at hackathon",
    link: "https://github.com"
  },
  {
    title: "ef x eleven labs",
    description: "Voice AI application developed at Entrepreneur First x Eleven Labs hackathon",
    link: "https://github.com"
  },
  {
    title: "AI Find",
    description: "Intelligent search and discovery tool leveraging AI for enhanced information retrieval",
    link: "https://github.com"
  },
  {
    title: "chatbots aren't dead",
    description: "Experimental conversational AI interface exploring next-generation chat experiences",
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
    description: "AI planning policy tool; secured EXIST funding"
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

export const communities: Community[] = [
  {
    title: "threecourses.xyz",
    description: "VC backed invite only community of technical women working in startups in London",
    link: "https://threecourses.xyz"
  },
  {
    title: "Founder of START Berlin Female Mentorship",
    description: "connecting 15 founders and VCs to female students"
  },
];
