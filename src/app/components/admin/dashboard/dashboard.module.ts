import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { SharedModule } from 'src/shared/components/shared.module';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [
    OverviewComponent,
    ListProjectsComponent,
    ExperiencesComponent,
    BlogsComponent,
    AddProjectComponent,
    AddExperienceComponent,
    AddBlogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    CdkDropList,
    CdkDrag,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule
  ]
})
export class DashboardModule { }
