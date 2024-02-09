import { Component, Input, OnInit } from '@angular/core';
import { Database, getDatabase, push, ref, set, update } from '@angular/fire/database';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ProjectElement } from 'src/app/shared/models/header/portfolio.dto';
import { ProjectDetail } from 'src/app/shared/models/header/portfolio.model';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent implements OnInit {
  @Input() selectedRow!: ProjectElement;

  projectNameLabel: string = 'Project Name';
  urlLabel: string = 'URL';
  descriptionLabel: string = 'Description';
  statusLabel: string = 'Project Status';

  projectStatuses: string[] = ['Completed', 'In Progress', 'Abandonded', 'Not Started'];
  selectedProjectStatus!: string | undefined

  addProjectForm!: FormGroup;

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder, private router: Router, private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@AddProject', 'AddProject');

    this.addProjectForm = this.formBuilder.group({
      projectName: [this.selectedRow ? this.selectedRow.projectName : '', Validators.required],
      url: [this.selectedRow ? this.selectedRow.url : '', Validators.required],
      projectStatus: [this.selectedRow ? this.selectedRow.projectStatus : '', Validators.required],
      description: [this.selectedRow ? this.selectedRow.projectDescription : '']
    });

    this.selectedProjectStatus = this.selectedRow ? this.selectedRow.projectStatus : undefined
  }

  get f(){ return this.addProjectForm.controls; }

  selectedStatus(event: MatAutocompleteSelectedEvent): void {
    this.selectedProjectStatus = event.option.value;
  }

  add() {
    const project: ProjectDetail = {
      projectName: this.f['projectName'].value,
      url: this.f['url'].value,
      projectDescription: this.f['description'].value,
      projectStatus: this.selectedProjectStatus ? this.selectedProjectStatus : ''
    }

    console.log(project);

    if (this.selectedRow) {
      this.firebaseService.updateProject(project, this.selectedRow.key);
    } else {
      this.firebaseService.saveProject(project);
      this.router.navigate(['admin', 'dashboard', 'projects']);
    }
  }

  delete() {
    this.firebaseService.deleteProject(this.selectedRow.key);
  }
}
