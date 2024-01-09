import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  email = new FormControl();
  password = new FormControl();
  rememberMe = new FormControl();

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@Home', 'Login');

    console.log(this.rememberMe);
  }
}
