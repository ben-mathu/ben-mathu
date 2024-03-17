import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ExperienceComponent } from './experience/experience.component';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    HomeComponent,
    HomePageComponent,
    AboutComponent,
    PortfolioComponent,
    ExperienceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    MatButtonModule,
    MatCardModule,
    MarkdownModule
  ]
})
export class HomeModule { }
