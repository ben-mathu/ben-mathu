import { Component, OnInit } from '@angular/core';
import { Database, getDatabase, onValue, ref } from '@angular/fire/database';
import { ProjectDetail } from 'src/app/shared/models/header/project_details';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.scss'
})
export class ListProjectsComponent implements OnInit {
  database: Database;
  projects: ProjectDetail[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.database = getDatabase()
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@Projects', 'Projects');

    const projectRef = ref(this.database, 'projects');
    onValue(projectRef, (snapshot) => {
      this.projects = snapshot.val();
    });
  }
}
