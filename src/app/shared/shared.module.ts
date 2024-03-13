
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GridModule, SortService, GroupService, PageService, ToolbarService, SearchService, 
  PdfExportService, ExcelExportService, SelectionService, ResizeService, DetailRowService, 
  CommandColumnService, ContextMenuService, EditService,GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { PartialDateComponent } from './components/partial-date/partial-date.component';
import { AuditDeleteReasonComponent } from './components/audit/audit-delete-reason/audit-delete-reason.component';
import { GridSettingsComponent } from './components/master-grid/grid-settings/grid-settings.component';
import { GridActiveButtonComponent } from './components/buttons/grid-active-button.component';
import { GridButtonsComponent } from './components/buttons/grid-button.component';
import { GridDeleteButtonComponent } from './components/buttons/grid-delete-button.component';
import { GridSettingsButtonComponent } from './components/buttons/grid-settings-button.component';
import { MasterHeaderComponent } from './components/buttons/master-header.component';
import { MasterSaveButtonComponent } from './components/buttons/master-save-button.component';
import { MasterGridComponent } from './components/master-grid/master-grid.component';
import { AuditHistoryCommonButtonComponent } from './components/buttons/audit-history-common-button.component';
import { AuditHistoryCommonComponent } from './components/audit/audit-history-common/audit-history-common.component';
import { ButtonModule, CheckBoxModule,SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxSelectionService,ComboBoxModule  } from '@syncfusion/ej2-angular-dropdowns';
import { AccordionModule, TabModule, ToolbarAllModule, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { DatePickerComponent, DatePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { ConfirmationDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { DocumentEditorModule, DocumentEditorContainerModule, EditorService, SfdtExportService, TextExportService } from '@syncfusion/ej2-angular-documenteditor';
import { AccumulationLegendService, AccumulationTooltipService, AccumulationDataLabelService } from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [
    PartialDateComponent,
    AuditDeleteReasonComponent,
    ConfirmationDialogComponent,
    GridSettingsComponent,
    GridActiveButtonComponent,
    GridButtonsComponent,
    GridDeleteButtonComponent,
    GridSettingsButtonComponent,
    MasterHeaderComponent,
    MasterSaveButtonComponent,
    MasterGridComponent,
    AuditHistoryCommonButtonComponent,
    AuditHistoryCommonComponent   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
    ButtonModule,    
    GridModule,
    GridAllModule,
    ToolbarAllModule,
    CheckBoxModule,
    DropDownButtonModule,
    RouterModule,   
    ComboBoxModule,
    DatePickerModule,
    TimePickerModule,
    SliderModule,
    //SignaturePadModule,
    SwitchModule,
    NgbModalModule,
    TreeViewModule,
    NgxPaginationModule,
    NgxSmartModalModule.forRoot(),
    CheckBoxModule,
    ButtonModule,
    TabModule,
    AccordionModule, DocumentEditorModule, DocumentEditorContainerModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,    
    GridModule,
    CheckBoxModule,
    ToolbarAllModule,
    DropDownButtonModule,
    PartialDateComponent,
    AuditDeleteReasonComponent,
    ConfirmationDialogComponent,
    GridSettingsComponent,
    GridActiveButtonComponent,
    GridButtonsComponent,
    GridDeleteButtonComponent,
    GridSettingsButtonComponent,
    MasterHeaderComponent,
    MasterSaveButtonComponent,
    MasterGridComponent, 
    AuditHistoryCommonButtonComponent,
    ComboBoxModule,   
    DatePickerModule,
    TimePickerModule,
    //SignaturePadModule,     
    GridAllModule,
    TabModule,
    AccordionModule, DocumentEditorModule, DocumentEditorContainerModule
  ],
  providers: [
    NgbActiveModal, NgxSmartModalService, ContextMenuService, EditService, AccumulationLegendService, AccumulationTooltipService
    , AccumulationDataLabelService, EditorService, SfdtExportService, TextExportService,
    
    CommandColumnService, DatePickerComponent,
    SortService, GroupService, PageService, ToolbarService, ExcelExportService, PdfExportService, SearchService, CheckBoxSelectionService,
    SelectionService, ResizeService, DetailRowService, SelectionService
  ],
  entryComponents: []
})
export class SharedModule {}
