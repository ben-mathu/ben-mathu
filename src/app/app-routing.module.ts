import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  // },s
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
