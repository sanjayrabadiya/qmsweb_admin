import { Component, OnInit } from '@angular/core';
import { CurrentUserModel } from 'src/app/core/models/current-user';
import { FormBuilder } from '@angular/forms';
import { UtilityService } from 'src/app/core/services/utility.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { ElectronicsSignatureService } from './electronics-signature.service';
import { AppUser } from './electronics-signature.model';
import { DateTimeFormat } from 'src/app/shared/pipes/dateFormatTime.pipe';


@Component({
  selector: 'app-electronic-signature',
  templateUrl: './electronic-signature.component.html'
})
export class ElectronicSignatureComponent extends Destroyer implements OnInit {
  password = '';
  securityObj: CurrentUserModel;
  CurrentDate: string;
  public data: any;

  constructor(
    private formBuilder: FormBuilder, private utils: UtilityService, public service: ElectronicsSignatureService,
    private activeModal: NgbActiveModal,private datetimeformat: DateTimeFormat) {
    super();
  }

  ngOnInit() {
 
    this.securityObj = this.utils.storage.CurrentUser;
    setInterval(() => {
      this.CurrentDate = this.datetimeformat.transform(new Date().toLocaleString());
    }, 200);
  }

  close() {
    this.activeModal.close();
  }

  validatelogin(): void {
    this.subs = this.service.validateUserForSignature(this.getLogin()).subscribe(
      () => {
        this.activeModal.close(true);
      }, rejected => {
        this.utils.toast.error(rejected.error["UserName"]);
      });
  }

  private getLogin(): AppUser {
    const loginObj: AppUser = {
      userName: this.securityObj.userName,
      password: this.password,
      isAnotherDevice: false
    };
    return loginObj;
  }

  isInvalid(): boolean {
    const invalid =
      !this.password;
    return invalid;
  }

}
