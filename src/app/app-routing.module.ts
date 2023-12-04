import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperienceComponent } from './components/experience/experience.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent,
    data: { breadcrumb: { alias: "About" } }
  },
  {
    path: "portfolio",
    component: PortfolioComponent,
    data: { breadcrumb: { alias: "Portfolio" } }
  },
  {
    path: "experience",
    component: ExperienceComponent,
    data: { breadcrumb: { alias: "Experience" } }
  },
  { path: "**", component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
