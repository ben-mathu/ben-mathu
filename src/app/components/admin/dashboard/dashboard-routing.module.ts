import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { OverviewComponent } from './overview/overview.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'add-blog',
    component: AddBlogComponent
  },
  {
    path: 'add-experience',
    component: AddExperienceComponent
  },
  {
    path: 'add-project',
    component: AddProjectComponent,
    data: { breadcrumb: { alias: 'AddProject' }}
  },
  {
    path: 'blogs',
    component: BlogsComponent
  },
  {
    path: 'experiences',
    component: ExperiencesComponent,
    data: { breadcrumb: { alias: 'Experiences' }}
  },
  {
    path: 'projects',
    component: ListProjectsComponent,
    data: { breadcrumb: { alias: 'Projects' }}
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
