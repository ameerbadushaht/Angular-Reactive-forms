import { Component, SimpleChanges } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { internationalPhoneNumberValidator } from 'src/app/validator/validators';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent {
  ReactiveForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.ReactiveForm = this.formBuilder.group({
      firstName: ['', [Validators.required, this.noSpaceValidator]],
      lastName: ['', [Validators.required, this.noSpaceValidator]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, internationalPhoneNumberValidator()],
      ],
      password: [
        '',
        [Validators.required, this.noNumber, this.noSpecial, this.minNumber],
      ],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('data::', this.ReactiveForm);
  }
  onSubmit() {
    if (this.ReactiveForm.valid) {
      console.log('Validated Data', this.ReactiveForm);
      this.clearForm();
    } else {
      console.log('Form is not valid');
    }
  }
  clearForm() {
    this.ReactiveForm.reset();
  }

  // Custom validators

  noSpaceValidator(control: FormControl) {
    if (control.value.indexOf(' ') != -1) {
      return { noSpaceValidator: true };
    }
    return null;
  }

  noNumber(control: FormControl) {
    const value = control.value;
    const hasNumber = /\d/.test(value);
    if (!hasNumber) {
      return { noNumber: true };
    }
    return null;
  }

  noSpecial(control: FormControl) {
    const value = control.value;
    const hasNumber = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    if (!hasNumber) {
      return { noSpecial: true };
    }
    return null;
  }
  minNumber(control: FormControl) {
    const value = control.value;
    const hasNumber = value.length > 8;
    if (!hasNumber) {
      return { minNumber: true };
    }
    return null;
  }
}
