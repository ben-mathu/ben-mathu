import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'blogs',
    component: BlogsComponent,
    data: { breadcrumb: { alias: 'Blogs' }},
  },
  {
    path: 'blogs',
    children: [
      {
        path: 'add-blog',
        component: AddBlogComponent,
        data: { breadcrumb: { alias: 'AddBlog' }}
      }
    ]
  },
  {
    path: 'experiences',
    component: ExperiencesComponent,
    data: { breadcrumb: { alias: 'Experiences' }},
  },
  {
    path: 'experiences',
    children: [
      {
        path: 'add-experience',
        component: AddExperienceComponent,
        data: { breadcrumb: { alias: 'AddExperience' }}
      }
    ]
  },
  {
    path: 'projects',
    component: ListProjectsComponent,
    data: { breadcrumb: { alias: 'Projects' }},
  },
  {
    path: 'projects',
    children: [
      {
        path: 'add-project',
        component: AddProjectComponent,
        data: { breadcrumb: { alias: 'AddProject' }}
      }
    ]
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
