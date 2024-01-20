import { Component, OnInit } from '@angular/core';
import { Database, getDatabase, push, ref, set } from '@angular/fire/database';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectDetail } from 'src/app/shared/models/header/project_details';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent implements OnInit {
  placeholder: string = 'Project Name';
  urlLabel: string = 'URL';
  descriptionLabel: string = 'Description';

  addProjectForm!: FormGroup;
  database: Database;

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder, private router: Router) {
    this.database = getDatabase()
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@AddProject', 'AddProject');

    this.addProjectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      url: ['', Validators.required],
      projectDescription: ['']
    });
  }

  get f(){ return this.addProjectForm.controls; }

  registerProject() {
    const project: ProjectDetail = {
      projectName: this.f['projectName'].value,
      url: this.f['url'].value,
      projectDescription: this.f['projectDescription'].value
    }

    push(ref(this.database, 'projects'), project);
    this.router.navigate(['admin', 'dashboard', 'projects']);
  }
}
