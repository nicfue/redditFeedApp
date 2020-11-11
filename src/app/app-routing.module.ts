import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/feeds/sweden',
    pathMatch: 'full'
  },
  {
    path: 'feeds/:feedUrl',
    loadChildren: () => import('./feeds/feeds.module').then(m => m.FeedsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
