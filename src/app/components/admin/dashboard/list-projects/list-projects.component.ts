import { Component, OnInit } from '@angular/core';
import { Database, getDatabase, onValue, ref } from '@angular/fire/database';
import { ProjectElement } from 'src/app/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.scss'
})
export class ListProjectsComponent implements OnInit {
  projects: ProjectElement[] = [];
  displayedColumns: string[] = ['index', 'projectName', 'url', 'projectDescription'];
  selectedRow!: ProjectElement;

  constructor(private breadcrumbService: BreadcrumbService, private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@Projects', 'Projects');

    this.firebaseService.getAllProjects()
      .then((value) => {
        this.projects = value;
      })
  }

  handleClick(pojectDetails: {rowData: ProjectElement, event: Event}) {
    this.selectedRow = pojectDetails['rowData'];
  }
}
