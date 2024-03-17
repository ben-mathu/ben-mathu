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
}

export interface BlogElement {
  index: number;
  key: string;
  blog: string;
  tags: string[];
  dateCreated: string;
  dateUpdated: string;
}
