import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from './../../../core/constants/constants';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/core/services/utility.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuditDeleteReasonComponent } from '../audit/audit-delete-reason/audit-delete-reason.component';

@Component({
  selector: 'master-header',
  template: `
    <div class="card custom-card w-100 mb-3">
      <div class="card-body px-3 py-2">
        <div class="row align-items-center">
          <div class="col-auto mr-auto">
            <h4 class="mb-0">{{ id > 0 ? 'Edit ' : 'Add ' }}</h4>
          </div>
          <div class="col-md-auto col mobile-pr-0">
            <button type="button" class="btn-white btn-border mr-1" (click)="backClick.emit()">
              <span class="btn-circle-icon btn-cicle-red">
                <i class="las la-arrow-left"></i>
              </span>
              Back
            </button>

            <button type="button" class="btn-white btn-border mr-1" (click)="resetClick.emit()">
              <span class="btn-circle-icon btn-cicle-blue">
                <i class="las la-sync-alt"></i>
              </span>
              Reset
            </button>

            <button
              type="button"
              class="btn-white btn-border mr-1"
              (click)="onSave()"
              [disabled]="formGroup.invalid || formGroup.pristine"
            >
              <span class="btn-circle-icon btn-cicle-green">
                <img src="./assets/images/check-small.svg" />
              </span>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MasterHeaderComponent {
  @Input() title: string;
  @Input() tableName: string;
  @Output() saveClick: EventEmitter<any> = new EventEmitter();
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  @Output() resetClick: EventEmitter<any> = new EventEmitter();
  @Input() formGroup: FormGroup;
  @Input() id: number;
  @Input() screenCode: string;
  @Input() moduleId = Constant.AuditModules.Master;
  constructor(private utils: UtilityService, private dialog: NgbModal) { }

  onSave() {
    if (!this.id) {
      this.saveClick.emit();
      return;
    }

    const dialogRef = this.dialog.open(AuditDeleteReasonComponent, { windowClass: 'white-modal modal-small' });
    dialogRef.componentInstance.data = { message: '', moduleId: this.moduleId };

    dialogRef.result.then((result) => {
      if (result) {
        this.saveClick.emit();
      }
    });
  }
}
