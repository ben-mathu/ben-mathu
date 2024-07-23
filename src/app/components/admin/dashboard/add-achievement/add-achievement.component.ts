import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AchievementElement } from 'src/shared/models/header/portfolio.dto';
import { AchievementDetails } from 'src/shared/models/header/portfolio.model';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';
import { formatDate, showSnackBar } from 'src/shared/utils/utils';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-add-achievement',
  templateUrl: './add-achievement.component.html',
  styleUrl: './add-achievement.component.scss'
})
export class AddAchievementComponent implements OnInit {
  @Input() selectedRow!: AchievementElement;

  achievementNameLabel: string = "Name"
  achievementUrlLabel: string = "URL"
  achievementDescriptionLabel: string = 'Description'

  addAchievementForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private firebaseService: FirebaseService, private router: Router, private breadcrumbService: BreadcrumbService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.breadcrumbService.set("@AddAchievement", "Add Achievement");

    this.addAchievementForm = this.formBuilder.group({
      name: [this.selectedRow ? this.selectedRow.name : '', Validators.required],
      text: [this.selectedRow ? this.selectedRow.description : '', Validators.required]
    });
  }

  get f() { return this.addAchievementForm.controls };

  add() {
    try {
      const achievement: AchievementDetails = {
        name: this.f['title'].value,
        description: this.f['text'].value,
        dateCreated: this.selectedRow ? this.selectedRow.dateCreated : formatDate(new Date()),
      }

      if (this.selectedRow) {
        this.firebaseService.updateAchievement(achievement, this.selectedRow.key);
      } else {
        this.firebaseService.saveAchievement(achievement);
        this.router.navigate(['admin', 'dashboard', 'achievements']);
      }
    } catch (error) {
      showSnackBar('All Fields are Required', this.snackBar);
    }
  }

  delete() {
    this.firebaseService.deleteAchievement(this.selectedRow.key);
  }
}
