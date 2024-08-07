import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  submittedWithErrors: boolean = false;

  employeeForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    phone: new FormControl<string>('', [
      Validators.pattern('^[- +()0-9]+$'),
      Validators.required,
    ]),
    jobTitle: new FormControl<string>('', Validators.required),
    dateOfBirth: new FormControl<string>('', Validators.required),
    image: new FormControl(null, [Validators.required]),
  });

  submit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      this.submittedWithErrors = false;
      this.employeeForm.reset();
    } else {
      this.submittedWithErrors = true;
    }
  }
}
