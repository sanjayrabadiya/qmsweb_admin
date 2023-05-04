import { UtilityService } from 'src/app/core/services/utility.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { ToasterService } from 'src/app/core/services/toaster.service';
//import { DropDownService } from 'src/app/core/services/drop-down.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Destroyer implements OnInit {
  form: FormGroup;
  //roles: any[];
  selectedRoleId = 0;
  isFirstTime = false;
  userNametoreset: string;
  oldpasswordtoreset: string;
  changePasswordForm: FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService, 
    private toasterService: ToasterService,
   // private dropDownService: DropDownService,
    private utils: UtilityService) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      roleId: 1,
      isSuperAdmin : [true]
    });

    this.changePasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      reTypePassword: ['', Validators.required],
      userName: ['']
    });
  }

  login() {
    const value = this.form.value;
    this.subs = this.authService.login(value).subscribe((res: any) => {
      if (res.isFirstTime === true) {
        this.userNametoreset = res.userName;
        this.oldpasswordtoreset = this.form.controls['password'].value//res.password;
        this.isFirstTime = true;
        // this.router.navigate(['../reset', value.userName, value.password], {
        //   relativeTo: this.route
        // });
      } else {
        if (res.askToSelectRole) {
          //this.roles = res.roles;
        } else {
          this.utils.storage.setUserData(res);
          localStorage.removeItem("currentOpenMenu");
          var dashboardComponent: any[] = [];
          dashboardComponent.push({ "componentId": "mnu_dashboard", "title": "Dashboard", "selected": true });
          localStorage.setItem("currentOpenMenu", JSON.stringify(dashboardComponent));
          this.router.navigate(['/']);
        }
      }
    });
  }
}
