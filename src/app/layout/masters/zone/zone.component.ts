import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/core/services/utility.service';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { IMasterPage } from 'src/app/shared/interfaces/imaster-page';
import { ZoneService } from './zone.service';
import { ZoneModel } from './ZoneModel';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html'
})
export class ZoneComponent extends MasterPage<ZoneModel> implements OnInit, IMasterPage {
  constructor(public service: ZoneService, private formBuilder: FormBuilder, private utils: UtilityService) {
    super(service);
  }

  ngOnInit(): void {
    this.initGrid();
    this.initForm();
  }

  initGrid(): void {
    this.gridConfig = {
      table: 'zone',
      title: 'Zone List',
      screenCode: this.data.screenCode,
      columns: [
        {
          field: 'id',
          title: 'Key',
          width: 120
        },
        {
          field: 'zoneName',
          title: 'Zone Name',
          width: 150
        },
        {
          field: 'applicationPath',
          title: 'Application Path',
          width: 150
        },
        {
          field: 'documentPath',
          title: 'Document Path',
          width: 150
        },
        {
          field: 'archievePath',
          title: 'Archieve Path',
          width: 150
        },
        {
          field: 'aPIUrl',
          title: 'Api Url',
          width: 150
        },
      ]
    };
  }
  onReset(): void {
    this.form.reset();
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      zoneName: ['', Validators.required],
      applicationPath: ['', Validators.required],
      documentPath: ['', Validators.required],
      archievePath: ['', Validators.required],
      apiUrl: ['', Validators.required],
      studyRemoveUploadDoc: ['', Validators.required],
      studyRemoveDownloadDocUrl: ['', Validators.required]
    });
  }
  onEdit(id: number): void {
    this.id = id;
    this.form.reset();
    this.subs = this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
      this.form.setValue({
        zoneName: data.zoneName,
        applicationPath: data.applicationPath,
        documentPath: data.documentPath,
        archievePath: data.archievePath,
        apiUrl: data.apiUrl,
        studyRemoveUploadDoc: data.studyRemoveUploadDoc,
        studyRemoveDownloadDocUrl : data.studyRemoveDownloadDocUrl
      });
    });
  }
  onSave(): void {
    const data = this.form.value;
    data.id = this.id;
    this.subs = this.service.save(data, this.id).subscribe((res) => {
      this.utils.storage.removeAuditReason();
      if (this.id > 0) this.utils.toast.success("Zone updated successfully");
      else this.utils.toast.success("Zone saved successfully");
      this.showDetails = false;
    });
  }
}
