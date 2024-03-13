import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChildCompnayModel, DropDownModel, Ssl } from '../dashbord.model';
import { DashbordService } from '../dashboard.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { ZoneModel } from '../../zone/ZoneModel';

@Component({
  selector: 'app-child-company',
  templateUrl: './child-company.component.html',
  styleUrls: ['./child-company.component.scss']
})
export class ChildCompanyComponent extends Destroyer implements OnInit{
  form: FormGroup;
  public fields: Object = { text: 'value', value: 'id' };
  public sslfields: Object = { text: 'viewValue', value: 'value' };
  companyDataSource: DropDownModel[];
  showDetails: boolean;
  CompanyData = [];
  @Input() zone: ZoneModel[];
  zoneList: any;
  List1 : ChildCompnayModel[];
  isDisabled : boolean = false;
  child_company: boolean = false;

  sslDataSource: Ssl[] = [
    { value: true, viewValue: 'True' },
    { value: false, viewValue: 'False' },
  ];
  id: number;

  @Input() data: any;
  public CompanyCode = '';
  childCompany: ChildCompanyComponent;
  constructor(private service: DashbordService, private formBuilder: FormBuilder, private dialog: NgbModal, private activeModal: NgbActiveModal,
    private utils: UtilityService) { 
      super();}

  ngOnInit(): void {
    this.initForm();
    this.loadZoneList();

    this.getCompanyCode();
    if (this.data.id > 0) {
      this.onEdit(this.data.id);
    }
  }

  initForm(): void {
  
    this.form = this.formBuilder.group({
      id:[0],
      companyCode : '',
      childcompanyCode : ['',[Validators.required]],
      childcompanyName: ['', [Validators.required]],
      childphone: [''],
      childaddress: [''],
      childemail: [''],
      parentCompnayId: [''],
      childzoneMasterId: ['']
    });
  }

  getCompanyCode(){
  this.service.getCompanyCode(this.data.parentCompnayId).subscribe((res) =>{
      this.CompanyCode = res.companycode;
  });

  }


  onSave() { 
    const data = this.form.value;
    data.parentCompnayId= this.data.parentCompnayId;
    data.companyCode = this.CompanyCode;
    console.log(data)
    this.subs = this.service.saveChildCompany(data).subscribe((res) => {
      if (this.id > 0) this.utils.toast.success("Child Company Updated Successfully.");
      else this.utils.toast.success("Child Company Created Successfully.");
      this.activeModal.close(res);
      this.service.getChildCompany(data.parentCompnayId).subscribe(res=>{
        this.List1 = res;
      });
    },
      failed => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      });
    }

  close() {
    this.activeModal.close();
  }
  onReset(): void {
    this.form.reset();
    
  }

  onEdit(id: number): void {
    console.log(this.data);
    this.id = id;
    this.form.reset();
    this.form.setValue({
      id : id,
      companyCode: this.data.companyCode,
      childcompanyCode : this.data.childcompanyCode,
      childcompanyName: this.data.childcompanyName,
      childaddress: this.data.childaddress,
      childemail: this.data.childemail,
      childphone: this.data.childphone,
      parentCompnayId: this.data.parentCompnayId,
      childzoneMasterId: this.data.childzoneMasterId
    });
    this.childCompany = this.data;
  }
  
  loadZoneList() {
    this.service.getZoneList().subscribe((res) => {
      this.zoneList = res as ZoneModel[];
      console.log("Zone List : ", res);
    });
  }

}
