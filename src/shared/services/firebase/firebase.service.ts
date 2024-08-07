import { Injectable } from '@angular/core';
import { child, Database, get, onValue, push, ref, remove, set, update } from '@angular/fire/database';
import { AchievementDetails, BlogDetails, CertificateDetails, ExperienceDetails, ProjectDetail } from '../../models/header/portfolio.model';
import { AchievementElement, BlogElement, CertificateElement, ExperienceElement, ProjectElement } from '../../models/header/portfolio.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private database: Database, private http: HttpClient) {}

  getAllBlogs(): Promise<BlogElement[]> {
    return new Promise<BlogElement[]>((resolve, reject) => {
      onValue(ref(this.database, 'blogs'), (snapshot) => {
        const databaseVal = snapshot.val();

        let keys: string[] = []
        if (databaseVal) {
          keys = Object.keys(databaseVal);

          const b: BlogElement[] = [];
          for (let i = 0; i < keys.length; i++) {
            const blog: BlogElement = {
              index: i,
              key: keys[i],
              title: databaseVal[keys[i]].title,
              author: databaseVal[keys[i]].author,
              blog: databaseVal[keys[i]].blog,
              dateCreated: databaseVal[keys[i]].dataCreated,
              dateUpdated: databaseVal[keys[i]].dataUpdated,
              tags: databaseVal[keys[i]].tags
            };

            b.push(blog);
          }

          resolve(b);
        } else {
          reject(Error('No records forund in blogs'));
        }
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

  updateProjectDescription(key: string, value: string) {
    set(ref(this.database, 'projects/' + key + '/projectDescription'), value);
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
            contentUrl: databaseVal[keys[i]].contentUrl,
            type: databaseVal[keys[i]].type,
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
            image: databaseVal[keys[i]].image,
            logoUrl: databaseVal[keys[i]].logoUrl
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

  getProjectById(id: any): Promise<ProjectElement> {
    return new Promise<ProjectElement>((resolve, reject) => {
      onValue(ref(this.database, 'projects/' + id), (snapshot) => {
        resolve(snapshot.val());
      }, (error) => {
        reject(error.message);
      })
    })
  }

  getExperienceById(id: any): Promise<ExperienceElement> {
    return new Promise<ExperienceElement>((resolve, reject) => {
      onValue(ref(this.database, 'experiences/' + id), (snapshot) => {
        resolve(snapshot.val());
      }, (error) => {
        reject(error.message);
      })
    })
  }

  getAchievements(): Promise<AchievementElement[]> {
    return new Promise<AchievementElement[]>((resolve, reject) => {
      onValue(ref(this.database, 'achievements'), (snapshot) => {
        const databaseVal = snapshot.val();

        let keys: string[] = [];
        if (databaseVal) {
          keys = Object.keys(databaseVal);

          const a: AchievementElement[] = [];
          for (let i = 0; i < keys.length; i++) {
            const achievement: AchievementElement = {
              index: i,
              key: keys[i],
              name: databaseVal[keys[i]].name,
              description: databaseVal[keys[i]].description,
              dateCreated: databaseVal[keys[i]].dateCreated
            };

            a.push(achievement);
          }

          resolve(a);
        } else {
          reject(Error('Achievements not found!'));
        }
      }, (error) => {
        reject(error.message);
      });
    });
  }

  saveAchievement(achievement: AchievementDetails) {
    push(ref(this.database, 'achievements'), achievement);
  }

  updateAchievement(achievement: AchievementDetails, key: string) {
    update(ref(this.database, 'achievements/' + key), achievement);
  }

  deleteAchievement(key: string) {
    remove(ref(this.database, 'achievements/' + key));
  }

  getCertificates() {
    return new Promise<CertificateElement[]>((resolve, reject) => {
      onValue(ref(this.database, 'certificates'), (snapshot) => {
        const databaseVal = snapshot.val();

        let keys: string[] = [];
        if (databaseVal) {
          keys = Object.keys(databaseVal);

          const c: CertificateElement[] = [];
          for (let i = 0; i < keys.length; i++) {
            const achievement: CertificateElement = {
              index: i,
              key: keys[i],
              name: databaseVal[keys[i]].name,
              url: databaseVal[keys[i]].url,
              dateCreated: databaseVal[keys[i]].dateCreated
            };

            c.push(achievement);
          }

          resolve(c);
        } else {
          reject(Error('Certificates not found!'));
        }
      }, (error) => {
        reject(error.message);
      });
    });
  }

  deleteCertificate(key: string) {
    remove(ref(this.database, 'certificates/' + key));
  }

  updateCertificate(certificate: CertificateDetails, key: string) {
    update(ref(this.database, 'certificates/' + key), certificate);
  }

  saveCertificate(certificate: CertificateDetails) {
    push(ref(this.database, 'certificates'), certificate);
  }

  retrieveContent(url: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const options: Object = {
        headers: new HttpHeaders({ 'Accept': 'text/plain' }),
        responseType: 'text'
      }

      this.http.get<string>(url, options)
        .subscribe(data => resolve(data))
    });
  }
}
