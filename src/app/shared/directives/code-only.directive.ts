import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[codeOnly]'
})
export class CodeOnlyDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const originalValue = this.elementRef.nativeElement.value;
    this.elementRef.nativeElement.value = originalValue.replace(/[^1-9-]*/g, '');
    if (originalValue !== this.elementRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
