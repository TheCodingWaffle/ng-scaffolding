import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { NewsComponent } from './features/news/news.component';
import { NotFoundComponent } from './shared/components/404/not-found.component';
const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'news', component: NewsComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
