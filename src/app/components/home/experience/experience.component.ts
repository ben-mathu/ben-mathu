import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExperienceElement, ProjectElement } from 'src/app/shared/models/header/portfolio.dto';
import { ExperienceDetails } from 'src/app/shared/models/header/portfolio.model';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
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

  constructor(
    private breadcrumbService: BreadcrumbService,
    private firebaseService: FirebaseService,
    private snackbar: MatSnackBar
  ) { }

  getYear(date: string): number {
    const options: Intl.DateTimeFormatOptions[] = [{year: "numeric"}, {month: "2-digit"}, {day: "2-digit"}];

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
        });

        this.yearsOfExperience = endYear - startYear;
      }).catch((err: Error) => {
        // do nothing
      });

    this.firebaseService.getAllProjects()
      .then((values) => {
        this.projects = values
      }).catch((err: Error) => {
        // do nothing
      });
  }
}
