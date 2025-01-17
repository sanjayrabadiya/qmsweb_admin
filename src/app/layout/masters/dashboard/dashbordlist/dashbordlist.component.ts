import { Component, Output, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { Constant } from 'src/app/core/constants/constants';
import { MasterGridConfig } from 'src/app/shared/components/master-grid/master-grid.component';
import { ExcelExportProperties, Column, PdfExportProperties, GridComponent } from '@syncfusion/ej2-angular-grids';
import { Subscription } from 'rxjs';
import { MenuEventArgs, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { UtilityService } from './../../../../core/services/utility.service';
import { DashbordService } from '../dashboard.service';
import {DashbordModel} from '../dashbord.model'
import { GridDataBinding } from 'src/app/shared/directives/grid-data-binding.directive';

@Component({
  selector: 'app-dashbordlist',
  templateUrl: './dashbordlist.component.html' 
})
export class DashbordlistComponent extends GridDataBinding implements OnInit {

    companyList: DashbordModel[];
    moduleId = Constant.AuditModules.Common;
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


  constructor(private utils: UtilityService,private service: DashbordService,) {  
    super();
    this.loadList();
 }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
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
    this.service.getAllCompany(isDelete ? true : false).subscribe(res =>
        this.companyList = res,
      );
}

}
