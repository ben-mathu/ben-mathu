import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ExperienceComponent } from './experience/experience.component';
import { AboutComponent } from './about/about.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    data: { breadcrumb: { alias: 'Home' } },
  },
  {
    path: 'home',
    children: [
      {
        path: 'portfolio',
        component: PortfolioComponent,
        data: { breadcrumb: { alias: 'Portfolio' } },
      },
      {
        path: 'experience',
        component: ExperienceComponent,
        data: { breadcrumb: { alias: 'Experience' } },
      },
      {
        path: 'about',
        component: AboutComponent,
        data: { breadcrumb: { alias: 'About' } },
      }
    ]
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
