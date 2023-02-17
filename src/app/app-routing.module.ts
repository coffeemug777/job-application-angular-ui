import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyComponent } from './components/apply/apply.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: UserLoginComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'register',
    component: UserRegisterComponent,
  },
  {
    path: 'login',
    redirectTo: '',
  },
  {
    path: 'apply/:id',
    component: ApplyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
