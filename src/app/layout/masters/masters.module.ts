
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentTabItem } from '../dynamic-loading/dynamic-loading.models';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashbordlistComponent } from './dashboard/dashbordlist/dashbordlist.component';
import { TabModule, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { DocumentEditorContainerModule, DocumentEditorModule, DocumentEditorAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { DatabaseconfigComponent } from './dashboard/databaseconfig/databaseconfig.component';
import { StudyconfigComponent } from './dashboard/studyconfig/studyconfig.component';
import { StudyconfigPremiseComponent } from './dashboard/studyconfig-premise/studyconfig-premise.component';
import { StudymoduleComponent } from './dashboard/studymodule/studymodule.component';
import { ProjetRemoveComponent } from './dashboard/projectremove/projectremove.component';
import { ZoneListComponent } from './zone/zone-list/zone-list.component';
import { ZoneComponent } from './zone/zone.component';
import { ProjectDataRemoveListComponent } from './dashboard/projectremovelist/projectremovelist.component';
import { DeleteStudyReasonDocumentComponent } from './dashboard/projectremove/deletestudyreasondocument/deletestudyreasondocument.component';
import { ElectronicSignatureComponent } from './dashboard/projectremove/electronic-signature/electronic-signature.component';
import { DateTimeFormat } from 'src/app/shared/pipes/dateFormatTime.pipe';
import { StudyconfigListComponent } from './dashboard/studyconfig/studyconfiglist.component';
import { LoginPreferenceListComponent } from './dashboard/loginpreferencelist/loginpreferencelist.component';
import { LoginPreferenceComponent } from './dashboard/login-preference/login-preference.component';
import { ChildCompanyComponent } from './dashboard/child-company/child-company.component';
import { ChildCompanylistComponent } from './dashboard/child-companylist/child-companylist.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DashbordlistComponent,
    DatabaseconfigComponent,
    StudyconfigComponent,
    StudyconfigPremiseComponent,
    StudymoduleComponent,
    ProjetRemoveComponent,
    ProjectDataRemoveListComponent,
    ZoneListComponent,
    ZoneComponent,
    DeleteStudyReasonDocumentComponent,
    ElectronicSignatureComponent,
    StudyconfigListComponent,
    LoginPreferenceComponent,
    LoginPreferenceListComponent,
    ChildCompanyComponent,
    ChildCompanylistComponent
 
  ],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, GridModule, TabModule, TreeViewModule, DashboardLayoutModule, DocumentEditorContainerModule, DocumentEditorModule, DocumentEditorAllModule],
  providers: [DateTimeFormat]
})
export class MastersModule { }

export const menuItems: ComponentTabItem[] = [
  //new ComponentTabItem(ClientComponent, 'mnu_client', 'Client', null,null,'Masters'),
  new ComponentTabItem(DashboardComponent, 'mnu_dashboard', 'Dashboard', null, null, 'Masters'),
  new ComponentTabItem(ProjetRemoveComponent, 'mnu_projectremoveas', 'Study remove', null, null, 'Masters'),
  new ComponentTabItem(ZoneComponent, 'mnu_zone', 'Zone', null, null, 'Masters'),
  new ComponentTabItem(StudyconfigListComponent, 'mnu_studyconfig', 'Licensing', null, null, 'Masters'),
  new ComponentTabItem(LoginPreferenceListComponent, 'mnu_loginpreference', 'Login Preference', null, null, 'Masters')
  
];
