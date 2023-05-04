import { Destroyer } from './../../core/utils/destroyer';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent extends Destroyer implements OnInit {
  form: FormGroup;
  user: string;
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      otp: ['', [Validators.required]]
    });

    this.subs = this.route.paramMap.subscribe((params) => {
      this.user = params.get('user');
    });
  }

  validate() {
    const value = this.form.value;
    value.userName = this.user;
    this.authService.validateOtp(value).subscribe((res: any) => {
      this.router.navigate(['../../reset', value.userName, value.otp], {
        relativeTo: this.route
      });
    });
  }
}
