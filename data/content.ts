import { PersonalInfo, Project, Experience, Education, Event, Community } from './types';

export const personalInfo: PersonalInfo = {
  name: "matilda glynn-henley",
  title: "building things · london",
  email: "matildaglynnh @ gmail dot com",
  bio: [
    "I like building things. At the moment that's Sonata Labs (https://github.com/mglynnhenley/sonata-labs) — an open-source benchmark that clones a company into a fake Gmail, Slack and Calendar, runs an agent through a simulated workday inside it, and scores how much of the job it finished. The work is funded by a Coefficient Giving (previously Open Philanthropy) grant.",
    "Before this I founded Parlia AI (a planning-policy tool), ran Pluto House (a hacker house in Paris), invested in pre-seed AI companies at Merantix Capital, and worked as a software engineer. I studied computer science at Oxford. I live in London.",
    "If you're building something, say hello: matildaglynnh @ gmail dot com. I'm also on GitHub (https://github.com/mglynnhenley) and LinkedIn (https://linkedin.com/in/matilda-glynn-henley)."
  ]
};

export const currentProjects: Project[] = [
  {
    title: "Sonata Labs",
    description: "Open-source agent benchmark: clone a company into a fake Gmail, Slack and Calendar, run your agent through a simulated workday, score how much of the job it finished",
    link: "https://github.com/mglynnhenley/sonata-labs"
  },
  {
    title: "Pre-Deployment Simulation Environments",
    description: "Concept paper for a nonprofit testing agents in simulated environments before deployment",
    link: "https://docs.google.com/document/d/1rIUe5sWnVDDZebhne4jUJp7ChxYvzJ1VNQbflD4dVIM/edit?tab=t.ljwlxdm9ves1#heading=h.slhhex8dl7ti"
  },
  {
    title: "Linear Probes for Inference-Time Monitoring",
    description: "A trained factuality probe on model activations, and a concept paper written with Sam Dower",
    link: "https://docs.google.com/document/d/1YGvJYVKbUn8_m6Is-7j9kk3lUIleqGICzeIgzG1rJM0/edit?usp=sharing"
  }
];

export const education: Education[] = [
  {
    title: "BA Computer Science",
    institution: "University of Oxford, Balliol College",
    period: "2019 – 2023",
    description: "Machine learning, AI, data visualisation, algorithms; final-year project on smart contracts for food cooperatives (Solidity)"
  },
  {
    title: "ARENA 8.0",
    institution: "Alignment Research Engineer Accelerator",
    period: "June – July 2026",
    description: "Five-week course in mechanistic interpretability, alignment evaluations and reinforcement learning"
  },
  {
    title: "AGI Strategy Course",
    institution: "Bluedot Impact",
    period: "Nov – Dec 2025",
    description: "AI safety policy, governance and technical mitigation"
  }
];

export const pastProjects: Project[] = [
  {
    title: "Linear Probes Training Pipeline (Python, vLLM)",
    description: "Training pipeline for a factuality probe on model activations",
    link: "https://github.com/mglynnhenley/probe-demo"
  },
  {
    title: "OnFabric Generative Interfaces",
    description: "Agentic generative interface on top of OnFabric MCP",
    link: "https://github.com/mglynnhenley/onfabric-demo"
  },
  {
    title: "LinkedIn Screener Bot (Python)",
    description: "LinkedIn profile screening bot for Slack",
    link: "https://github.com/mglynnhenley/linkedin-screener-bot"
  },
  {
    title: "Investment Memo Generator (Python, Langchain)",
    description: "Agentic workflow for generating investment memos",
    link: "https://github.com/mglynnhenley/deal_evaluator"
  },
  {
    title: "Data Visualization (JavaScript, D3.js)",
    description: "Visualising female headliners at UK music festivals",
    link: "https://femaleheadlinersatukmusicfestival.netlify.app/"
  },
  {
    title: "Smart Contracts for Food Cooperatives (Solidity)",
    description: "Oxford final-year project: food cooperative governance on the blockchain",
    link: "https://github.com/mglynnhenley/foodCooperativeOnBlockchain"
  },
  {
    title: "Legal Front-End User Flow & Portal (React, TypeScript, Next.js, Java)",
    description: "Customer-facing flow and internal portal for legal case management",
    link: "https://flow-st.fine.so/en/gambling/desktop"
  },
  {
    title: "Turtle Charity Mobile App (React Native, TypeScript, Express, MS SQL Server)",
    description: "Full-stack charity app with backend and database integration"
  },
  {
    title: "Tinder Scraper for Oxford Hack (Python, TypeScript, React)",
    description: "A bot to match Tinder profiles with Facebook's Ox-love page (not submitted due to regulations)"
  },
  {
    title: "ML to detect hidden messages in SVGs (Python - scikit-learn)",
    description: "Steganography detection model, built during a summer at GCHQ"
  },
  {
    title: "Python Module for Distributed Music Playback (Python, C++)",
    description: "Synchronous music playback across Raspberry Pi devices",
    link: "https://github.com/mglynnhenley/asynchronousSingingMicrobits"
  },
  {
    title: "Legal News Website (Next.js, React, TypeScript)",
    description: "Blog platform with prefix-tree search, cached favourites and email validation",
    link: "https://github.com/mglynnhenley/legalNews"
  },
];

export const hackathons: Project[] = [
  {
    title: "project lovable",
    description: "AI project management and collaboration tool"
  },
  {
    title: "ef x eleven labs",
    description: "Voice AI application, built at the Entrepreneur First x Eleven Labs hackathon"
  },
  {
    title: "AI Find",
    description: "AI search and discovery tool"
  },
  {
    title: "chatbots aren't dead",
    description: "Experimental conversational interface"
  }
];

export const experiences: Experience[] = [
  {
    title: "Building Sonata Labs",
    company: "Coefficient Giving grant",
    period: "June 2026 – Present",
    description: "Six months of funding to work on AI safety full-time; building an open-source agent benchmark"
  },
  {
    title: "Founder",
    company: "Parlia AI",
    period: "March 2024 – Jan 2025",
    description: "Planning-policy tool for housebuilders: vector database of local government policy, RAG retrieval, LLM evaluation framework; funded by the German Federal Ministry for Economic Affairs and Energy"
  },
  {
    title: "VC Investor",
    company: "Merantix Capital",
    period: "April 2025 – June 2026",
    description: "Led two pre-seed investments (Droidrun, Outpost Bio); built the fund's internal AI tooling; ran Pluto House, a one-month Paris hacker house"
  },
  {
    title: "Visiting Analyst",
    company: "Merantix Capital",
    period: "April – Nov 2024",
    description: "Worked on the fund's first external investment from screening to IC; left to found Parlia"
  },
  {
    title: "Software Developer",
    company: "Fine Legal",
    period: "Nov 2023 – April 2024",
    description: "Consumer-rights platform features (React/TypeScript, Java)"
  },
  {
    title: "Previous Roles",
    company: "Softwire, GCHQ",
    period: "2020 – 2022",
    description: "Softwire (greenfield React Native app with a TypeScript/Express backend), GCHQ (ML steganography detection)"
  }
];

export const pastEvents: Event[] = [
  {
    title: "AI Safety as a Startup",
    link: "https://luma.com/9ojkftsu"
  },
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
    description: "Community of technical women working in startups in London",
    link: "https://threecourses.xyz"
  },
  {
    title: "START Berlin Female Mentorship",
    description: "Mentorship programme connecting founders and VCs to female students"
  },
  {
    title: "Oxford Women in CS Society",
    description: "Ran the undergraduate side: invite-only dinners and study sessions"
  },
];
