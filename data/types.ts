export interface Project {
  title: string;
  description: string;
  link?: string;
  tags?: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Event {
  title: string;
  link?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  bio: string[];
}

export interface Community {
  title: string;
  description: string;
  link?: string;
}
