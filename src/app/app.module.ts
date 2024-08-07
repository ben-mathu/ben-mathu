import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import {
  provideFirestore,
  getFirestore,
  FirestoreModule,
} from '@angular/fire/firestore';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SharedModule } from './shared/components/shared.module';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { HomeModule } from './components/home/home.module';
import { AdminModule } from './components/admin/admin.module';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AdminModule,
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
    MatProgressBarModule,
    SharedModule,
    MatButtonModule,
    MarkdownModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    // ScreenTrackingService,UserTrackingService
    { provide: APP_BASE_HREF, useValue: environment.baseUrl },
    provideHttpClient(withInterceptorsFromDi()),
    MatIconRegistry
  ],
})
export class AppModule {}
