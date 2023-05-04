import { UtilityService } from 'src/app/core/services/utility.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComponentTabItem } from '../../dynamic-loading/dynamic-loading.models';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  @Output() itemClicked: EventEmitter<ComponentTabItem> = new EventEmitter();
  @Output() hideMenu: EventEmitter<void> = new EventEmitter();
  @Output() mainMenu: EventEmitter<string> = new EventEmitter();
  @Output() subMenu: EventEmitter<string> = new EventEmitter();
  currentModules: ComponentTabItem[] = [];
  currentOpenItems: any[] = [];
  modules = [
    {
      id: 'mnu_master',
      name: 'Masters',
      icon: 'fa-line-chart'
    },
    {
      id: 'mnu_usermanagement',
      name: 'User Management',
      icon: 'fa-user'
    }
  ];

  selectedModule: any;
  menuItems: ComponentTabItem[] = [];

  visability: boolean;
  target: any;

  constructor(private utils: UtilityService) { }

  ngOnInit(): void {

    this.loadCurrentModule();
    //const rights = this.utils.storage.Rights;
    // this.modules = this.modules.filter((module) => rights.some((t) => t.screenCode === module.id));
  }

  showDivs() {
    this.visability = true;
  }
  async loadCurrentModule() {

    await import('src/app/layout/masters/masters.module').then((result) => result.menuItems.length ? result.menuItems.map(item => this.currentModules.push(item)) : "");


    if (this.currentModules) {
      this.currentOpenItems = localStorage.getItem("currentOpenMenu") !== null ? JSON.parse(localStorage.getItem("currentOpenMenu")) : [];
      if (this.currentOpenItems.length) {
        this.currentOpenItems.map(x => {
          console.log(this.currentOpenItems);
          this.loadItem(this.currentModules.find(y => y.componentId === x.componentId))
        });
      }
    }

  }


  async loadLazyModue(moduleToLoad: any) {

    let module: any;
    this.selectedModule = moduleToLoad;
    this.visability = false;
    //module = await import('src/app/layout/masters/masters.module');

    if (moduleToLoad.id === 'mnu_master') {
      module = await import('src/app/layout/masters/masters.module');
    }
    if (module) {
      this.visability = true;
      // const rights = this.utils.storage.Rights;
      const allItems = module.menuItems as ComponentTabItem[];
      this.menuItems = allItems;
      // this.menuItems = allItems.filter((item) => rights.some((t) => t.screenCode === item.componentId));
    }
    this.mainMenu.emit(this.selectedModule.name);
  }

  loadItem(item: ComponentTabItem) {
  
    this.currentOpenItems.push(item);
    this.currentOpenItems = this.currentOpenItems.filter(x => x !== undefined);
    if (item.componentId !== 'mnu_queeryManagement') {
      var resultItems = this.currentOpenItems.reduce((unique, o) => {
        if (!unique.some(obj => obj.componentId === o.componentId)) {
          unique.push(o);
        }
        return unique;
      }, []);
      localStorage.setItem("currentOpenMenu", JSON.stringify(resultItems));
    }
    this.visability = false;
    this.itemClicked.emit(item);
    this.mainMenu.emit(item.masterMenu);
    this.subMenu.emit(item.title);
  }
}
