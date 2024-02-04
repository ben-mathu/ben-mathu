import { BreadcrumbService } from 'xng-breadcrumb';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';
import { ExperienceElement } from 'src/app/shared/models/header/portfolio.dto';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss'
})
export class ExperiencesComponent implements OnInit {
  experiences: ExperienceElement[] = [];
  displayedColumns: string[] = ['index', 'title', 'startDate', 'endDate', 'company'];
  selectedRow!: ExperienceElement

  constructor(private firebaseService: FirebaseService, private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@Experiences', 'Experiences');

    this.firebaseService.getAllExperiences()
      .then((values) => {
        this.experiences = values;
      });
  }

  handleClick(experienceDetails: {rowData: ExperienceElement, event: Event}) {
    this.selectedRow = experienceDetails['rowData'];
  }
}
