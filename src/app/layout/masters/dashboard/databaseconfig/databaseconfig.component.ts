import { DatabaseConfig } from '../dashbord.model';
import { UtilityService } from './../../../../core/services/utility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input,Output,EventEmitter} from '@angular/core';
import { DashbordService } from '../dashboard.service';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuditDeleteReasonComponent } from 'src/app/shared/components/audit/audit-delete-reason/audit-delete-reason.component';


@Component({
  selector: 'app-databaseconfig',
  templateUrl: './databaseconfig.component.html' 
})
export class DatabaseconfigComponent extends Destroyer implements OnInit {
  form: FormGroup;
  databseConfig: DatabaseConfig;
  @Input() data: any;  
  editing :boolean;
  validate=true;
  id:number=0;
  @Output() onBackClick: EventEmitter<any> = new EventEmitter();

  constructor(private service: DashbordService, private formBuilder: FormBuilder, private dialog: NgbModal, private activeModal: NgbActiveModal,
    private utils: UtilityService) { 
      super();
     }


     ngOnInit(): void {     
      this.initForm();
      this.loadDatabaseConfig();   
    }
  
    initForm(): void {
      this.form = this.formBuilder.group({        
        serverName:['',Validators.required],
        databaseName: ['', Validators.required],
        serverLoginName:['', Validators.required],
        serverPassword:['', Validators.required],
        documentPath:['',Validators.required],
        imagePath:['',Validators.required]
      });
    }
  
    close() {
      this.activeModal.close();
    }
   
  
    onEdit(): void { 
      this.form.reset();
      this.form.setValue({
        serverName: this.databseConfig.serverName,
        databaseName: this.databseConfig.databaseName,
        serverLoginName: this.databseConfig.serverLoginName,
        serverPassword: this.databseConfig.serverPassword,
        documentPath: this.databseConfig.documentPath,
        imagePath: this.databseConfig.imagePath
      });
      this.editing=false;
      this.validate=true;
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
        companyID: this.data.companyID,
        serverName: this.form.value.serverName,
        databaseName: this.form.value.databaseName,
        serverLoginName: this.form.value.serverLoginName,
        serverPassword: this.form.value.serverPassword,
        documentPath: this.form.value.documentPath,
        imagePath: this.form.value.imagePath
      } as DatabaseConfig;

    
      this.subs = this.service.saveDatabaseconfig(save).subscribe((res) => {     
        this.utils.toast.recordSaved(); 
        this.loadDatabaseConfig();
      },
        failed => {
          this.utils.toast.error(failed.error.message[0], 'Error');
        });
    }
    onReset(){

    }
    onValidate(){     
      const save = {
        id:this.id,
        companyID: this.data.companyID,
        serverName: this.form.value.serverName,
        databaseName: this.form.value.databaseName,
        serverLoginName: this.form.value.serverLoginName,
        serverPassword: this.form.value.serverPassword,
        documentPath: this.form.value.documentPath,
        imagePath: this.form.value.imagePath
      } as DatabaseConfig;

      this.service.checkDatabasevalidate(save).subscribe((res) => {      
        this.validate=res?false:true;    
      },
        failed => {
          this.utils.toast.error(failed.error.message[0], 'Error');
        });     
    }

    loadDatabaseConfig(){  
      this.service.getDatabaseConfig(this.data.companyID).subscribe((data) => {
        if(!data){
        this.editing=false;
        }else{
          this.databseConfig=data;
          this.id=data.id;
          this.editing=true;
        }       
      });
    }

    onCreate(){
      const save = {
        id:this.id,
        companyID: this.data.companyID,
        serverName: this.form.value.serverName,
        databaseName: this.form.value.databaseName,
        serverLoginName: this.form.value.serverLoginName,
        serverPassword: this.form.value.serverPassword,
        documentPath: this.form.value.documentPath,
        imagePath: this.form.value.imagePath
      } as DatabaseConfig;

      this.service.createDatabase(save).subscribe((res) => {      
        this.utils.toast.success("Database Created Successfully.");
        this.validate=res?false:true;
      },
        failed => {
          this.utils.toast.error(failed.error.message[0], 'Error');
        }); 
    }

}
