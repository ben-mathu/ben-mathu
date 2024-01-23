import { Component, OnInit } from '@angular/core';
import { Database, getDatabase, onValue, ref } from '@angular/fire/database';
import { ProjectDetail } from 'src/app/shared/models/header/project_details';
import { BreadcrumbService } from 'xng-breadcrumb';

export interface ProjectElement {
  index: number;
  key: string;
  projectName: string;
  url: string;
  projectDescription: string;
  projectStatus: string;
}

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.scss'
})
export class ListProjectsComponent implements OnInit {
  database: Database;
  projects: ProjectElement[] = [];
  displayedColumns: string[] = ['index', 'projectName', 'url', 'projectDescription'];
  selectedRow!: ProjectElement;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.database = getDatabase()
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@Projects', 'Projects');

    const projectRef = ref(this.database, 'projects');
    onValue(projectRef, (snapshot) => {
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

      this.projects = p;
    });
  }

  handleClick(pojectDetails: {rowData: ProjectElement, event: Event}) {
    this.selectedRow = pojectDetails['rowData'];
  }
}
