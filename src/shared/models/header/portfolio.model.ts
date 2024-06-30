export interface ProjectDetail {
  projectName: string;
  url: string;
  projectDescription: string;
  projectStatus: string
}

export interface ExperienceDetails {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
  company: string;
  logoUrl: string;
}

export interface BlogDetails {
  title: string;
  author: string;
  blog: string;
  tags: string[];
  dateCreated: string;
  dateUpdated: string;
}
