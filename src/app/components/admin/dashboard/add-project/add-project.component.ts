import { Component, Input, OnInit } from '@angular/core';
import {
  Database,
  getDatabase,
  push,
  ref,
  set,
  update,
} from '@angular/fire/database';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ProjectElement } from 'src/shared/models/header/portfolio.dto';
import { ProjectDetail } from 'src/shared/models/header/portfolio.model';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';
import { showSnackBar } from 'src/shared/utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
})
export class AddProjectComponent implements OnInit {
  @Input() selectedRow!: ProjectElement;

  projectNameLabel: string = 'Project Name';
  urlLabel: string = 'URL';
  descriptionLabel: string = 'Description';
  statusLabel: string = 'Project Status';
  textChanged: string = '';

  projectStatuses: string[] = [
    'Completed',
    'In Progress',
    'Abandonded',
    'Not Started',
  ];
  selectedProjectStatus!: string | undefined;

  addProjectForm!: FormGroup;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private formBuilder: FormBuilder,
    private router: Router,
    private firebaseService: FirebaseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@AddProject', 'Add Project');

    this.addProjectForm = this.formBuilder.group({
      projectName: [
        this.selectedRow ? this.selectedRow.projectName : '',
        Validators.required,
      ],
      url: [this.selectedRow ? this.selectedRow.url : '', Validators.required],
      projectStatus: [
        this.selectedRow ? this.selectedRow.projectStatus : '',
        Validators.required,
      ],
      text: [this.selectedRow ? this.selectedRow.projectDescription : ''],
    });

    this.selectedProjectStatus = this.selectedRow
      ? this.selectedRow.projectStatus
      : undefined;
  }

  get f() {
    return this.addProjectForm.controls;
  }

  selectedStatus(event: MatAutocompleteSelectedEvent): void {
    this.selectedProjectStatus = event.option.value;
  }

  add() {
    try {
      const project: ProjectDetail = {
        projectName: this.f['projectName'].value,
        url: this.f['url'].value,
        projectDescription: this.f['text'].value,
        projectStatus: this.selectedProjectStatus
          ? this.selectedProjectStatus
          : '',
      };

      if (this.selectedRow) {
        this.firebaseService.updateProject(project, this.selectedRow.key);
      } else {
        this.firebaseService.saveProject(project);
        this.router.navigate(['admin', 'dashboard', 'projects']);
      }
    } catch (error) {
      showSnackBar('All Fields are Required', this.snackBar);
    }
  }

  delete() {
    this.firebaseService.deleteProject(this.selectedRow.key);
  }
}
