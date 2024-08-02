import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  AchievementElement,
  CertificateElement,
} from 'src/shared/models/header/portfolio.dto';
import {
  AchievementDetails,
  CertificateDetails,
} from 'src/shared/models/header/portfolio.model';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';
import { Utils } from 'src/shared/utils/utils';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrl: './add-certificate.component.scss',
})
export class AddCertificateComponent implements OnInit {
  @Input() selectedRow!: CertificateElement;

  certificateNameLabel: string = 'Name';
  certificateUrlLabel: string = 'URL';

  addCertificateForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private snackBar: MatSnackBar,
    private util: Utils
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@AddCertificate', 'Add Certificate');

    this.addCertificateForm = this.formBuilder.group({
      name: [
        this.selectedRow ? this.selectedRow.name : '',
        Validators.required,
      ],
      url: [this.selectedRow ? this.selectedRow.url : '', Validators.required],
    });
  }

  get f() {
    return this.addCertificateForm.controls;
  }

  add() {
    try {
      const certificate: CertificateDetails = {
        name: this.f['name'].value,
        url: this.f['url'].value,
        dateCreated: this.selectedRow
          ? this.selectedRow.dateCreated
          : this.util.formatDate(new Date()),
      };

      if (this.selectedRow) {
        this.firebaseService.updateCertificate(
          certificate,
          this.selectedRow.key
        );
      } else {
        this.firebaseService.saveCertificate(certificate);
        this.router.navigate(['admin', 'dashboard', 'certificates']);
      }
    } catch (error) {
      this.util.showSnackBar('All Fields are Required', this.snackBar);
    }
  }

  delete() {
    this.firebaseService.deleteCertificate(this.selectedRow.key);
  }
}
