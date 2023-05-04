import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OtpComponent } from './otp/otp.component';
import { AlreadyLoggedinComponent } from './already-loggedin/already-loggedin.component';
import { ForceLogoutComponent } from './force-logout/force-logout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgot',
        component: ForgotPasswordComponent
      },
      {
        path: 'reset/:user/:otp',
        component: ResetPasswordComponent
      },
      {
        path: 'otp/:user',
        component: OtpComponent
      },
      {
        path: 'logged-in/:user',
        component: AlreadyLoggedinComponent
      },
      {
        path: 'force-logout',
        component: ForceLogoutComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
  static components = [LoginComponent, ForgotPasswordComponent, ResetPasswordComponent, OtpComponent, AlreadyLoggedinComponent, ForceLogoutComponent];
}
