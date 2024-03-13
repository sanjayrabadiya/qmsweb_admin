import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmationDialogComponent {
  @Input() data: any;
  constructor(public activeModal: NgbActiveModal) {
  }

  

  close() {
    this.activeModal.close(false);
  }

  proceed() {
    this.activeModal.close(true);
  }

}
