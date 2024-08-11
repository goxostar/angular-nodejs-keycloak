import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtectedComponent } from './components/protected.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
