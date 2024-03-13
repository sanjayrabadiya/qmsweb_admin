import { AuditService } from './../audit.service';
import { Component, OnInit, Input } from '@angular/core';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { UtilityService } from 'src/app/core/services/utility.service';
import { AuditReasonModel } from '../audit.models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-audit-delete-reason',
  templateUrl: './audit-delete-reason.component.html'
})
export class AuditDeleteReasonComponent extends Destroyer implements OnInit {
  @Input() data: any;
  auditReasons: AuditReasonModel[];
  dataItem: any = {};
  /* Combobox Property */
  public fields = { text: 'value', value: 'id' };
  constructor(private utils: UtilityService, private auditService: AuditService, public activeModal: NgbActiveModal) {
    super();
  }

  ngOnInit(): void {
    this.subs = this.auditService.getAuditReasonDropDown().subscribe((res) => (this.auditReasons = res));
  }

  close() {
    this.activeModal.close();
  }

  proceed() {
    this.utils.storage.setAuditReason(this.dataItem);
    this.activeModal.close(this.dataItem);
  }

  reasonChanged(id: string) {
    if (id == "1") {
      this.dataItem.isOther = true;
    }
    else {
      this.dataItem.isOther = false;
    }
  }

  isInvalid(): boolean {
    const invalid = !this.dataItem.reasonId || (this.dataItem.isOther && !this.dataItem.reasonOth);

    return invalid;
  }
}
