import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { SharedModule } from 'src/shared/components/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { SignupComponent } from './signup/signup.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    provideAuth(() => getAuth()),
    MatIconModule
  ],
  providers: [
    AuthService,
    provideAnimations()
  ]
})
export class AdminModule { }
