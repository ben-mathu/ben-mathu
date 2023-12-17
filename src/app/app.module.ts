import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore, FirestoreModule } from '@angular/fire/firestore';
import { ExperienceComponent } from './components/experience/experience.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { CardComponent } from './shared/components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    PageNotFoundComponent,
    FooterComponent,
    ExperienceComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    FirestoreModule,
    BreadcrumbModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [
    // ScreenTrackingService,UserTrackingService
    { provide: APP_BASE_HREF, useValue: environment.baseUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
