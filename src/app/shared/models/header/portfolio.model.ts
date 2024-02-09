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
}

export interface BlogDetails {
  blog: string;
  tags: string[];
  dateCreated: string;
  dateUpdated: string;
}
