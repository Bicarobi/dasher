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
  employeeForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl<string>('', Validators.email),
    phone: new FormControl<string>('', Validators.pattern('^[- +()0-9]+$')),
    jobTitle: new FormControl<string>('', Validators.required),
    dateOfBirth: new FormControl<string>(''),
  });

  ngOnInit() {}
}
