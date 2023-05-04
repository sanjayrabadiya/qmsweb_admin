import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MasterGridComponent } from '../master-grid/master-grid.component';

@Component({
  selector: 'grid-buttons',
  template: `

    <div class="form-row justify-content-center">
    <div class="col-md-auto px-1">
    <div>
      <span class="badge-grid-action badge-blue mr-2" *ngIf="!dataItem.isDeleted" (click)="editClick.emit(dataItem)">
        <i class="las la-edit text-blue grd-edit-del"></i>
      </span>
    </div>
    </div>
    <div class="col-md-auto px-1">
    <grid-delete-button
      [dataItem]="dataItem"
      [screenCode]="screenCode"
      [ctrlName]="ctrlName"
      [that]="that"
      [moduleId]="moduleId"
      [customDelete]="customDelete"
      (deleted)="deleted.emit()"
      (deleteClick)="deleteClick.emit(dataItem)"
    ></grid-delete-button>
    </div>
    <div class="col-md-auto px-1">
    <grid-active-button [dataItem]="dataItem" [screenCode]="screenCode" [ctrlName]="ctrlName" [that]="that" [moduleId]="moduleId"></grid-active-button>
    </div>
    </div>
  `
})
export class GridButtonsComponent {
  @Input() dataItem: any;
  @Input() editLink: string;
  @Input() screenCode: string;
  @Input() ctrlName: string;
  @Input() that: MasterGridComponent;
  @Input() moduleId: number;
  @Input() hideEdit: boolean;
  @Input() customDelete: boolean;
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();
  @Output() editClick: EventEmitter<any> = new EventEmitter();
}
