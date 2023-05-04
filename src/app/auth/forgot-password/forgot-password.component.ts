import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Destroyer } from 'src/app/core/utils/destroyer';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends Destroyer implements OnInit {
  form: FormGroup;
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
      userName: ['', [Validators.required]]
    });
  }

  validate() {
    const value = this.form.value;
    this.subs = this.authService.validateUserName(value.userName).subscribe((res: any) => {
      this.utils.toast.info('Your OTP sent on your registered mail id.');
      this.router.navigate(['../otp', value.userName], {
        relativeTo: this.route
      });
    });
  }
}
