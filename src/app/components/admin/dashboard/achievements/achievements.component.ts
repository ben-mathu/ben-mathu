import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AchievementElement } from 'src/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';
import { Utils } from 'src/shared/utils/utils';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss',
})
export class AchievementsComponent implements OnInit {
  achievements: AchievementElement[] = [];
  selectedRow?: AchievementElement;
  displayedColumns = ['index', 'name', 'url', 'dateCreated'];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private firebaseService: FirebaseService,
    private snackbar: MatSnackBar,
    private util: Utils
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@Achievements', 'Achievements');

    this.firebaseService
      .getAchievements()
      .then((values) => {
        this.achievements = values;
      })
      .catch((error: Error) => {
        console.log(error.message);
        this.util.showSnackBar(error.message, this.snackbar);
      });
  }

  handleClick(achievementDetails: {
    rowData: AchievementElement;
    event: Event;
  }) {
    if (
      !this.selectedRow ||
      achievementDetails['rowData'].index !== this.selectedRow.index
    ) {
      this.selectedRow = achievementDetails['rowData'];
    } else {
      this.selectedRow = undefined;
    }
  }
}
