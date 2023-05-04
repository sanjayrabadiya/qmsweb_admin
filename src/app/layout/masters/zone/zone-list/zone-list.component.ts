import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Column, ExcelExportProperties, GridComponent, PdfExportProperties } from '@syncfusion/ej2-angular-grids';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { Constant } from 'src/app/core/constants/constants';
import { UtilityService } from 'src/app/core/services/utility.service';
import { MasterGridConfig } from 'src/app/shared/components/master-grid/master-grid.component';
import { GridDataBinding } from 'src/app/shared/directives/grid-data-binding.directive';
import { ZoneService } from '../zone.service';
import { ZoneModel } from '../ZoneModel';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html'
})
export class ZoneListComponent extends GridDataBinding implements OnInit {

  zoneList: ZoneModel[];
  // public now: Date = new Date();
  moduleId = Constant.AuditModules.Common;
  // securityObj: any;
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
  data: any[];
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


  constructor(private utils: UtilityService, private service: ZoneService,) {
    super();
    this.loadList();
  }

  ngOnInit(): void {
  }

  public itemBeforeEvent(args: MenuEventArgs) {
    (this.grid.columns[0] as Column).visible = false;
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'zone.pdf',
      };
      this.grid.pdfExport(pdfExportProperties);
    }

    if (args.item.id === 'Grid_excelexport') {
      const excelExportProperties: ExcelExportProperties = {
        fileName: 'zone.xlsx'
      };
      this.grid.excelExport(excelExportProperties);
    }

    if (args.item.id === 'Grid_csvexport') {
      const csvExportProperties: ExcelExportProperties = {
        fileName: 'zone.csv'
      };
      this.grid.csvExport(csvExportProperties);
    }
  }

  public onDeleteChange(isDelete?: any) {
    this.loadList(isDelete);
    if (isDelete) {
      this.grid.showColumns(['Deleted By', 'Deleted Date']);
    }
    else {
      this.grid.hideColumns(['Deleted By', 'Deleted Date']);
    }
  }

  public reloadData(): void {
    this.loadList(this.isDeleted);
  }

  loadList(isDelete?: boolean) {
    this.service.getAllZone(isDelete ? true : false).subscribe(res => {
      this.zoneList = res;
      //console.log("Zone List : ", res);
    });
  }

}