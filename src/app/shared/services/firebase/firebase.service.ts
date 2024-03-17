import { Injectable } from '@angular/core';
import { child, Database, get, onValue, push, ref, remove, update } from '@angular/fire/database';
import { BlogDetails, ExperienceDetails, ProjectDetail } from '../../models/header/portfolio.model';
import { BlogElement, ExperienceElement, ProjectElement } from '../../models/header/portfolio.dto';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private database: Database) {}

  getAllBlogs(): Promise<BlogElement[]> {
    return new Promise<BlogElement[]>((resolve, reject) => {
      onValue(ref(this.database, 'blogs'), (snapshot) => {
        const databaseVal = snapshot.val();

        let keys: string[] = []
        if (databaseVal) {
          keys = Object.keys(databaseVal);
        } else {
          reject(Error("No records were found for blogs"));
        }

        const b: BlogElement[] = [];
        for (let i = 0; i < keys.length; i++) {
          const blog: BlogElement = {
            index: i,
            key: keys[i],
            blog: databaseVal[keys[i]].blog,
            dateCreated: databaseVal[keys[i]].dataCreated,
            dateUpdated: databaseVal[keys[i]].dataUpdated,
            tags: databaseVal[keys[i]].tags
          }

          b.push(blog);
        }

        resolve(b);
      }, (error) => {
        reject(error.message);
      });
    });
  }

  saveBlog(blog: BlogDetails) {
    push(ref(this.database, 'blogs'), blog);
  }

  updateBlog(blog: BlogDetails, key: string) {
    update(ref(this.database, 'blogs/' + key), blog);
  }

  deleteBlog(key: string) {
    remove(ref(this.database, 'blog/' + key));
  }

  getHeader(): Promise<any> {
    const headerRef = ref(this.database);
    return get(child(headerRef, 'header'));
  }

  saveExperience(experience: ExperienceDetails) {
    push(ref(this.database, 'experiences'), experience);
  }

  updateExperience(experience: ExperienceDetails, key: string) {
    update(ref(this.database, 'experiences/' + key), experience);
  }

  saveProject(project: ProjectDetail) {
    push(ref(this.database, 'projects'), project);
  }

  updateProject(project: ProjectDetail, key: string) {
    update(ref(this.database, 'projects/' + key), project);
  }

  deleteProject(key: string) {
    remove(ref(this.database, 'projects/' + key));
  }

  deleteExperience(key: string) {
    remove(ref(this.database, 'experiences/' + key));
  }

  getAllProjects(): Promise<ProjectElement[]> {
    return new Promise<ProjectElement[]>((resolve, reject) => {
      onValue(ref(this.database, 'projects'), (snapshot) => {
        const databaseVal = snapshot.val();

        let keys: string[] = [];
        if (databaseVal) {
          keys = Object.keys(databaseVal);
        } else {
          reject(Error("No records in Projects"));
        }

        const p: ProjectElement[] = [];

        for (let i = 0; i < keys.length; i++) {
          const project: ProjectElement = {
            index: i,
            key: keys[i],
            projectName: databaseVal[keys[i]].projectName,
            url: databaseVal[keys[i]].url,
            projectDescription: databaseVal[keys[i]].projectDescription,
            projectStatus: databaseVal[keys[i]].projectStatus ? databaseVal[keys[i]].projectStatus : ''
          }

          p.push(
            project
          );
        }

        resolve(p);
      }, (error) => {
        reject(error);
      });
    });
  }

  getAllExperiences(): Promise<ExperienceElement[]> {
    return new Promise<ExperienceElement[]>((resolve, reject) => {
      onValue(ref(this.database, 'experiences'), (snapshot) => {
        const databaseVal = snapshot.val();

        let keys: string[] = [];
        if (databaseVal) {
          keys = Object.keys(databaseVal);
        } else {
          reject(Error("No records in Experiences"));
        }

        const e: ExperienceElement[] = [];

        for (let i = 0; i < keys.length; i++) {
          const experience: ExperienceElement = {
            index: i,
            key: keys[i],
            title: databaseVal[keys[i]].title,
            startDate: databaseVal[keys[i]].startDate,
            endDate: databaseVal[keys[i]].endDate,
            description: databaseVal[keys[i]].description,
            skills: databaseVal[keys[i]].skills,
            company: databaseVal[keys[i]].company,
            image: databaseVal[keys[i]].image
          }

          e.push(
            experience
          );
        }

        resolve(e);
      }, (error) => {
        reject(error.message);
      });
    });
  }
}
