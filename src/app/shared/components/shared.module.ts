import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { SkillRatingComponent } from './skill-rating/skill-rating.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomTextareaComponent } from './custom-textarea/custom-textarea.component';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [
    NavbarComponent,
    FooterComponent,
    CardComponent,
    SkillRatingComponent,
    SidenavComponent,
    CustomTextareaComponent
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    CardComponent,
    SkillRatingComponent,
    SidenavComponent,
    CustomTextareaComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatIconModule,
    BreadcrumbModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule
  ]
})
export class SharedModule { }
