import { Component, OnInit } from '@angular/core';
import { ExperienceElement, ProjectElement } from 'src/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-experience.full-width',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  experiences: ExperienceElement[] = [];
  yearsOfExperience: number = 0;

  projects: ProjectElement[] = [];
  className: string[] = [' tall', ' wide', ' long', ' big', ''];
  genClassName: string[] = [];
  numberOfProjects = 0;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private firebaseService: FirebaseService
  ) { }

  getYear(date: string): number {
    const formatter = new Intl.DateTimeFormat('en');
    return Number(formatter.formatToParts(new Date(date))[0].value);
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@Experience', 'Experience');

    this.firebaseService.getAllExperiences()
      .then((values) => {
        this.experiences = values

        let startYear = this.getYear(this.experiences[0].startDate);
        let endYear = this.getYear(this.experiences[0].endDate);
        this.experiences.map((experience) => {
          const tempStartYear = this.getYear(experience.startDate);
          if (tempStartYear < startYear) {
            startYear = tempStartYear;
          }

          const tempEndYear = this.getYear(experience.endDate);
          if (tempEndYear > endYear) {
            endYear = tempEndYear;
          }

          // shorten the words and add ellipsis
          const classStyleName = this.getClass();
          if (classStyleName === ' wide') {
            experience.description = experience.description.substring(0, 130) + '...';
          } else if (classStyleName === ' long') {
            experience.description = experience.description.substring(0, 130) + '...';
          } else if (classStyleName === ' big') {
            experience.description = experience.description.substring(0, 500) + '...';
          } else if (classStyleName === ' tall') {
            experience.description = experience.description.substring(0, 100) + '...';
          } else if (classStyleName === '') {
            experience.description = '...';
          }
          this.genClassName.push(classStyleName);
        });

        this.yearsOfExperience = endYear - startYear;
      }).catch((err: Error) => {
        // do nothing
      });

    this.firebaseService.getAllProjects()
      .then((values) => {
        this.projects = values;
        this.numberOfProjects = this.projects.length;
        this.projects.map((project) => {
          // shorten the words and add ellipsis
          const classStyleName = this.getClass();
          if (classStyleName === ' wide') {
            project.projectDescription = project.projectDescription.substring(0, 130) + '...';
          } else if (classStyleName === ' long') {
            project.projectDescription = project.projectDescription.substring(0, 130) + '...';
          } else if (classStyleName === ' big') {
            project.projectDescription = project.projectDescription.substring(0, 500) + '...';
          } else if (classStyleName === ' tall') {
            project.projectDescription = project.projectDescription.substring(0, 100) + '...';
          } else if (classStyleName === '') {
            project.projectDescription = '...';
          }
          this.genClassName.push(classStyleName);
        });
      }).catch((err: Error) => {
        // do nothing
      });
  }

  randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  getClass(): string {
    return this.className[this.randomIntFromInterval(0, this.className.length)];
  }
}
