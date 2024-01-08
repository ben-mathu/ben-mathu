import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { secureInnerPageGuard } from 'src/app/shared/guards/secure-inner-page/secure-inner-page.guard';
import { authGuard } from 'src/app/shared/guards/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';


const adminRoutes: Routes = [
  {
    path: 'admin',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { breadcrumb: { alias: 'Login' } },
        canActivate: [authGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumb: { alias: 'Dashboard' } },
        canActivate: [secureInnerPageGuard],
      }
    ]
  },

  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
