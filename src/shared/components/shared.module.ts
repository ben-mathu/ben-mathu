import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { SkillRatingComponent } from './skill-rating/skill-rating.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomTextareaComponent } from './custom-textarea/custom-textarea.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MarkdownModule } from 'ngx-markdown';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

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
    RouterModule,
    MatTabsModule,
    MatButtonModule,
    MarkdownModule,
    MatToolbarModule,
    MatListModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
