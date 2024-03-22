import { BreadcrumbService } from 'xng-breadcrumb';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';
import { ExperienceElement } from 'src/app/shared/models/header/portfolio.dto';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss'
})
export class ExperiencesComponent implements OnInit {
  experiences: ExperienceElement[] = [];
  displayedColumns: string[] = ['index', 'title', 'startDate', 'endDate', 'company'];
  selectedRow?: ExperienceElement;

  constructor(private firebaseService: FirebaseService, private breadcrumbService: BreadcrumbService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@Experiences', 'Experiences');
    const horizontalPos: MatSnackBarHorizontalPosition = 'end';
    const verticalPos: MatSnackBarVerticalPosition = 'bottom';

    this.firebaseService.getAllExperiences()
      .then((values) => {
        this.experiences = values;
      }).catch((error: Error) => {
        this.snackbar.open(error.message, 'Ok',
          {
            horizontalPosition: horizontalPos,
            verticalPosition: verticalPos,
            duration: 5000
          }
        );
      });
  }

  handleClick(experienceDetails: {rowData: ExperienceElement, event: Event}) {
    if (!this.selectedRow) {
      this.selectedRow = experienceDetails['rowData'];
    } else {
      this.selectedRow = undefined;
    }
  }
}
