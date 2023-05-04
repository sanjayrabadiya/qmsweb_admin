import { Component, OnInit, forwardRef, Output, EventEmitter, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'partial-date',
  templateUrl: './partial-date.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PartialDateComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PartialDateComponent),
      multi: true
    }
  ]
})
export class PartialDateComponent implements OnInit, ControlValueAccessor, Validator {
  value: string;
  years: any[];
  months: any[];
  days: any[];
  formGroup: FormGroup;
  monthItems = ['UNK', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  @Output() valueChange = new EventEmitter();

  onTouched: () => void;
  public fields = { text: 'value', value: 'value' };

  @Input()
  disabled: boolean;
  onChange: any = () => { };
  constructor(private formBuilder: FormBuilder) { }

  year = "";
  month = "";
  day = "";
  ngOnInit(): void {

    this.loadYears();
    this.loadMonths();

  }



  loadYears() {
    this.years = [];
    this.years.push({
      value: 'UKUK'
    });

    for (let i = 1900; i <= 2050; i++) {
      this.years.push({
        value: i.toString()
      });
    }
  }

  loadMonths() {
    this.months = [];
    this.monthItems.forEach((m) => {
      this.months.push({
        value: m
      });
    });
  }

  loadDays() {
    this.days = [];
    this.days.push({
      value: 'UK'
    });

    const year = +this.year || 0;

    const month = this.monthItems.indexOf(this.month) || 0;
    if (year === 0 || month <= 0) {
      return;
    }

    const numberOfDays = new Date(year, month, 0).getDate();
    for (let i = 1; i <= numberOfDays; i++) {
      let value = i.toString();
      if (i < 10) {
        value = '0' + value.toString();
      }
      this.days.push({
        value: value
      });
    }
  }

  clearData(): void {

    this.value = null;
    this.year = 'UKUK';
    this.month = 'UNK';
    this.day = 'UK';

  }

  setData(): void {

    if (this.value) {
      const values = this.value.split('-');
      this.year = values[0];
      this.month = values[1];
      this.day = values[2];
    }
    this.loadDays();
  }

  yearChanged() {
    this.days = null;
 
    this.loadMonths();

    if (this.year === "UKUK")
      this.day = "UK";

    this.loadDays();
   this.propagateChange();

  }

  monthChanged() {
    if (this.month === "UNK")
      this.day = "UK";

    this.loadDays();

    this.propagateChange();
  }

  dayChanged() {
    this.propagateChange();
  }

  propagateChange() {
   
    this.value = `${this.year}-${this.month}-${this.day}`;

    this.onChange(this.value);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value;
    this.setData();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }
}
