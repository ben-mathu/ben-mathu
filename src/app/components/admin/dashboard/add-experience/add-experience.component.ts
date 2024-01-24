import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Database, getDatabase, push, ref, update } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExperienceElement } from 'src/app/shared/models/header/portfolio.dto';
import { ExperienceDetails } from 'src/app/shared/models/header/portfolio.model';
import { MatChipEditedEvent } from '@angular/material/chips';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrl: './add-experience.component.scss'
})
export class AddExperienceComponent implements OnInit {
  @Input() selectedRow!: ExperienceElement;

  addExperienceForm!: FormGroup;
  database: Database

  skillList: string[] = [];

  titleLabel: string = 'Title';
  startDateLabel: string = 'Start Date';
  endDateLabel: string = 'End Date';
  skillsLabel: string = 'Skills';
  descriptionLabel: string = 'Description';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.database = getDatabase();
  }

  ngOnInit(): void {
    this.addExperienceForm = this.formBuilder.group({
      title: [this.selectedRow ? this.selectedRow.title : '', Validators.required],
      startDate: [this.selectedRow ? this.selectedRow.startDate : '', Validators.required],
      endDate: [this.selectedRow ? this.selectedRow.endDate : '', Validators.required],
      description: [this.selectedRow ? this.selectedRow.description : ''],
      skills: ['']
    });

    this.skillList = this.selectedRow ? this.selectedRow.skills : []
  }

  get f() { return this.addExperienceForm.controls };

  registerExperience() {
    const experience: ExperienceDetails = {
      title: this.f['title'].value,
      startDate: this.f['startDate'].value,
      endDate: this.f['endDate'].value,
      skills: this.skillList
    }

    if (this.selectedRow) {
      update(ref(this.database, 'experiences' + this.selectedRow.key), experience);
    } else {
      push(ref(this.database, 'experiences'), experience);
      this.router.navigate(['admin', 'dashboard', 'experiences']);
    }
  }

  onChange(event: Event) {
    const inputEvent = event as InputEvent;
    let value = (event.target as HTMLInputElement)?.value;
    if (inputEvent.inputType === 'insertText' && inputEvent.data === ',') {
      value = value.substring(0, value.length - 1);

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
