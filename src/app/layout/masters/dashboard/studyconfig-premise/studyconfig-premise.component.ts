import { StudyConfigPremise } from '../dashbord.model';
import { UtilityService } from './../../../../core/services/utility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild,Output,EventEmitter } from '@angular/core';
import { DashbordService } from '../dashboard.service';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboBoxComponent } from '@syncfusion/ej2-angular-dropdowns';
import { AuditDeleteReasonComponent } from 'src/app/shared/components/audit/audit-delete-reason/audit-delete-reason.component';
import { Constant } from 'src/app/core/constants/constants';

@Component({
  selector: 'app-studyconfig-premise',
  templateUrl: './studyconfig-premise.component.html'
 
})
export class StudyconfigPremiseComponent extends Destroyer implements OnInit {
  form: FormGroup;
  studyConfig: StudyConfigPremise;
  @Input() data: any; 
  editing :boolean= false;
  id:number=0;
  TValidTo: Date;
  @Output() onBackClick: EventEmitter<any> = new EventEmitter();

  constructor(private service: DashbordService, private formBuilder: FormBuilder, private dialog: NgbModal, private activeModal: NgbActiveModal,
    private utils: UtilityService) {
      super();
     // this.studyConfig= new StudyConfigPremise(); 
     }


     ngOnInit(): void {     
      this.initForm();
      this.loadstudyConfig();     
    }
  
    initForm(): void {
      this.form = this.formBuilder.group({
        noofStudy:['',Validators.required],
        validFrom: ['', Validators.required],
        validTo:[this.TValidTo, Validators.required]      
      });
    }
  
    close() {
      this.activeModal.close();
    }
   
  
    onEdit(): void {     
      this.editing=false;       
      this.form.reset();
      this.form.setValue({
        noofStudy: this.studyConfig.noofStudy,
        validFrom: this.studyConfig.validFrom,
        validTo: this.studyConfig.validTo       
      });
         
    }
  
    onSave() {
      if (!this.id) {
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
        id:this.id,       
        noofStudy: this.form.value.noofStudy,
        validFrom:this.form.value.validFrom,
        validTo:this.form.value.validTo,
        companyID:this.data.companyID,
        type:1,
      } as StudyConfigPremise; 
   
      this.subs = this.service.saveStudyconfig(save).subscribe((res) => {   
        this.utils.toast.recordSaved();      
        this.loadstudyConfig();
      },
        failed => {
          this.utils.toast.error(failed.error.message[0], 'Error');
        });
    }


    onReset(){

    }    
 
    setValidToDate(value: Date) {
      this.TValidTo = new Date();     
      if (value != null) {
        this.TValidTo = new Date(new Date(this.TValidTo.setFullYear(value.getFullYear(), value.getMonth(), value.getDate())).toDateString());
      }
    }


    loadstudyConfig(){  
      this.service.getStudyConfig(this.data.companyID).subscribe((data) => {
        if(!data){
        this.editing=false;
        }else{
          this.studyConfig=data;        
          this.id=data.id;        
          this.editing=true;
        }       
      },
      failed => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      });
    }


}
