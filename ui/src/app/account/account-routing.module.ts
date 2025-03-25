import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isSignedInGuard } from '../auth';

const routes: Routes = [
  {
    path: '',
    canActivate: [isSignedInGuard],
    loadComponent: () => import('./index/index.component').then(m => m.IndexComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
