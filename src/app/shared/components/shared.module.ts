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

@NgModule({
  exports: [
    NavbarComponent,
    FooterComponent,
    CardComponent,
    SkillRatingComponent
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    CardComponent,
    SkillRatingComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatIconModule,
    AppRoutingModule,
    BreadcrumbModule
  ]
})
export class SharedModule { }
