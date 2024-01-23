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
    MatChipsModule
  ]
})
export class DashboardModule { }
