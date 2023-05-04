import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[numOnly]'
})
export class NumbersOnlyDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const originalValue = this.elementRef.nativeElement.value;
    this.elementRef.nativeElement.value = originalValue.replace(/[^0-9]*/g, '');
    if (originalValue !== this.elementRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
