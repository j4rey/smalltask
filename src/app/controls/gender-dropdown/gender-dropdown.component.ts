import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'gender-dropdown',
  templateUrl: './gender-dropdown.component.html',
  styleUrls: ['./gender-dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenderDropdownComponent),
      multi: true
    }
  ]
})
export class GenderDropdownComponent implements OnInit, ControlValueAccessor {
  @Input('abled') public abled: boolean = true;
  onChange = (_: any) => { };
  onTouched = () => { };
  value: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  pushChanges(value: any) {
    this.onChange(value);
  }

  registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
  registerOnTouched(fn: () => {}): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
  }
}
