import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from './../../../core/services/utility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent   implements OnInit  {
  form: FormGroup;
  userName = '';
  isDisable=true;
  template = 'user';
  oldPassword = '';
  newPassword = '';
  reTypePassword = '';
  Message: any;
  changeButton: boolean;
  disabled: true;

  constructor(
    private dialog: NgbModal,
    
    private utils: UtilityService, private activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    ;
  }

  ngOnInit(): void {
    this.userName =this.utils.storage.CurrentUser.userName
    this.initForm();
  }
  initForm(): void {
    this.form = this.formBuilder.group({
        userName: this.userName,
        oldPassword:['',Validators.required],
        newPassword:['',Validators.required],
        reTypePassword:['',Validators.required],
    });
  }

  onValidUserName(): void {
    if (this.userName.trim() === '') {
        this.utils.toast.error(
            'Please insert username.',
            'Error message'
        );
        return;
    }
    this.utils.dropDown
        .userNameValidate(this.userName)
        .pipe()
        .subscribe(
            errorInfo => {
                if (errorInfo && errorInfo.trim() !== '') {
                    this.utils.toast.error(errorInfo, 'Error message');
                }
                this.template = 'password';
            },
            errormsg => {
                this.utils.toast.error(
                    errormsg.error.message[0],
                    'Error message'
                );
            }
        );
  }
 
  onPasswordChange(): void {
  if (this.form.value.newPassword == '') {
      this.utils.toast.error(
          'Please enter new password.',
          'Error message'
      );
      return;
  }

  if (this.form.value.oldPassword == '') {
      this.utils.toast.error(
          'Please enter old password.',
          'Error message'
      );
      return;
  }


  if (this.form.value.newPassword != this.form.value.reTypePassword) {
      this.utils.toast.error(
          'New password and re-type password does not match.',
          'Error message'
      );
      return;
  }
  const userInfo = {
      userName: this.form.value.userName,
      newPassword: this.form.value.newPassword,
      oldPassword: this.form.value.oldPassword
  };
  this.utils.dropDown
      .changePassword(userInfo)
      .pipe()
      .subscribe(
          errorInfo => {
              this.template = 'password';
              this.utils.toast.info(
                  'Your password change successfully.'
              );
              this.activeModal.close();
          },
          errormsg => {
              this.utils.toast.error(
                  errormsg.error.message[0],
                  'Error message'
              );
          }
      );
}

  onClose() {
    this.activeModal.close();
  }


  MatchPassword() {
      if((this.form.value.newPassword==this.form.value.reTypePassword && this.form.value.oldPassword !=""))
      {
        this.changeButton = this.Message.length == 0 ? true : false;  
      }
      else{this.changeButton = false;}
    }
}
