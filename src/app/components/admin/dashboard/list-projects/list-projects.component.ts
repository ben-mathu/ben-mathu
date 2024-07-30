import { Component, OnInit } from '@angular/core';
import { Database, getDatabase, onValue, ref } from '@angular/fire/database';
import { ProjectElement } from 'src/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { showSnackBar } from 'src/shared/utils/utils';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.scss'
})
export class ListProjectsComponent implements OnInit {
  projects: ProjectElement[] = [];
  displayedColumns: string[] = ['index', 'projectName', 'url'];
  selectedRow?: ProjectElement;

  constructor(private breadcrumbService: BreadcrumbService, private firebaseService: FirebaseService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@Projects', 'Projects');

    this.getProjects()
  }

  getProjects() {
    this.firebaseService.getAllProjects()
      .then((values) => {
        this.projects = values;
        this.displayedColumns.push('projectDescription');
      }).catch((error: Error) => {
        showSnackBar(error.message, this.snackbar);
      });
  }

  onDelete() {
    this.getProjects();
    this.selectedRow = undefined;
  }

  handleClick(projectDetails: {rowData: ProjectElement, event: Event}) {
    if (!this.selectedRow || projectDetails['rowData'].index !== this.selectedRow.index) {
      this.selectedRow = projectDetails['rowData'];
      this.displayedColumns = this.displayedColumns.filter((item) => {
        return item !== 'projectDescription';
      });
    } else {
      this.selectedRow = undefined;
      this.displayedColumns.push('projectDescription');
    }
  }
}
