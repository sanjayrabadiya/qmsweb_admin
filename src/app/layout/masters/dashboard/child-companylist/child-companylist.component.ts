import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChildCompnayModel } from '../dashbord.model';
import { MasterGridConfig } from 'src/app/shared/components/master-grid/master-grid.component';
import { Column, ExcelExportProperties, GridComponent, PdfExportProperties } from '@syncfusion/ej2-angular-grids';
import { GridDataBinding } from 'src/app/shared/directives/grid-data-binding.directive';
import { Subscription } from 'rxjs';
import { ItemModel } from '@syncfusion/ej2-splitbuttons/src/common/common-model';
import { UtilityService } from 'src/app/core/services/utility.service';
import { DashbordService } from '../dashboard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ChildCompanyComponent } from '../child-company/child-company.component';
import { MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { Constant } from 'src/app/core/constants/constants';

@Component({
  selector: 'app-child-companylist',
  templateUrl: './child-companylist.component.html',
  styleUrls: ['./child-companylist.component.scss']
})
export class ChildCompanylistComponent extends GridDataBinding implements OnInit {


  List: ChildCompnayModel[];
  moduleId = Constant.AuditModules.Common;
   @Input() data: any;
  @Input() config: MasterGridConfig;
  @Output() previewClick: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();
  @Output() addClick: EventEmitter<any> = new EventEmitter();
  @Output() editClick: EventEmitter<any> = new EventEmitter();
  @ViewChild('grid') public grid: GridComponent;

  public isDeleted = false;
  actionWidth = 100;
  public pageSettings: Object;
  @Input() searchObject: Object;
  private serviceSubscription: Subscription;
  //data: any[];
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


  constructor(private utils: UtilityService, private service: DashbordService, private dialog: NgbModal, private sanitizer: DomSanitizer) {
    super(); }

  ngOnInit(): void {
  
  }



//   public itemBeforeEvent(args: MenuEventArgs) {
//     (this.grid.columns[0] as Column).visible = false;
//     if (args.item.id === 'Grid_pdfexport') {
//         const pdfExportProperties: PdfExportProperties = {
//             fileName: 'new.pdf',
//         };
//         this.grid.pdfExport(pdfExportProperties);
//     }

//     if (args.item.id === 'Grid_excelexport') {
//         const excelExportProperties: ExcelExportProperties = {
//             fileName: 'new.xlsx'
//         };
//         this.grid.excelExport(excelExportProperties);
//     }

//     if (args.item.id === 'Grid_csvexport') {
//         const csvExportProperties: ExcelExportProperties = {
//             fileName: 'new.csv'
//         };
//         this.grid.csvExport(csvExportProperties);
//     }
// }





}
