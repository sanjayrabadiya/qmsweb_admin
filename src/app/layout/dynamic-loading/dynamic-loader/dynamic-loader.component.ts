import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ComponentTabItem, DynamicComponent } from '../dynamic-loading.models';
import { CompHostDirective } from '../comp-host.directive';

@Component({
  selector: 'app-dynamic-loader',
  templateUrl: './dynamic-loader.component.html'
})
export class DynamicLoaderComponent implements OnInit {
  @Input() item: ComponentTabItem;
  @ViewChild(CompHostDirective, { static: true }) compHost: CompHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.item.component);    
    const viewContainerRef = this.compHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<DynamicComponent>componentRef.instance).data = { screenCode: this.item.componentId };
  }

  reloadComponent(selectedComponent:ComponentTabItem) {    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(selectedComponent.component);
    const viewContainerRef = this.compHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<DynamicComponent>componentRef.instance).data = { screenCode: selectedComponent.componentId };
  }


}
