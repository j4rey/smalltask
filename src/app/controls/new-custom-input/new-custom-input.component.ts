import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-new-custom-input',
  templateUrl: './new-custom-input.component.html',
  styleUrls: ['./new-custom-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewCustomInputComponent),
      multi: true
    }
  ]
})
export class NewCustomInputComponent implements OnInit, ControlValueAccessor {
  @Input() public abled: boolean;
  @Input() public name: string;
  @Input() public type: string;
  onChange = (_: any) => { };
  onTouched = () => { };
  public value: string = '';
  constructor() { }

  ngOnInit(): void { }

  writeValue(value: any): void { this.value = value || ''; }

  pushChanges(value: any) { this.onChange(value); }

  registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
  registerOnTouched(fn: () => {}): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void { }
}
