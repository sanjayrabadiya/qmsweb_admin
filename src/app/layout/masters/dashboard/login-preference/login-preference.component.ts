import { DatabaseConfig, DropDownModel, LoginPreferenceModel, ssl } from '../dashbord.model';
import { UtilityService } from './../../../../core/services/utility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input,Output,EventEmitter} from '@angular/core';
import { DashbordService } from '../dashboard.service';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login-preference',
  templateUrl: './login-preference.component.html' 
})
export class LoginPreferenceComponent extends Destroyer implements OnInit {
  form: FormGroup;
  public fields: Object = { text: 'value', value: 'id' };
  public sslfields: Object = { text: 'viewValue', value: 'value' };
  companyDataSource: DropDownModel[];
  showDetails: boolean;
  CompanyData = [];
  sslDataSource: ssl[] = [
    { value: true, viewValue: 'True' },
    { value: false, viewValue: 'False' },
  ];
  id: number;
  @Input() data: any;
  loginPreference: LoginPreferenceModel;
  constructor(private service: DashbordService, private formBuilder: FormBuilder, private dialog: NgbModal, private activeModal: NgbActiveModal,
    private utils: UtilityService) { 
      super();
     }


     ngOnInit(): void {
      this.initForm();
      this.getCompanyDropDown();
      if (this.data.id > 0) {
        this.onEdit(this.data.id);
      }
     
    }
  
    initForm(): void {
  
      this.form = this.formBuilder.group({
        id:[0],
        minPasswordLength: ['', [Validators.required, Validators.min(5)]],
        requiredSpecialChar: [''],
        requiredAlphaNumber: [''],
        requiredCapital: [''],
        expiredDay: [''],
        maxLoginAttempt: [''],
        companyId: ['',Validators.required],
      });
    }
  
    close() {
      this.activeModal.close();
    }
  
    onEdit(id: number): void {
      this.id = id;
      this.form.reset();
      this.form.setValue({
        id : id,
        minPasswordLength: this.data.minPasswordLength,
        requiredSpecialChar: this.data.requiredSpecialChar,
        requiredAlphaNumber: this.data.requiredAlphaNumber,
        requiredCapital: this.data.requiredCapital,
        expiredDay: this.data.expiredDay,
        maxLoginAttempt: this.data.maxLoginAttempt,
        companyId: this.data.companyId
      });
      this.loginPreference = this.data;
    }
  
    onReset(): void {
      this.form.reset();
      if (this.id > 0) {
        this.onEdit(this.id);
      }
    }
    onSave() {
      const data = this.form.value;
      this.subs = this.service.saveLoginPreference(data).subscribe((res) => {
        if (this.id > 0) this.utils.toast.success("Login Preference Updated Successfully.");
        else this.utils.toast.success("Login Preference Created Successfully.");
        this.activeModal.close(res);
      },
        failed => {
          this.utils.toast.error(failed.error.message[0], 'Error');
        });
    }
  
    private getCompanyDropDown(): void {
      this.subs = this.service.GetCompanyList().subscribe(res => {
        this.CompanyData = res;
      });
    }

}
