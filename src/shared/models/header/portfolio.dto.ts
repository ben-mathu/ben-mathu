export interface ProjectElement {
  index: number;
  key: string;
  projectName: string;
  url: string;
  projectDescription: string;
  projectStatus: string;
}

export interface ExperienceElement {
  index: number;
  key: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
  company: string;
  image: string;
  logoUrl: string;
}

export interface BlogElement {
  index: number;
  key: string;
  title: string;
  author: string;
  blog: string;
  tags: string[];
  dateCreated: string;
  dateUpdated: string;
}

export interface AchievementElement {
  index: number;
  key: string;
  name: string;
  url: string;
  description: string;
  dateCreated: string;
}

export interface CertificateElement {
  index: number;
  key: string;
  name: string;
  url: string;
  dateCreated: string;
}
