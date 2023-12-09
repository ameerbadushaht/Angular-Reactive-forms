import { AbstractControl, ValidatorFn } from '@angular/forms';

export function internationalPhoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumberPattern = /^\+(?:[0-9] ?){6,14}[0-9]$/; 
    const valid = phoneNumberPattern.test(control.value);
    return valid ? null : { invalidPhoneNumber: { value: control.value } };
  };
}
