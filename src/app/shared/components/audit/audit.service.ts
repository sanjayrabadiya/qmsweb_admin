import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AuditReasonModel } from './audit.models';
import { AuditTrailModel, AuditTrailCommonModel } from 'src/app/core/models/audit-model';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  controllerName = 'AuditReason';
  constructor(private utils: UtilityService, private dialog: NgbModal) {}

  getAuditReasonDropDown(): Observable<AuditReasonModel[]> {
    return this.utils.data.get<AuditReasonModel[]>(`AuditReason/GetAuditReasonDropDown`);
  }

  search(search: AuditTrailModel): Observable<AuditTrailModel[]> {
    return this.utils.data.post<AuditTrailModel[]>(`AuditTrail/search`, search);
  }

  highlightControls(moduleId: number, tableId: number, recordId: number, elementRef: ElementRef, formGroup: FormGroup): void {
    const search = <AuditTrailModel>{
      moduleId: moduleId,
      tableId: tableId,
      recordId: recordId,
      reasonId: -1
    };

    this.search(search).subscribe((changes: AuditTrailModel[]) => {
      const save = formGroup.value;
      this.highlight(changes, moduleId, tableId, recordId, elementRef, save);
    });
  }

  private highlight(changes: AuditTrailModel[], moduleId: number, tableId: number, recordId: number, elementRef: ElementRef, save: any) {
    if (!save) {
      return;
    }
    const props = Object.getOwnPropertyNames(save);
    props.forEach((prop) => {
      if (typeof save[prop] === 'object') {
        this.highlight(changes, moduleId, tableId, recordId, elementRef, save[prop]);
      } else {
        const control = elementRef.nativeElement.querySelector(`[formControlName='${prop}']`);

        if (control) {
          const hasChanged = changes.some((t) => {
            return t.columnName === prop;
          });

          const element = control.nextSibling && control.nextSibling.classList ? control.nextSibling : null;
          if (element) {
            if (hasChanged) {
              element.classList.add('control-history');
              const dialog = this.dialog;
              const searchField = <AuditTrailModel>{
                moduleId: moduleId,
                tableId: tableId,
                recordId: recordId,
                columnName: prop
              };

              element.clickListener = function () {
                // dialog.open(AuditHistoryComponent, {
                //     data: { search: searchField }
                // });
              };

              element.addEventListener('click', element.clickListener);
            } else {
              element.classList.remove('control-history');
              element.removeEventListener('click', element.clickListener);
            }
          }
        }
      }
    });
  }

  normalizeControls(elementRef: ElementRef, formGroup: FormGroup): void {
    const save = formGroup.value;
    this.normalize(elementRef, save);
  }

  private normalize(elementRef: ElementRef, save: any) {
    if (!save) {
      return;
    }
    const props = Object.getOwnPropertyNames(save);
    props.forEach((prop) => {
      if (typeof save[prop] === 'object') {
        this.normalize(elementRef, save[prop]);
      } else {
        const control = elementRef.nativeElement.querySelector(`[formControlName='${prop}']`);

        if (control) {
          const element = control.nextSibling && control.nextSibling.classList ? control.nextSibling : null;
          if (element) {
            element.classList.remove('control-history');
            element.removeEventListener('click', element.clickListener);
          }
        }
      }
    });
  }

  getAuditTrialData(search: AuditTrailCommonModel): Observable<AuditTrailCommonModel[]> {
    return this.utils.data.post<AuditTrailCommonModel[]>(`AuditTrailCommon/search`, search);
  }
}
