import { Injectable } from '@angular/core';
import { Constant } from '../constants/constants';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  private removeAuditReason() {
    localStorage.removeItem('audit-reason-id');
    localStorage.removeItem('audit-reason-oth');
  }

  recordDeleted(): void {
    this.removeAuditReason();
    this.success(Constant.message.deleteRecord);
  }
  recordActivated(): void {
    this.removeAuditReason();
    this.success(Constant.message.ActivatedRecord);
  }
  recordSaved(): void {
    this.removeAuditReason();
    this.success(Constant.message.saveRecord);
  }
  success(message: string): void {
    this.toastr.success(message);
  }
  info(message: string): void {
    this.toastr.info(message);
  }
  warning(message: string): void {
    this.toastr.warning(message);
  }
  error(message: string, title?: string): void {
    this.toastr.error(message);
  }
}
