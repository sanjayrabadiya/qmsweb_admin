import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCompHost]',
})
export class CompHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
