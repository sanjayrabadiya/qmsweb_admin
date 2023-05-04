import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuditTrailCommonModel } from 'src/app/core/models/audit-model';
import { AuditService } from '../audit.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent,ExcelExportProperties,PdfExportProperties, Column, TextWrapSettingsModel  } from '@syncfusion/ej2-angular-grids';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  selector: 'audit-history-common',
  templateUrl: './audit-history-common.component.html'
})
export class AuditHistoryCommonComponent implements OnInit {
  @Input() data: any;
  @Input() pageName:string;
  companyName = 'abc';
  public now: Date = new Date();
  AuditTrailData: AuditTrailCommonModel[];
  AuditTrailCommon: AuditTrailCommonModel;
  searchText='';
  public wrapSettings: TextWrapSettingsModel;

  public pageSettings: Object;
  public items: ItemModel[] = [
        {
            id:'Grid_excelexport',
            text: 'To Excel',
            iconCss: 'las la-file-excel'
        },
        {
            id:'Grid_pdfexport',
            text: 'To PDF',
            iconCss: 'las la-file-pdf'
        },
        {
            id:'Grid_csvexport',
            text: 'To CSV',
            iconCss: 'las la-file-csv'
  }];
  @ViewChild('grid') public grid: GridComponent;

  constructor(private _AuditTrialService: AuditService, public utilityService: UtilityService, public dialogRef: NgbActiveModal) {
  }
  ngOnInit(): void {  
    this.wrapSettings = { wrapMode: 'Content' };
    this.pageName = this.data.search.pageName;
    this.AuditTrailCommon = new AuditTrailCommonModel();
    this.AuditTrailCommon.tableName = this.data.search.tableName;
    this.AuditTrailCommon.pageName = this.data.search.pageName;
    this.AuditTrailCommon.recordId = this.data.search.recordId;
    this.companyName = this.utilityService.storage.CurrentUser.companyName;
    this.pageSettings = { pageSizes: true, pageSize: 20 };
    this._AuditTrialService.getAuditTrialData(this.AuditTrailCommon).subscribe((res) => (this.AuditTrailData = res));
  }
 
  close() {
    this.dialogRef.close(null);
  }

  public itemBeforeEvent (args: MenuEventArgs){
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
