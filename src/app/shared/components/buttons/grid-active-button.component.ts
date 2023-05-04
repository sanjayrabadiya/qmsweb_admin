import { Component, Input } from '@angular/core';
import { UtilityService } from 'src/app/core/services/utility.service';
import { AuditDeleteReasonComponent } from '../audit/audit-delete-reason/audit-delete-reason.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterGridComponent } from '../master-grid/master-grid.component';

@Component({
  selector: 'grid-active-button',
  template: `
  <div>
  <span class="badge-grid-action badge-green" *ngIf="dataItem.isDeleted" (click)="onActivate()">
  <i class="fa fa-check-circle text-green grd-edit-del"></i>
  </span>
  </div>
  `
})
export class GridActiveButtonComponent {
  @Input() dataItem: any;
  @Input() screenCode: string;
  @Input() ctrlName: string;
  @Input() that: MasterGridComponent;
  @Input() moduleId: number;
  constructor(private utils: UtilityService, private dialog: NgbModal) {}
  onActivate() {
    const dialogRef = this.dialog.open(AuditDeleteReasonComponent, {windowClass: 'white-modal modal-small'});
    dialogRef.componentInstance.data = { moduleId: this.moduleId };
    dialogRef.result.then((result) => {
      if (result) {
        this.utils.data.patch<void>(this.ctrlName, this.dataItem.id).subscribe(
          () => {
            this.utils.storage.removeAuditReason();
            this.utils.toast.recordActivated();
            this.that.reloadData();
          },
          (failed) => {
            this.utils.toast.error(failed.error.message[0], 'Error');
          }
        );
      }
    });
  }
}
