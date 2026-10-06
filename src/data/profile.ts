export interface ProjectItem {
  name: string;
  technologies: string[];
  highlights: string[];
  link?: string;
  role?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  keyResponsibilities?: string[];
  keyContributions?: string[];
  projects: ProjectItem[];
}

export interface FullstackProject {
  name: string;
  role: string;
  technologies: string[];
  highlights: string[];
  link?: string;
  category?: string;
}

export interface ProfileData {
  personalInfo: {
    name: string;
    title: string;
    location: {
      city: string;
      region: string;
      country: string;
      raw: string;
    };
    phone: string;
    email: string;
  };
  summary: string;
  technicalSkills: {
    coreTechnologies: string[];
    frontendDevelopment: string[];
    frontendEngineering: string[];
    backendDevelopment: string[];
    database: string[];
    realTimeAndIntegrations: string[];
    mobileDevelopment: string[];
    developmentAndDevopsTools: string[];
    engineeringPractices: string[];
  };
  professionalExperience: ExperienceItem[];
  selectedFullstackProjects: FullstackProject[];
  additionalProjectExperience: {
    name: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
    gpa?: string;
  }[];
  languages: {
    language: string;
    proficiency: string;
  }[];
}

import profileJson from "../../profile.json";

export const profileData: ProfileData = profileJson as ProfileData;
