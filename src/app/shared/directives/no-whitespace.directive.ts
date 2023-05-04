import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[noSpace]'
})
export class NoWhiteSpaceDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const originalValue = this.elementRef.nativeElement.value;
    this.elementRef.nativeElement.value = originalValue.replace(/^\s+/g, '').replace(/  +/g, ' ');
    if (originalValue.startsWith(' ') || originalValue.endsWith('  ')) {
      event.stopPropagation();
    }
  }
}
