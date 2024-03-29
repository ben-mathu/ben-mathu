import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { authGuard } from 'src/shared/guards/auth/auth.guard';
import { secureInnerPageGuard } from 'src/shared/guards/secure-inner-page/secure-inner-page.guard';

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
      // {
      //   path: 'signup',
      //   component: SignupComponent,
      //   data: { breadcrumb: { alias: 'SignUp' } }
      // },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumb: { alias: 'Dashboard' } },
        canActivate: [secureInnerPageGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
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
