import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { FormControl } from '@angular/forms';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  email: FormControl<string> = new FormControl();
  password: FormControl<string> = new FormControl();

  passwordVisible: boolean = false;

  constructor(private auth: Auth, private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@SignUp', 'SignUp');
  }

  signupUser(){
    createUserWithEmailAndPassword(this.auth, this.email.value, this.password.value).then((userCredentials) => {
      const user = userCredentials.user;
      localStorage.setItem('user', '');
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  onRevealPasswordEvent(event: Event) {
    event.preventDefault();
    if (event?.type === 'submit') {
      this.passwordVisible = !this.passwordVisible
    }
  }
}
