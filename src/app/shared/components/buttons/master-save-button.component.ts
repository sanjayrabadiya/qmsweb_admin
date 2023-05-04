import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuditDeleteReasonComponent } from '../audit/audit-delete-reason/audit-delete-reason.component';

@Component({
  selector: 'master-save-button',
  template: `
    <button *addOrEditRights kendoButton (click)="onSave()" class="btn-main btn-master-success top-btns" [disabled]="formGroup.invalid || formGroup.pristine">
      <i class="fa fa-save"></i> Submit
    </button>
  `
})
export class MasterSaveButtonComponent {
  @Output() saveClick: EventEmitter<any> = new EventEmitter();
  @Input() formGroup: FormGroup;
  @Input() id: number;
  @Input() moduleId: number;
  constructor(private dialog: NgbModal) {}

  onSave() {
    if (!this.id) {
      this.saveClick.emit();
      return;
    }
    const dialogRef = this.dialog.open(AuditDeleteReasonComponent);
    dialogRef.result.then((result) => {
      if (result) {
        this.saveClick.emit();
      }
    });
  }
}
