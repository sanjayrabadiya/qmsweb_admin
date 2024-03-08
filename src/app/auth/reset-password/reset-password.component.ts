import { UtilityService } from './../../core/services/utility.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Destroyer } from 'src/app/core/utils/destroyer';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent extends Destroyer implements OnInit {
  form: FormGroup;
  user: string;
  otp: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private utils: UtilityService
  ) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      reTypePassword: ['', [Validators.required]]
    });

    this.subs = this.route.paramMap.subscribe((params) => {
      this.user = params.get('user');
    });

    this.subs = this.route.paramMap.subscribe((params) => {
      this.otp = params.get('otp');
    });
  }

  changePassword() {
    const value = this.form.value;

    if (value.newPassword.trim() !== value.reTypePassword.trim()) {
      this.utils.toast.error('New password and re-type password does not match.', 'Error message');
      return;
    }

    const userInfo = {
      userName: this.user,
      password: value.newPassword,
      otp: this.otp
    };

    this.subs = this.authService.changePasswordByOtp(userInfo).subscribe((res: any) => {
      this.utils.toast.info('Your password change successfully.');
      this.router.navigate(['../../../login'], {
        relativeTo: this.route
      });
    });
  }
}
