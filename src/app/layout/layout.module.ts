import { DynamicLoaderComponent } from './dynamic-loading/dynamic-loader/dynamic-loader.component';
import { DynamicContainerComponent } from './dynamic-loading/dynamic-container/dynamic-container.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { CompHostDirective } from './dynamic-loading/comp-host.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
import { MenuModule,TabModule } from '@syncfusion/ej2-angular-navigations';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,   
    FormsModule,
    ReactiveFormsModule,    
    ClickOutsideModule,
    MenuModule,
    TabModule,
    SharedModule
  ],
  declarations: 
    [LayoutComponent
    ,HeaderComponent
    ,MenubarComponent
    ,SidebarMenuComponent
    ,CompHostDirective
    ,DynamicContainerComponent
    ,DynamicLoaderComponent,
    ChangePasswordComponent
  ]
})
export class AppLayoutModule {}
