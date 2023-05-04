import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentTabItem } from '../dynamic-loading.models';
import { BreadcrumbService } from '../../components/menubar/breadcrumb.service';
import { TabComponent,SelectEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-dynamic-container',
  templateUrl: './dynamic-container.component.html'
})
export class DynamicContainerComponent implements OnInit {
  tabItems: ComponentTabItem[] = [];
  menuItems: ComponentTabItem[] = [];
  constructor(private breadcrumbDataService: BreadcrumbService) { }
  currentModules: ComponentTabItem[] = [];
  currentOpenItems: any[] = [];
  @ViewChild('reloadcomponet') reloadcomponet;
  @ViewChild('dynamicTab') tabObj: TabComponent;

  ngOnInit(): void {
    this.initiazeMenuItems();
  }
  public onTabSelect(e: SelectEventArgs) {  
    for (let i = 0; i < this.tabItems.length; i++) {
      //this.tabItems[i].selected = i === e.index;
      this.tabItems[i].selected = i === e.selectedIndex;
    }
    const selectedtabItem = this.tabItems.find(x => x.selected === true);
    //this.reloadcomponet.reloadComponent(selectedtabItem);
    this.breadcrumbDataService.changeMain(selectedtabItem.masterMenu);
    this.breadcrumbDataService.changeSub(selectedtabItem.title);
  }

  initiazeMenuItems() {
    // this.menuItems.push(new ComponentTabItem(CountryComponent, 'country', 'Country', null));
    // this.menuItems.push(new ComponentTabItem(StateComponent, 'state', 'State', null));
    // this.menuItems.push(new ComponentTabItem(CityComponent, 'city', 'City', null));
    // this.menuItems.push(new ComponentTabItem(AreaComponent, 'are', 'Area', null));
  }

  addTabItem(newItem: ComponentTabItem) {
    const exists = this.tabItems.find((t) => t.componentId === newItem.componentId);
    if (exists) {
      exists.selected = true;
      this.tabObj.selectedItem = this.tabItems.indexOf(this.tabItems.find((t) => t.componentId === newItem.componentId))
      this.tabItems.filter((t) => t.componentId !== newItem.componentId).forEach((tab) => (tab.selected = false));
    } else {
      this.tabItems.forEach((tab) => (tab.selected = false));
      newItem.selected = true;
      this.tabItems.push(newItem);
      setTimeout(() => {
        this.tabObj.selectedItem = this.tabItems.indexOf(this.tabItems.find((t) => t.componentId === newItem.componentId))
      }, 100);
    }
  }

  removeTabItem(removeItem: ComponentTabItem) {
    console.log(removeItem);
    if (removeItem.selected) {
      let i = this.tabItems.indexOf(removeItem);
      if (i < this.tabItems.length - 1) {
        i += 1;
        this.tabObj.selectedItem = i;
      } else {
        i -= 1;
        this.tabObj.selectedItem = i;
      }
      const id = this.tabItems[i].componentId;
      const exists = this.tabItems.find((t) => t.componentId === id);
      exists.selected = true;
    }

    this.tabItems = this.tabItems.filter((item) => item !== removeItem);
    console.log(this.tabItems);
    this.breadcrumbDataService.changeMain(this.tabItems.find(x => x.selected === true).masterMenu);
    this.breadcrumbDataService.changeSub(this.tabItems.find(x => x.selected === true).title)
    localStorage.setItem('currentOpenMenu', JSON.stringify(this.tabItems));
    if (this.tabItems.length === 1) {
      const selectedtabItem = this.tabItems[0];
      this.reloadcomponet.reloadComponent(selectedtabItem);
    }
  }

  // async loadLazyModue(id: string) {
  //   let module: any;
  //   if (id === 'lazy') {
  //     module = await import('src/app/dynamic-loading/component/lazy/lazy.module');
  //   } else if (id === 'lazy2') {
  //     module = await import('src/app/dynamic-loading/component/lazy2/lazy2.module');
  //   }
  //   if (module) {
  //     const items: ComponentTabItem[] = module.menuItems as ComponentTabItem[];
  //     this.menuItems.push(...items);
  //   }
  // }
}
