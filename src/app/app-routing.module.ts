import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./components/home/home-routing.module').then(m => m.HomeRoutingModule)
  // },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./components/admin/admin-routing.module').then(m => m.AdminRoutingModule)
  // },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
