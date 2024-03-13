import { AuditDeleteReasonComponent } from './../../../shared/components/audit/audit-delete-reason/audit-delete-reason.component';
import { UtilityService } from './../../../core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DashbordModel, StudyConfig, CompanyModuleModel, ChildCompnayModel } from './dashbord.model';
import { DashbordService } from './dashboard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuEventArgs, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { StudyconfigComponent } from './studyconfig/studyconfig.component'
import { StudymoduleComponent } from './studymodule/studymodule.component'
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { Constant } from './../../../core/constants/constants';
import { ZoneModel } from '../zone/ZoneModel';
import { ChildCompanyComponent } from './child-company/child-company.component';
import { MasterGridConfig } from 'src/app/shared/components/master-grid/master-grid.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends MasterPage<DashbordModel> implements OnInit {

  public headerText = [{ text: 'Company Details', visible: true }, { text: 'Database Config', visible: false }, { text: 'Company features', visible: false }, { text: 'Study Setup', visible: false }, { text: 'Study config', visible: false },
  { text: 'Child Company', visible: false }];
  public pageSettings: Object;
  moduleId = Constant.AuditModules.Common;
  selectedTab: any;
  studyList: StudyConfig[];
  companyID = 0;
  List1 : ChildCompnayModel[];
  displayType = 1;
  public commanddata;
  pageSize = 20;
  public fields: Object = { text: 'zoneName', value: 'id', visible: true };
  zoneList: ZoneModel[];
  public currentStep = 0
  isDeleted: boolean = false;
@Input() config: MasterGridConfig;  
  @ViewChild('gristudysetup') public gristudysetup;
  @ViewChild('treeview')
  public tree: TreeViewComponent;
  permissions: CompanyModuleModel[] = [];
  savePermission: CompanyModuleModel[] = [];
  public rolefield: object;
  public showCheckBox: boolean = true;

  @Output() deleteClick: EventEmitter<any> = new EventEmitter();
  @Output() addClick: EventEmitter<any> = new EventEmitter();
  @Output() editClick: EventEmitter<any> = new EventEmitter();
  @Output() onBackClick: EventEmitter<any> = new EventEmitter();
  searchText = '';
  public items: ItemModel[] = [
    {
      id: 'Grid_excelexport',
      text: 'To Excel',
      iconCss: 'las la-file-excel'
    },
    {
      id: 'Grid_pdfexport',
      text: 'To PDF',
      iconCss: 'las la-file-pdf'
    },
    {
      id: 'Grid_csvexport',
      text: 'To CSV',
      iconCss: 'las la-file-csv'
    }];
  ;
  constructor(public service: DashbordService, private formBuilder: FormBuilder, private dialog: NgbModal, private utils: UtilityService) {
    super(service);
  }

  ngOnInit(): void {
    this.pageSettings = { pageSizes: true, pageSize: 20 };
    this.loadZoneList();
    this.initGrid();
    this.initForm();
    this.initChildGrid();
  }

  initGrid(): void {
    this.gridConfig = {
      table: 'Company',
      title: 'Company List',
      screenCode: 'company',
      columns: [
        
      ]
    };
  }

  initChildGrid() :void{
    this.gridConfig1 = {
      table: 'Child Company',
      title: 'Child Company List',
      screenCode: 'company',
      columns: [
      ]
    };
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      companyCode: ['', Validators.required],
      companyName: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required],
      noofStudy: [0],
      zoneMasterId: ['', Validators.required]
    });
  }

  onReset(): void {
    this.form.reset();
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }

  onEdit(id: number): void {
    this.companyID = id
    this.id = id;
    this.form.reset();
    this.subs = this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
    
      this.form.setValue({
        companyCode: data.companyCode,
        companyName: data.companyName,
        phone: data.phone,
        address: data.address,
        email: data.email,
        noofStudy: data.noofStudy,
        zoneMasterId: data.zoneMasterId,
        type: data.type.toString(),
      });
      this.changeType(data.type);
    });
  }

  onSave(): void {
    if (!this.id) {
      this.onSaveAfter();
      return;
    }
    const dialogRef = this.dialog.open(AuditDeleteReasonComponent, { windowClass: 'white-modal modal-small' });
    dialogRef.componentInstance.data = { message: '', moduleId: 1 };
    dialogRef.result.then((result) => {
      if (result) {
        this.onSaveAfter();
      }
    });
  }

  onSaveAfter() {
    const data = this.form.value;
    data.id = this.id;
    data.noofStudy = 10;
    this.subs = this.service.save(data, this.id).subscribe(
      (res) => {
        this.showDetails = false;
        this.utils.toast.recordSaved();
        this.companyID = res;
        this.selectedTab.selectingIndex = 1;
      },
      (failed) => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      }
    );
  }

  onBack(): void {
    this.showDetails = false;
    this.companyID = 0;
  }

  public select(event: any) {

    this.commanddata = { companyID: this.companyID};
    if (this.companyID === 0) {
      event.cancel = true;
      return;
    }
    if (event.selectingIndex === 2) {
      this.loadCompanyfeature(this.companyID);
    }
    if (event.selectingIndex === 3) {
      this.loadStudy(false);
    }
    if (event.selectingIndex === 4) {
      this.loadChildCompany(this.companyID);
    }
  }

  selected(event: any) {
    this.selectedTab = event;
  }

  onDeleteDatabaseconfig(id: number) {
    const dialogRef = this.dialog.open(AuditDeleteReasonComponent, { windowClass: 'white-modal modal-small' });
    dialogRef.componentInstance.data = { message: '', moduleId: 1 };
    dialogRef.result.then((result) => {
      if (result) {
        this.subs = this.service.deleteStudy(id).subscribe(
          () => {
            this.utils.storage.removeAuditReason();
            this.utils.toast.recordDeleted();
            this.loadStudy(this.isDeleted);
          },
          (failed) => {
            this.utils.toast.error(failed.error.message[0], 'Error');
          }
        );
      }
    });
  }

  onAssignStudyModule(id: number) {
    this.openModuleconfigPopup(id);
  }

  openModuleconfigPopup(id: number) {
    const save = {
      id: id
    } as StudyConfig;

    const dialogRef = this.dialog.open(StudymoduleComponent, { windowClass: 'white-modal modal-small' });
    dialogRef.componentInstance.data = save;
    dialogRef.result.then((result) => {
      if (result) {
        //this.loadContacts();
      }
    });
  }

  public exportBeforeEvent(args: MenuEventArgs) {
    
  }

  changeType(type: number) {
    this.displayType = type;
    if (type == 1) {
      this.headerText = [
        { text: 'Company Details', visible: true },
        { text: 'Database Config', visible: false },
        { text: 'Company features', visible: true },
        { text: 'Study Setup', visible: false },
        { text: 'Study config', visible: true },
        { text: 'Child Company', visible: false }];
    } else {
      this.headerText = [
        { text: 'Company Details', visible: true },
        { text: 'Database Config', visible: true },
        { text: 'Company features', visible: false },
        { text: 'Study Setup', visible: true },
        { text: 'Study config', visible: false },
        { text: 'Child Company', visible: true }];
    }

  }


  openstudyconfigPopup(studyconfig: StudyConfig) {

    const save = {
      companyID: this.companyID,
      // type:this.type,
      id: studyconfig == null ? 0 : studyconfig.id,
      noofStudy: studyconfig == null ? 0 : studyconfig.noofStudy,
      validFrom: studyconfig == null ? null : studyconfig.validFrom,
      validTo: studyconfig == null ? null : studyconfig.validTo
    } as StudyConfig;

    const dialogRef = this.dialog.open(StudyconfigComponent, { windowClass: 'white-modal modal-small' });
    dialogRef.componentInstance.data = save;
    dialogRef.result.then((result) => {

      this.loadStudy();

    });
  }


  loadStudy(isDelete?: boolean) {
    
    this.service.getAllStudy(isDelete ? true : false).subscribe(res =>
      this.studyList = res,
    );
  }

  public onDeleteChange(isDelete?: any) {
    this.loadStudy(isDelete);
    if (isDelete) {
      this.gristudysetup.showColumns(['Deleted By', 'Deleted Date']);
    }
    else {
      this.gristudysetup.hideColumns(['Deleted By', 'Deleted Date']);
    }
  }


  onActivate(id: number) {
    const dialogRef = this.dialog.open(AuditDeleteReasonComponent, { windowClass: 'white-modal modal-small' });
    dialogRef.componentInstance.data = { message: '', moduleId: 1 };
    dialogRef.result.then((result) => {
      if (result) {
        this.subs = this.service.patchStudy(id).subscribe(
          () => {
            this.utils.storage.removeAuditReason();
            this.utils.toast.recordActivated();
            this.loadStudy(true);
          },
          (failed) => {
            this.utils.toast.error(failed.error.message[0], 'Error');
          }
        );
      }
    });
  }

  onEditStudy(data: any) {
    this.openstudyconfigPopup(data);
  }

  loadCompanyfeature(companyID: number) {
    this.service.getCompanyModules(companyID).subscribe((data) => {
      this.permissions = data;
      this.savePermission = data;
      this.rolefield = {
        dataSource: this.permissions, id: 'moduleID', parentID: 'parentModuleID', text: 'moduleName',
        hasChildren: 'hasChild', isChecked: 'canActive'
      };
    },
      failed => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      });
  }

  public nodeChecked(args): void {
    this.savePermission = [];
    this.tree.checkedNodes.forEach(element => {
      const dataobj = this.permissions.find(a => a.moduleID == parseInt(element))
      if (dataobj.parentModuleID != null) {
        this.savePermission.push({ moduleID: dataobj.moduleID, moduleCode: dataobj.moduleCode, moduleName: dataobj.moduleName, parentModuleID: dataobj.parentModuleID, canActive: true, hasChild: dataobj.hasChild, companyID: this.companyID });
        if (dataobj.parentModuleID != null) {
          if (this.savePermission.findIndex(x => x.moduleID == dataobj.parentModuleID) == -1) {
            const dataobjp = this.permissions.find(a => a.moduleID == dataobj.parentModuleID)
            this.savePermission.push({ moduleID: dataobjp.moduleID, moduleCode: dataobjp.moduleCode, moduleName: dataobjp.moduleName, parentModuleID: dataobjp.parentModuleID, canActive: true, hasChild: dataobjp.hasChild, companyID: this.companyID });
          }
        }
      }
    });
  }

  saveCompanyfeatures(): void {
    this.service.saveCompanyFeatures(this.savePermission).subscribe((res: any) => {
      this.utils.toast.recordSaved();
      this.loadCompanyfeature(this.companyID);
    });
  }

  loadZoneList() {
    this.service.getZoneList().subscribe((res) => {
      this.zoneList = res as ZoneModel[];
      console.log("Zone List : ", res);
    });
  }

  //Chirag 
  loadChildCompany(companyID: number){
    this.service.getChildCompany(companyID).subscribe(res =>
      this.List1 = res,
    );
  }

  openCompanyPopup(data: ChildCompnayModel){
    const save = {
      id: data == null ? 0 : data.id,
      childcompanyCode : data == null ? false : data.childcompanyCode,
      companyCode: data == null ? false : data.companyCode,
      childcompanyName: data == null ? false : data.childcompanyName,
      childaddress: data == null ? false : data.childaddress,
      childemail: data == null ? false : data.childemail,
      childphone: data == null ? 0 : data.childphone,
      parentCompnayId: this.companyID,
      childzoneMasterId :  data == null ? 0 : data.childzoneMasterId,
      zoneList : this.zoneList
    } as ChildCompnayModel;
  
    const dialogRef = this.dialog.open(ChildCompanyComponent, { windowClass: 'white-modal modal-medium' });
    debugger;
    
    dialogRef.componentInstance.data = save;
   
    console.log(save);
    dialogRef.result.then((result) => {
      if (result) {
        this.loadChildCompany(this.companyID);
      }
    });
  }

  DeleteCompnay(data: ChildCompnayModel){
    let id = data.id
    console.log(id);
    this.service.DeleteCompany(id).subscribe(res=>{
      this.utils.toast.success("Child Company Deleted Successfully.");
      this.loadChildCompany(this.companyID);
    })

   
  }
  



}
