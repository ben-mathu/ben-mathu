import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  AchievementElement,
  CertificateElement,
} from 'src/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';
import { Utils } from 'src/shared/utils/utils';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-achievements',
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss',
})
export class CertificatesComponent implements OnInit {
  certificates: CertificateElement[] = [];
  selectedRow?: CertificateElement;
  displayedColumns = ['index', 'name', 'dateCreated'];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private firebaseService: FirebaseService,
    private snackbar: MatSnackBar,
    private util: Utils
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@Certificates', 'Certificates');

    this.firebaseService
      .getCertificates()
      .then((values) => {
        this.certificates = values;
        this.displayedColumns.push('url');
      })
      .catch((error: Error) => {
        this.util.showSnackBar(error.message, this.snackbar);
      });
  }

  handleClick(certificateDetails: {
    rowData: CertificateElement;
    event: Event;
  }) {
    if (
      !this.selectedRow ||
      certificateDetails['rowData'].index !== this.selectedRow.index
    ) {
      this.selectedRow = certificateDetails['rowData'];
      this.displayedColumns = this.displayedColumns.filter((item) => {
        return item !== 'url';
      });
    } else {
      this.selectedRow = undefined;
      this.displayedColumns.push('url');
    }
  }
}
