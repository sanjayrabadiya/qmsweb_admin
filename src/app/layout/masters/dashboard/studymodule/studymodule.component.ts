import { UtilityService } from './../../../../core/services/utility.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DashbordService } from '../dashboard.service';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudyModuleModel } from '../dashbord.model'
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-studymodule',
  templateUrl: './studymodule.component.html'
})
export class StudymoduleComponent extends Destroyer implements OnInit {
  @Input() data: any;
  @ViewChild('treeview')
  public tree: TreeViewComponent;
  @Input() dataItem: any;
  permissions: StudyModuleModel[] = [];
  savePermission: StudyModuleModel[] = [];
  id: any = 0;
  public showCheckBox: boolean = true;
  public rolefield: object;
  constructor(private service: DashbordService, private formBuilder: FormBuilder, private dialog: NgbModal, private activeModal: NgbActiveModal,
    private utils: UtilityService) {
    super();
  }

  ngOnInit(): void {
    this.onEdit(this.data.id)
  }
  close() {
    this.activeModal.close();
  }
  onSave() {
    this.subs = this.service.saveStudyModule(this.savePermission).subscribe((res: any) => {
      this.utils.toast.recordSaved();
      this.activeModal.close(res);
    });
  }

  onReset(): void {
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }

  onPermission() {
    this.id = 0;
    this.permissions = [];
  }

  onEdit(id: number): void {
    this.id = id;
    this.subs = this.service
      .getModules(id)
      .subscribe((data: any[]) => {
        this.permissions = data;
        this.savePermission = data;
        this.rolefield = {
          dataSource: this.permissions, id: 'moduleID', parentID: 'parentModuleID', text: 'moduleName',
          hasChildren: 'hasChild', isChecked: 'canActive'
        };
      });
  }


  public nodeChecked(args): void {
    this.savePermission = [];
    this.tree.checkedNodes.forEach(element => {
      const dataobj = this.permissions.find(a => a.moduleID == parseInt(element))
      if (dataobj.parentModuleID != null) {
        this.savePermission.push({ moduleID: dataobj.moduleID, moduleCode: dataobj.moduleCode, moduleName: dataobj.moduleName, parentModuleID: dataobj.parentModuleID, canActive: true, hasChild: dataobj.hasChild, studyID: this.id });
        if (dataobj.parentModuleID != null) {
          if (this.savePermission.findIndex(x => x.moduleID == dataobj.parentModuleID) == -1) {
            const dataobjp = this.permissions.find(a => a.moduleID == dataobj.parentModuleID)
            this.savePermission.push({ moduleID: dataobjp.moduleID, moduleCode: dataobjp.moduleCode, moduleName: dataobjp.moduleName, parentModuleID: dataobjp.parentModuleID, canActive: true, hasChild: dataobjp.hasChild, studyID: this.id });
          }
        }
      }
    });
  }

}
