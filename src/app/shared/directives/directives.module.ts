import { NgModule } from '@angular/core';
import { GridDataBindingDirective } from './grid-data-binding.directive';
import { DisableControlDirective } from './disable-control.directive';
import { NoWhiteSpaceDirective } from './no-whitespace.directive';
import { NumbersOnlyDirective } from './numbers-only.directive';
import { AlphaOnlyDirective } from './alpha-only.directive';
import { ContectOnlyDirective } from './contact-only.directive';
import { CodeOnlyDirective } from './code-only.directive';
import { GscSyncDatePickerDirective } from './gsc-sync-date-picker.directive';
import { GscSyncTimePickerDirective } from './gsc-sync-time-picker.directive';

@NgModule({
  declarations: [
    GridDataBindingDirective,
    DisableControlDirective, 
    GscSyncDatePickerDirective,
    GscSyncTimePickerDirective,
    NoWhiteSpaceDirective,
    NumbersOnlyDirective,
    AlphaOnlyDirective,
    ContectOnlyDirective,
    CodeOnlyDirective
  ],
  imports: [],
  exports: [
    GridDataBindingDirective,
    DisableControlDirective, 
    GscSyncDatePickerDirective,
    GscSyncTimePickerDirective,    
    NoWhiteSpaceDirective,
    NumbersOnlyDirective,
    AlphaOnlyDirective,
    ContectOnlyDirective,
    CodeOnlyDirective
  ]
})
export class DirectivesModule {}
