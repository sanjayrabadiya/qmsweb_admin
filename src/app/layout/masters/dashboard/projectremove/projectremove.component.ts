import { UtilityService } from './../../../../core/services/utility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemModel } from '@syncfusion/ej2-splitbuttons';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { ProjectDataRemoveModel } from './projectremove.model';
import { ProjectDataRemoveService } from './projectremove.service';
import { DeleteStudyReasonDocumentComponent } from './deletestudyreasondocument/deletestudyreasondocument.component';
import { ElectronicSignatureComponent } from './electronic-signature/electronic-signature.component';
import { FileModel } from './deletestudyreasondocument/deletestudyreasondocument.model';

@Component({
  selector: 'app-projectremove',
  templateUrl: './projectremove.component.html',
  styleUrls: ['./projectremove.component.scss']
})
export class ProjetRemoveComponent extends MasterPage<ProjectDataRemoveModel> implements OnInit {
  form: FormGroup;
  ProjectData: any = [];
  CompanyData = [];
  RemoveTypes = [];
  IsShow: boolean;
  StudyCode: string;
  IsdeleteShow: boolean = false;
  IsArchieveShow: boolean = false;
  IsDropDownDisable: boolean = false;
  ReasonId: any;
  ReasonOth: string;
  public fields: Object = { text: 'value', value: 'id' };
  fileModel: FileModel;
  public items: ItemModel[] = [
    {
      id: 'Grid_excelexport',
      text: 'To Excel',
      iconCss: 'las la-file-excel'
    },
    {
      id: 'Grid_pdfexport',
      text: 'To PDF',
      iconCss: 'las la-file-pdf'
    },
    {
      id: 'Grid_csvexport',
      text: 'To CSV',
      iconCss: 'las la-file-csv'
    }];
  constructor(public service: ProjectDataRemoveService, private formBuilder: FormBuilder, private dialog: NgbModal, private activeModal: NgbActiveModal,
    private utils: UtilityService) {
    super(service);
  }

  ngOnInit(): void {

    this.IsShow = false;
    this.IsdeleteShow = false;
    this.IsArchieveShow = false;
    this.initForm();
    this.loadDropdowns();
    this.getRemoveType();
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      Id: [0],
      ProjectId: ['', Validators.required],
      IsArchieve: [false],
      IsApplicationBackup: [false],
      IsDatabaseBackup: [false],
      IsDelete: [false],
      CompanyId: ['', Validators.required],
      IsDocumentArchieve: [false],
      Status: [0],
      BackupDate: [''],
      ArchieveDate: [''],
      RemoveDate: [''],
      Type: ['', Validators.required],
      StudyCode: [''],
      ReasonId: [0],
      ReasonOth: ['']

    });
  }
  ChangedStudy(id: number) {

    this.StudyCode = null;
    if (!id) {
      return false;
    }
    let filterResult = this.ProjectData.filter(x => x.id == id);
    if (filterResult.length > 0) {
      this.StudyCode = filterResult[0].value
    }
    this.service.GetData(id).subscribe(res => {
      if (res != null && res.id > 0) {
        this.form.setValue({
          Id: res.id,
          ProjectId: res.projectId,
          IsArchieve: res.isArchieve,
          IsApplicationBackup: res.isApplicationBackup,
          IsDatabaseBackup: res.isDatabaseBackup,
          IsDelete: res.isDelete,
          CompanyId: res.companyId,
          IsDocumentArchieve: res.isDocumentArchieve,
          Status: res.status,
          BackupDate: res.backupDate,
          ArchieveDate: res.archieveDate,
          RemoveDate: res.removeDate,
          StudyCode: res.studyCode,
          Type: 1,
          ReasonId: res.reasonId,
          ReasonOth: res.reasonOth
        });

      }
      else {
        this.form.patchValue({
          IsArchieve: false,
          IsApplicationBackup: false,
          IsDatabaseBackup: false,
          IsDelete: false,
          IsDocumentArchieve: false,
          Status: 0
        });
      }
    });

    this.IsShow = true;
  }
  ChangedCompany(id: number) {
    if (!this.form.value.Type) {
      this.utils.toast.error("Please select type!");
      this.form.patchValue({
        CompanyId: null,
        ProjectId: null
      });
      return false;
    }
    this.ProjectData = [];
    if (!id) {
      this.form.patchValue({
        CompanyId: null,
        ProjectId: null
      });
      return false;
    }

    this.service.GetStudyListByCompanyid(id).subscribe(res => {
      this.ProjectData = res;
    },
      failed => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      }
    );
  }
  private loadDropdowns(): void {
    this.service.GetDatabaseConfig().subscribe(res => {
      this.CompanyData = res;
    });
  }
  getRemoveType() {

    this.service.GetRemoveTypes().subscribe(res => {
      this.RemoveTypes = res;
    });
  }
  backup() {
    if (!this.form.value.CompanyId) {
      this.utils.toast.error("Please select company!");
      return false;
    }
    if (!this.form.value.ProjectId) {
      this.utils.toast.error("Please select study!");
      return false;
    }
    let filterResult = this.ProjectData.filter(x => x.id == this.form.value.ProjectId);
    if (filterResult.length > 0) {
      this.StudyCode = filterResult[0].value
    }
    this.form.patchValue({
      Status : 1
    });
    const data = {
      id: this.form.value.Id != null ? this.form.value.Id : 0,
      projectId: this.form.value.ProjectId,
      isArchieve: this.form.value.IsArchieve,
      isApplicationBackup: this.form.value.IsApplicationBackup,
      isDatabaseBackup: this.form.value.IsDatabaseBackup,
      isDocumentArchieve: this.form.value.IsDocumentArchieve,
      isDelete: this.form.value.IsDelete,
      companyId: this.form.value.CompanyId,
      studyCode: this.StudyCode
    } as ProjectDataRemoveModel
    this.utils.toast.success("Backup process started!");
    this.subs = this.service.BackupDatabase(data).subscribe((res: any) => {

      this.form.setValue({
        Id: res.id,
        ProjectId: res.projectId,
        IsArchieve: res.isArchieve,
        IsApplicationBackup: res.isApplicationBackup,
        IsDatabaseBackup: res.isDatabaseBackup,
        IsDelete: res.isDelete,
        CompanyId: res.companyId,
        IsDocumentArchieve: res.isDocumentArchieve,
        StudyCode: this.StudyCode,
        Status: res.status,
        BackupDate: res.backupDate,
        ArchieveDate: res.archieveDate,
        RemoveDate: res.removeDate,
        ReasonId: res.reasonId,
        ReasonOth: res.reasonOth,
        Type: 1
      });
      this.utils.toast.success("Backup taken successfully!");
    },
      failed => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      });
  }

  DeleteStudy() {
    if (!this.form.value.CompanyId) {
      this.utils.toast.error("Please select company!");
      return false;
    }
    if (!this.form.value.ProjectId) {
      this.utils.toast.error("Please select study!");
      return false;
    }

    const dialogRef = this.dialog.open(DeleteStudyReasonDocumentComponent, { windowClass: 'white-modal modal-small' });
    dialogRef.result.then((result) => {

      if (!result) {
        return;
      }
      else {
        this.ReasonId = result.reasonId;
        this.ReasonOth = result.ReasonOth;
        this.fileModel = {
          base64: result.base64,
          extension: result.extension,
          size: result.size
        } as FileModel;
        const dialogRef1 = this.dialog.open(ElectronicSignatureComponent, { windowClass: 'white-modal modal-small' });
        dialogRef1.result.then((result1) => {

          if (!result1) {
            return;
          }
          else {
            this.deleteData();
          }

        });

      }

    });
  }
  deleteData() {
    let filterResult = this.ProjectData.filter(x => x.id == this.form.value.ProjectId);
    if (filterResult.length > 0) {
      this.StudyCode = filterResult[0].value
    }
    const data = {
      id: this.form.value.Id != null ? this.form.value.Id : 0,
      projectId: this.form.value.ProjectId,
      isArchieve: this.form.value.IsArchieve,
      isApplicationBackup: this.form.value.IsApplicationBackup,
      isDatabaseBackup: this.form.value.IsDatabaseBackup,
      isDelete: true,
      companyId: this.form.value.CompanyId,
      studyCode: this.StudyCode,
      base64: this.fileModel.base64,
      extension: this.fileModel.extension,
      reasonId: this.ReasonId,
      reasonOth: this.ReasonOth,
      status: this.form.value.Status,
      isDocumentArchieve: this.form.value.IsDocumentArchieve,
      backupDate: this.form.value.BackupDate,
      archieveDate: this.form.value.ArchieveDate
    } as ProjectDataRemoveModel
    this.subs = this.service.DeleteStudy(data).subscribe((res) => {

      this.form.setValue({
        Id: res.id,
        ProjectId: res.projectId,
        IsArchieve: res.isArchieve,
        IsApplicationBackup: res.isApplicationBackup,
        IsDatabaseBackup: res.isDatabaseBackup,
        IsDelete: res.isDelete,
        CompanyId: res.companyId,
        IsDocumentArchieve: res.isDocumentArchieve,
        StudyCode: this.StudyCode,
        Status: res.status,
        BackupDate: res.backupDate,
        ArchieveDate: res.archieveDate,
        RemoveDate: res.removeDate,
        Type: 1,
        ReasonId: res.reasonId,
        ReasonOth: res.reasonOth
      });
      this.utils.toast.success("Project removed successfully!");
    },
      failed => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      });

  }
  onBack(): void {
    this.showDetails = false;
  }
  onEdit(id: number): void {

    this.showDetails = true;
    this.form.reset();
    this.service.GetDataById(id).subscribe(res => {
      if (res != null && res.id > 0) {
        this.form.setValue({
          Id: res.id,
          ProjectId: res.projectId,
          IsArchieve: res.isArchieve,
          IsApplicationBackup: res.isApplicationBackup,
          IsDatabaseBackup: res.isDatabaseBackup,
          IsDelete: res.isDelete,
          CompanyId: res.companyId,
          IsDocumentArchieve: res.isDocumentArchieve,
          Status: res.status,
          BackupDate: res.backupDate,
          ArchieveDate: res.archieveDate,
          RemoveDate: res.removeDate,
          StudyCode: res.studyCode,
          Type: 1,
          ReasonId: res.reasonId,
          ReasonOth: res.reasonOth
        });
        this.service.GetDatabaseConfig().subscribe(res1 => {
          this.CompanyData = res1;
          if (this.CompanyData != null) {
            this.form.patchValue({
              CompanyId: res.companyId,
            });
            if (!res.isDelete) {
              this.service.GetStudyListByCompanyid(res.companyId).subscribe(res2 => {
                this.ProjectData = res2;
                if (this.ProjectData != null) {
                  this.form.patchValue({
                    ProjectId: res.projectId,
                  });
                }
              });
            }
            else {

              this.service.GetStudyListByprojectid(res.projectId, res.studyCode).subscribe(res2 => {
                this.ProjectData = res2;
                if (this.ProjectData != null) {
                  this.form.patchValue({
                    ProjectId: res.projectId,
                  });
                }
              });
            }
            this.IsShow = true;
            this.IsDropDownDisable = true;
          }
        });
      }

    });
  }
  ChangedType(id: number) {
    if (id == 1) {
      this.IsdeleteShow = true;
      this.IsArchieveShow = false;
    }
    if (id == 2) {
      this.IsArchieveShow = true;
      this.IsdeleteShow = false;
    }
  }
}
