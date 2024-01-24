import { Component, Input, OnInit } from '@angular/core';
import { Database, getDatabase, push, ref, set, update } from '@angular/fire/database';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ProjectElement } from 'src/app/shared/models/header/portfolio.dto';
import { ProjectDetail } from 'src/app/shared/models/header/portfolio.model';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent implements OnInit {
  @Input() selectedRow!: ProjectElement

  projectNameLabel: string = 'Project Name';
  urlLabel: string = 'URL';
  descriptionLabel: string = 'Description';
  statusLabel: string = 'Project Status';

  projectStatuses: string[] = ['Completed', 'In Progress', 'Abandonded', 'Not Started'];
  selectedProjectStatus!: string | undefined

  addProjectForm!: FormGroup;
  database: Database;

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder, private router: Router) {
    this.database = getDatabase();
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@AddProject', 'AddProject');

    this.addProjectForm = this.formBuilder.group({
      projectName: [this.selectedRow ? this.selectedRow.projectName : '', Validators.required],
      url: [this.selectedRow ? this.selectedRow.url : '', Validators.required],
      projectStatus: [this.selectedRow ? this.selectedRow.projectStatus : '', Validators.required],
      projectDescription: [this.selectedRow ? this.selectedRow.projectDescription : '']
    });

    this.selectedProjectStatus = this.selectedRow ? this.selectedRow.projectStatus : undefined
  }

  get f(){ return this.addProjectForm.controls; }

  selectedStatus(event: MatAutocompleteSelectedEvent): void {
    this.selectedProjectStatus = event.option.value;
  }

  registerProject() {
    const project: ProjectDetail = {
      projectName: this.f['projectName'].value,
      url: this.f['url'].value,
      projectDescription: this.f['projectDescription'].value,
      projectStatus: this.selectedProjectStatus ? this.selectedProjectStatus : ''
    }

    console.log(project);

    if (this.selectedRow) {
      update(ref(this.database, 'projects/' + this.selectedRow.key), project);
    } else {
      push(ref(this.database, 'projects'), project);
      this.router.navigate(['admin', 'dashboard', 'projects']);
    }
  }
}
