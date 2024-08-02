import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ProjectElement } from 'src/shared/models/header/portfolio.dto';
import { ProjectDetail } from 'src/shared/models/header/portfolio.model';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';
import { Utils } from 'src/shared/utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
})
export class AddProjectComponent implements OnInit {
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  private _selectedRow: ProjectElement | undefined;

  @Input() set selectedRow(value: ProjectElement) {
    this._selectedRow = value;

    if (this.addProjectForm) {
      this.addProjectForm.patchValue({
        projectName: value.projectName,
        url: value.url,
        contentUrl: value.contentUrl,
        text: value.projectDescription,
      });

      if (this.isDisabled())
        this.addProjectForm.get('contentUrl')?.disable();
      else this.addProjectForm.get('contentUrl')?.enable();
    }

    this.selectedProjectStatus = value.projectStatus;
    this.selectedProjectType = value.type;
    // if (value.contentUrl)
    //   this.retrieveContent(value.contentUrl);
    // else {
    //   this.contentFromUrl = value.projectDescription;
    //   console.log('setting content with description')
    // }
  }

  get selectedRow(): ProjectElement | undefined {
    return this._selectedRow;
  }

  projectNameLabel: string = 'Project Name';
  urlLabel: string = 'URL';
  descriptionLabel: string = 'Description';
  statusLabel: string = 'Project Status';
  contentUrlLabel: string = 'Content Description URL';
  typeLabel: string = 'Type';
  textChanged: string = '';
  contentFromUrl: string = '';

  projectStatuses: string[] = [
    'Completed',
    'In Progress',
    'Abandonded',
    'Not Started',
  ];
  selectedProjectStatus!: string | undefined;

  projectTypes: string[] = ['Project', 'Tool'];
  selectedProjectType?: string | undefined;

  addProjectForm!: FormGroup;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private formBuilder: FormBuilder,
    private router: Router,
    private firebaseService: FirebaseService,
    private snackBar: MatSnackBar,
    private util: Utils
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@AddProject', 'Add Project');

    this.addProjectForm = this.formBuilder.group({
      contentUrl: [ this.selectedRow ? this.selectedRow.contentUrl : ''],
      text: [ this.selectedRow ? this.selectedRow.projectDescription : '' ],
      type: [ '' ],
      projectName: [ this.selectedRow ? this.selectedRow.projectName : '', Validators.required ],
      url: [ this.selectedRow ? this.selectedRow.url : '', Validators.required ],
      projectStatus: [ '', Validators.required ],
    });

    if (this.isDisabled())
      this.addProjectForm.get('contentUrl')?.disable();
    else this.addProjectForm.get('contentUrl')?.enable();

    this.selectedProjectStatus = this.selectedRow
      ? this.selectedRow.projectStatus
      : undefined;

    this.selectedProjectType = this.selectedRow
      ? this.selectedRow.type
      : undefined;
  }

  isDisabled(): boolean {
    return (!this.selectedRow?.contentUrl && this.selectedRow?.projectDescription !== undefined);
  }

  get f() {
    return this.addProjectForm.controls;
  }

  selectedStatus(event: MatAutocompleteSelectedEvent): void {
    this.selectedProjectStatus = event.option.value;
  }

  selectedType(event: MatAutocompleteSelectedEvent): void {
    this.selectedProjectType = event.option.value;
  }

  add() {
    try {
      const project: ProjectDetail = {
        projectName: this.f['projectName'].value,
        url: this.f['url'].value,
        contentUrl: this.f['contentUrl'].value,
        projectDescription: this.f['text'].value,
        type: this.selectedProjectType ? this.selectedProjectType : '',
        projectStatus: this.selectedProjectStatus ? this.selectedProjectStatus : '',
      };

      if (this.selectedRow) {
        this.firebaseService.updateProject(project, this.selectedRow.key);
        this.util.showSnackBar('Successfully updated', this.snackBar);
      } else {
        this.firebaseService.saveProject(project);
        this.router.navigate(['admin', 'dashboard', 'projects']);
        this.util.showSnackBar('Successfully saved', this.snackBar);
      }
    } catch (error) {
      this.util.showSnackBar('All Fields are Required', this.snackBar);
      console.log(error);
    }
  }

  delete() {
    this.firebaseService.deleteProject(this.selectedRow!.key);
    this.onDelete.emit();
  }

  retrieveContent(url: string | undefined = undefined) {
    this.firebaseService
      .retrieveContent(url ? url : this.f['contentUrl'].value)
      .then((value) => {
        if (!this.selectedRow) {
          this.contentFromUrl = value;
        } else if (this.selectedRow.projectDescription === '') {
          this.contentFromUrl = value;
        } else {
          // Update project description
          this.contentFromUrl = value;
          if (value !== this.selectedRow!.projectDescription) {
            this.firebaseService.updateProjectDescription(
              this.selectedRow!.key,
              value
            );
          }
        }
      });
  }
}
