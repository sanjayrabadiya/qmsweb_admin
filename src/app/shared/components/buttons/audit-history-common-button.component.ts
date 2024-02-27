import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuditTrailCommonModel } from 'src/app/core/models/audit-model';
import { AuditHistoryCommonComponent } from '../audit/audit-history-common/audit-history-common.component';

@Component({
  selector: 'audit-history-common-button',
  template: `
    <button type="button" class="btn-white btn-border mr-1 fs-14" (click)="onClick()" [disabled]="disabled">
      <span class="btn-circle-icon btn-cicle-blue">
        <img src="./assets/images/audit-icon.svg"  alt="audit-icon.svg" />
      </span>
      {{ text || 'Audit' }}
    </button>
  `
})
export class AuditHistoryCommonButtonComponent {
  @Input() disabled = false;
  @Input() text: string;
  @Input() tableName: string;
  @Input() recordId: number;
  @Input() pageName: string;

  constructor(private dialog: NgbModal) {}

  onClick() {
    const search = <AuditTrailCommonModel>{
      tableName: this.tableName,
      recordId: this.recordId,
      pageName: this.pageName
    };

    const dialogRef = this.dialog.open(AuditHistoryCommonComponent, {windowClass: 'white-modal modal-large'});
    dialogRef.componentInstance.data = { search: search };
  }
}
