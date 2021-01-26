import { Component, Input, Self  } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.css'],
})
export class CheckboxInputComponent implements ControlValueAccessor {
  @Input() disabled = false;
  @Input() label: string;

  constructor(@Self() public ngControl: NgControl) { 
    ngControl.valueAccessor = this;
  }

  // Internal properties
  isChecked = false;
  onChange = (_ => { });
  onBlur = (_ => { });

  writeValue(obj: boolean): void {
    this.isChecked = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChanged($event) {
    this.isChecked = $event && $event.target && $event.target.checked;
    this.onChange(this.isChecked);
  }
}
