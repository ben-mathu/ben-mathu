import { BreadcrumbService } from 'xng-breadcrumb';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';
import { ExperienceElement } from 'src/shared/models/header/portfolio.dto';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { showSnackBar } from 'src/shared/utils/utils';

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
        showSnackBar(error.message, this.snackbar);
      });
  }

  handleClick(experienceDetails: {rowData: ExperienceElement, event: Event}) {
    if (!this.selectedRow || experienceDetails['rowData'].index !== this.selectedRow.index) {
      this.selectedRow = experienceDetails['rowData'];
    } else {
      this.selectedRow = undefined;
    }
  }
}
