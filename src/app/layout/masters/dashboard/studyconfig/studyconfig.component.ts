//import { DatabaseConfig } from '../dashbord.model';
import { UtilityService } from './../../../../core/services/utility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DashbordService } from '../dashboard.service';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboBoxComponent } from '@syncfusion/ej2-angular-dropdowns';
import { AuditDeleteReasonComponent } from 'src/app/shared/components/audit/audit-delete-reason/audit-delete-reason.component';
import { Constant } from 'src/app/core/constants/constants';
import { StudyConfig } from '../dashbord.model'

@Component({
  selector: 'app-studyconfig',
  templateUrl: './studyconfig.component.html'
})
export class StudyconfigComponent extends Destroyer implements OnInit {
  form: FormGroup;
  studyConfig: StudyConfig;
  @Input() data: any;
  companyID: number;
  ReasonId: number;
  ReasonOth: string;
  TValidTo: Date;
  CompanyData = [];
  public fields: Object = { text: 'value', value: 'id' };
  constructor(private service: DashbordService, private formBuilder: FormBuilder, private dialog: NgbModal, private activeModal: NgbActiveModal,
    private utils: UtilityService) {
    super();
  }

  ngOnInit(): void {

    this.initForm();
    if (this.data.id > 0) {
      this.onEdit(this.data.id);
    }
    else {
      this.companyID = this.data.companyID;
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [0],
      noofStudy: ['', Validators.required],
      validFrom: ['', Validators.required],
      validTo: ['', Validators.required],
      companyId: ['', Validators.required]
     
    });
    this.loadlist();
  }
  loadlist() {
    this.service.GetCompanyList().subscribe(res => {
      this.CompanyData = res;
    });
  }

  close() {
    this.activeModal.close();
  }
  onEdit(id: number): void {
  
    this.companyID = this.data.companyID;
    this.form.reset();
    this.form.setValue({
      noofStudy: this.data.noofStudy,
      validFrom: this.data.validFrom,
      validTo: this.data.validTo,
      id: this.data.id,
      companyId: this.data.companyID
     
    });
  }

  onSave() {

    console.log(this.form);
    if (!this.data.id) {
      this.onSaveAfter();
      return;
    }
    const dialogRef = this.dialog.open(AuditDeleteReasonComponent, { windowClass: 'white-modal modal-small' });
    dialogRef.componentInstance.data = { message: '', moduleId: 1 };
    dialogRef.result.then((result) => {
      if (result) {
        this.onSaveAfter();
      }
    });
  }

  onSaveAfter() {
  
    const save = {
      id: this.form.value.id,
      companyID: this.form.value.companyId,
      type: 2,
      noofStudy: this.form.value.noofStudy,
      validFrom: this.form.value.validFrom,
      validTo: this.form.value.validTo
    } as StudyConfig;
    this.subs = this.service.saveStudy(save).subscribe((res) => {
      this.utils.toast.recordSaved();
      this.activeModal.close(res);
    },
      failed => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      });
  }


  setValidToDate(value: Date) {

    if (!value) {
      value = null;
    }
    this.TValidTo = new Date();
    if (value != null) {
      this.TValidTo = new Date(new Date(this.TValidTo.setFullYear(value.getFullYear(), value.getMonth(), value.getDate())).toDateString());
    }
  }



}
