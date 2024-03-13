import { UtilityService } from '../../../../core/services/utility.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DashbordService } from '../dashboard.service';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuditDeleteReasonComponent } from 'src/app/shared/components/audit/audit-delete-reason/audit-delete-reason.component';
import { DeleteStudyConfig, StudyConfig } from '../dashbord.model'
import { MasterGridConfig } from 'src/app/shared/components/master-grid/master-grid.component';
import { Column, ExcelExportProperties, GridComponent, PdfExportProperties } from '@syncfusion/ej2-angular-grids';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { StudyconfigComponent } from './studyconfig.component';


@Component({
  selector: 'app-studyconfiglist',
  templateUrl: './studyconfiglist.component.html'
})
export class StudyconfigListComponent extends Destroyer implements OnInit {
  form: FormGroup;
  studyConfig: StudyConfig;
  @Input() data: any;
  studyList: StudyConfig[];
  public isDeleted = false;
  actionWidth = 100;
  public pageSettings: Object;
  deleteStudyConfig: DeleteStudyConfig;
  @Input() searchObject: Object;
  @Input() config: MasterGridConfig;
  @Output() previewClick: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();
  @Output() addClick: EventEmitter<any> = new EventEmitter();
  @Output() editClick: EventEmitter<any> = new EventEmitter();
  @ViewChild('grid') public grid: GridComponent;
  searchText = '';
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
  constructor(private service: DashbordService, private formBuilder: FormBuilder, private dialog: NgbModal, private activeModal: NgbActiveModal,
    private utils: UtilityService) {
    super();
  }

  ngOnInit(): void {
    this.loadStudy();
  }
  loadStudy(isDelete?: boolean) {
    this.service.getAllStudy(isDelete ? true : false).subscribe(res =>
      this.studyList = res,
    );
  }

  public onDeleteChange(isDelete?: any) {
    this.loadStudy(isDelete);
    if (isDelete) {
      this.grid.showColumns(['Deleted By', 'Deleted Date']);
    }
    else {
      this.grid.hideColumns(['Deleted By', 'Deleted Date']);
    }
  }
  onDeleteconfig(id: number) {
    
    const dialogRef = this.dialog.open(AuditDeleteReasonComponent, { windowClass: 'white-modal modal-small' });
    dialogRef.componentInstance.data = { message: '', moduleId: 1 };
    dialogRef.result.then((result) => {
      if (result) {
        
        this.deleteStudyConfig = {
          id: id,
          reasonId: result.reasonId,
          reasonOth: result.reasonOth
        } as DeleteStudyConfig
        this.subs = this.service.DeleteStudyconfig(this.deleteStudyConfig).subscribe(
          () => {
            this.utils.storage.removeAuditReason();
            this.utils.toast.recordDeleted();
            this.loadStudy(this.isDeleted);
          },
          (failed) => {
            this.utils.toast.error(failed.error.message[0], 'Error');
          }
        );
      }
    });
  }
  openstudyconfigPopup(studyconfig: StudyConfig) {

    const save = {
      companyID: studyconfig == null ? 0 : studyconfig.companyID,
      id: studyconfig == null ? 0 : studyconfig.id,
      noofStudy: studyconfig == null ? 0 : studyconfig.noofStudy,
      validFrom: studyconfig == null ? null : studyconfig.validFrom,
      validTo: studyconfig == null ? null : studyconfig.validTo
    } as StudyConfig;

    const dialogRef = this.dialog.open(StudyconfigComponent, { windowClass: 'white-modal modal-small' });
    dialogRef.componentInstance.data = save;
    dialogRef.result.then((result) => {

      this.loadStudy();

    });
  }

  onEditStudy(data: any) {
    this.openstudyconfigPopup(data);
  }

  public itemBeforeEvent(args: MenuEventArgs) {
    (this.grid.columns[0] as Column).visible = false;
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'new.pdf',
      };
      this.grid.pdfExport(pdfExportProperties);
    }

    if (args.item.id === 'Grid_excelexport') {
      const excelExportProperties: ExcelExportProperties = {
        fileName: 'new.xlsx'
      };
      this.grid.excelExport(excelExportProperties);
    }

    if (args.item.id === 'Grid_csvexport') {
      const csvExportProperties: ExcelExportProperties = {
        fileName: 'new.csv'
      };
      this.grid.csvExport(csvExportProperties);
    }
  }
}
