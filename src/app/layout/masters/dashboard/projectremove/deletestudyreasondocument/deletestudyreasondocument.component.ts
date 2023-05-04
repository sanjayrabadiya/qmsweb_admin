import { Component, Output, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { Constant } from 'src/app/core/constants/constants';
import { Subscription } from 'rxjs';
import { MenuEventArgs, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { destroy } from '@syncfusion/ej2-angular-buttons';
import { UtilityService } from 'src/app/core/services/utility.service';
import { AuditService } from 'src/app/shared/components/audit/audit.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuditReasonModel } from 'src/app/shared/components/audit/audit.models';
import { FileModel } from './deletestudyreasondocument.model';



@Component({
    selector: 'app-deletestudyreasondocument',
    templateUrl: './deletestudyreasondocument.component.html'
})
export class DeleteStudyReasonDocumentComponent extends Destroyer implements OnInit {
    @Input() data: any;
    moduleId = Constant.AuditModules.Common;
    private serviceSubscription: Subscription;
    auditReasons: AuditReasonModel[];
    dataItem: any = {};
    private file: File;
    fileModel: FileModel;
    selectedFileName = '';
    @ViewChild('fileInput') fileInput;
    public fields = { text: 'value', value: 'id' };
    constructor(private utils: UtilityService, private auditService: AuditService, public activeModal: NgbActiveModal) {
        super();
    }

    ngOnInit(): void {
        this.subs = this.auditService.getAuditReasonDropDown().subscribe((res) => (this.auditReasons = res));
    }
    proceed() {
        if (!this.fileModel) {
            this.utils.toast.error('Please select upload file.');
            return;
        }
        this.utils.storage.setAuditReason(this.dataItem);
        this.dataItem.base64 = this.fileModel.base64;
        this.dataItem.extension = this.fileModel.extension;
        this.dataItem.size = this.fileModel.size;
        this.activeModal.close(this.dataItem);
    }

    reasonChanged(id: string) {
      
        const reason = this.auditReasons.find((t) => {
            return t.id === +id;
        });
        if (id == "1") {
            this.dataItem.isOther = true;
        }
        else {
            this.dataItem.isOther = false;
        }

    }

    isInvalid(): boolean {
        const invalid = !this.dataItem.reasonId || (this.dataItem.isOther && !this.dataItem.reasonOth);
        if (!invalid) {
            if (!this.fileModel) {
                return true;
            }
        }

        return invalid;
    }
    close() {
        this.activeModal.close();
    }
    fileChange(files: File[]) {
        this.file = this.fileInput.nativeElement.files[0];
        this.selectedFileName = '';
        if (files && files[0]) {
            const name = files[0].name;
            this.selectedFileName = name;
            const lastDot = name.lastIndexOf('.');
            const extension = name.substring(lastDot + 1);
            const size = files[0].size;
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = event => {
                this.fileModel = {
                    base64: reader.result,
                    extension: extension,
                    size: size
                } as FileModel;
            };
        }
    }
}
