import { BreadcrumbService } from 'xng-breadcrumb';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Database, getDatabase, push, ref, update } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExperienceElement } from 'src/shared/models/header/portfolio.dto';
import { ExperienceDetails } from 'src/shared/models/header/portfolio.model';
import { MatChipEditedEvent } from '@angular/material/chips';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { formatDate } from '@angular/common';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrl: './add-experience.component.scss'
})
export class AddExperienceComponent implements OnInit {
  @Input() selectedRow!: ExperienceElement;

  addExperienceForm!: FormGroup;

  skillList: string[] = [];

  titleLabel: string = 'Title';
  startDateLabel: string = 'Start Date';
  endDateLabel: string = 'End Date';
  skillsLabel: string = 'Skills';
  descriptionLabel: string = 'Description';
  companyLabel: string = 'Company';
  logoUrlLabel: string = 'Logo Url';

  constructor(private formBuilder: FormBuilder, private router: Router, private firebaseService: FirebaseService, private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@AddExperience', 'Add Experience');

    this.addExperienceForm = this.formBuilder.group({
      title: [this.selectedRow ? this.selectedRow.title : '', Validators.required],
      startDate: [this.selectedRow ? this.selectedRow.startDate : '', Validators.required],
      endDate: [this.selectedRow ? this.selectedRow.endDate : '', Validators.required],
      text: [this.selectedRow ? this.selectedRow.description : ''],
      company: [this.selectedRow ? this.selectedRow.company : '', Validators.required],
      skills: [''],
      logoUrl: [this.selectedRow ? this.selectedRow.logoUrl : '']
    });

    this.skillList = this.selectedRow ? this.selectedRow.skills : [];
  }

  get f() { return this.addExperienceForm.controls };

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions[] = [{year: "numeric"}, {month: "2-digit"}, {day: "2-digit"}];

    return options.map((option) => {
      const formatter = new Intl.DateTimeFormat('en', option);
      return formatter.format(new Date(date));
    }).join('-');
  }

  add() {
    const experience: ExperienceDetails = {
      title: this.f['title'].value,
      startDate: this.formatDate(this.f['startDate'].value),
      endDate: this.formatDate(this.f['endDate'].value),
      description: this.f['text'].value,
      company: this.f['company'].value,
      skills: this.skillList,
      logoUrl: this.f['logoUrl'].value
    }

    if (this.selectedRow) {
      this.firebaseService.updateExperience(experience, this.selectedRow.key);
    } else {
      this.firebaseService.saveExperience(experience);
      this.router.navigate(['admin', 'dashboard', 'experiences']);
    }
  }

  delete() {
    this.firebaseService.deleteExperience(this.selectedRow.key);
  }

  onChange(event: Event) {
    const inputEvent = event as InputEvent;
    let value = (event.target as HTMLInputElement)?.value;
    if (inputEvent.inputType === 'insertText' && inputEvent.data === ',') {
      value = value.substring(0, value.length - 1);

      if (!this.skillList) {
        this.skillList = [];
      }

      if (this.skillList.includes(value)) {
        return;
      }

      this.skillList.push(value);

      this.f['skills'].setValue(' ');
    } else if (inputEvent.inputType === 'deleteContentBackward' && value === '') {
      this.skillList.pop();

      if (this.skillList.length > 0) {
        this.f['skills'].setValue(' ');
      }
    }
  }

  remove(skill: string) {
    const index: number = this.skillList.indexOf(skill, 0);
    if (index > -1) {
      this.skillList.splice(index, 1);

      if (this.skillList.length > 0) {
        this.f['skills'].setValue(' ');
      } else {
        this.f['skills'].setValue('');
      }
    }
  }

  edit(skill: string, event: MatChipEditedEvent) {
    const index: number = this.skillList.indexOf(skill, 0);
    const changedValue: string = event.value.trim();

    if (!changedValue) {
      this.remove(skill);
      return;
    }

    if (index > -1) {this.skillList[index] = changedValue}
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.skillList, event.previousIndex, event.currentIndex);
  }
}
