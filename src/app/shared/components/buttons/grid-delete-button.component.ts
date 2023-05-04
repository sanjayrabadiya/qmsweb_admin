import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UtilityService } from 'src/app/core/services/utility.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuditDeleteReasonComponent } from '../audit/audit-delete-reason/audit-delete-reason.component';
import { MasterGridComponent } from '../master-grid/master-grid.component';

@Component({
  selector: 'grid-delete-button',
  template: `
    <span>
      <span class="badge-grid-action badge-red" *ngIf="!dataItem.isDeleted" (click)="onDelete()">
        <i class="las la-trash text-red grd-edit-del"></i>
      </span>
    </span>
  `
})
export class GridDeleteButtonComponent {
  @Input() dataItem: any;
  @Input() screenCode: string;
  @Input() ctrlName: string;
  @Input() that: MasterGridComponent;
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Input() customMsg: string;
  @Input() moduleId: number;
  @Input() customDelete: number;

  constructor(private utils: UtilityService, private dialog: NgbModal) {}
  onDelete() {
    const dialogRef = this.dialog.open(AuditDeleteReasonComponent, {windowClass: 'white-modal modal-small'});
    dialogRef.componentInstance.data = { message: this.customMsg, moduleId: this.moduleId };
    dialogRef.result.then((result) => {
      if (result) {
        if (!this.that || this.customDelete) {
          this.deleteClick.emit();
        } else {
          this.utils.data.delete<void>(this.ctrlName, this.dataItem.id).subscribe(
            () => {
              this.utils.storage.removeAuditReason();
              this.utils.toast.recordDeleted();
              if (this.that.reloadData) {
                this.that.reloadData();
              }
              this.deleted.emit();
            },
            (failed) => {
              this.utils.toast.error(failed.error.message[0], 'Error');
            }
          );
        }
      }
    });
  }
}
