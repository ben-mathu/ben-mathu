import { Injectable } from '@angular/core';
import { child, Database, get, onValue, push, ref, remove, update } from '@angular/fire/database';
import { ExperienceDetails, ProjectDetail } from '../../models/header/portfolio.model';
import { ExperienceElement, ProjectElement } from '../../models/header/portfolio.dto';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private database: Database) {}

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

        const keys = Object.keys(databaseVal);

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
        reject(error.message);
      });
    });
  }

  getAllExperiences(): Promise<ExperienceElement[]> {
    return new Promise<ExperienceElement[]>((resolve, reject) => {
      onValue(ref(this.database, 'experiences'), (snapshot) => {
        const databaseVal = snapshot.val();

        const keys = Object.keys(databaseVal);

        const e: ExperienceElement[] = [];

        for (let i = 0; i < keys.length; i++) {
          const experience: ExperienceElement = {
            index: i,
            key: keys[i],
            title: databaseVal[keys[i]].projectName,
            startDate: databaseVal[keys[i]].url,
            endDate: databaseVal[keys[i]].projectDescription,
            description: databaseVal[keys[i]].projectStatus,
            skills: databaseVal[keys[i]].skills,
            company: databaseVal[keys[i]].company
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
