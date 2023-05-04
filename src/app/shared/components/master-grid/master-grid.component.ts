import { UtilityService } from './../../../core/services/utility.service';
import { Constant } from 'src/app/core/constants/constants';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { formatDate, formatNumber } from '@angular/common';
import { GridComponent,ExcelExportProperties,PdfExportProperties, Column  } from '@syncfusion/ej2-angular-grids';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-master-grid',
  templateUrl: './master-grid.component.html'
})
export class MasterGridComponent implements OnInit {
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
  searchText='';
  public isDeleted = false;
  data: any[];
  url: string;
  companyName = '';
  now = new Date();
  @Input() moduleId = Constant.AuditModules.Master;
  actionWidth = 100;

  @Input() config: MasterGridConfig;
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();
  @Output() addClick: EventEmitter<any> = new EventEmitter();
  @Output() editClick: EventEmitter<any> = new EventEmitter();

  private serviceSubscription: Subscription;
  @Input() searchObject: Object;

  constructor(private utils: UtilityService) {   
  }

  ngOnInit(): void {
    this.companyName = this.utils.storage.CurrentUser.companyName;
    this.pageSettings = { pageSizes: true, pageSize: 20 };
    this.url = this.config.table;
    if (this.config.query) {
      this.url += `/${this.config.query}`;
    }
    if (this.config.hideEdit) {
      this.actionWidth -= 35;
    }

    this.utils.data.get(this.url).subscribe((res: any[]) => {
      this.data = res;
    });
  }

  getValue(dataItem: any, col: MasterGridColumn) {
    let value: any;
    if (col.field.indexOf('.') !== -1) {
      const fields = col.field.split('.');
      value = dataItem;
      fields.forEach((t) => {
        if (!value) {
          return null;
        }

        value = value[t];
      });
    } else {
      value = dataItem[col.field];
    }

    if (value) {
      if (col.dataType === Constant.DataType.Date) {
        value = formatDate(value, 'dd/MM/yyyy', 'en');
      } else if (col.dataType === Constant.DataType.Number) {
        value = formatNumber(value, 'en', '1.0-2');
      }
    }
    return value;
  }

  public itemBeforeEvent (args: MenuEventArgs){
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
    if(isDelete)
      this.grid.showColumns(['Deleted By','Deleted Date']);
    else
      this.grid.hideColumns(['Deleted By','Deleted Date']);

    this.url = this.config.table;
      if (this.config.query) {
        this.url += `/${this.config.query}`;
      }
      if (this.config.hideEdit) {
        this.actionWidth -= 35;
      }
      this.serviceSubscription = this.utils.data.get<any[]>(this.url, isDelete).subscribe((result) => {
      this.data = result;
    });
  }

  public reloadData(): void {
    if (this.searchObject) {
        //   this.serviceSubscription = this.utils.data.post<any[]>(this.gridDataBinding, this.searchObject).subscribe((result) => {
        //   this.data = result;
        // });
    } else {

        if(this.isDeleted)
          this.grid.showColumns(['Deleted By','Deleted Date']);
        else
          this.grid.hideColumns(['Deleted By','Deleted Date']);
      
        this.url = this.config.table;
        if (this.config.query) {
          this.url += `/${this.config.query}`;
        }
        if (this.config.hideEdit) {
          this.actionWidth -= 35;
        }
        this.serviceSubscription = this.utils.data.get<any[]>(this.url, this.isDeleted).subscribe((result) => {
        this.data = result;
      });
    }
  }
}

export class MasterGridConfig {
  title?: string;
  table?: string;
  query?: string;
  hideToolbar?: boolean;
  hideEdit?: boolean;
  notPageable?: boolean;
  groupable?: boolean;
  columns?: MasterGridColumn[];
  customDelete?: boolean;
  screenCode?: string;
}

export class MasterGridColumn {
  field?: string;
  title?: string;
  width?: number;
  dataType?: number;
  button?: (d: any) => void;
}
