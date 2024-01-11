import { Component, OnInit } from '@angular/core';
import { Auth, getAuth, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordVisible: boolean = false;

  constructor(private breadcrumbService: BreadcrumbService, private auth: Auth, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@Login', 'Login');

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onRevealPasswordEvent(event: Event) {
    event.preventDefault();
    if (event?.type === 'submit') {
      this.passwordVisible = !this.passwordVisible
    }
  }

  get f() { return this.loginForm.controls; }

  loginUser() {
    signInWithEmailAndPassword(getAuth(), this.f['email'].value, this.f['password'].value)
      .then((userCredentials) => {
        const user = userCredentials.user;
        this.router.navigate(['admin']);
      }).catch((error) => {
        console.log('Message ' + error.message);
      });
  }
}
