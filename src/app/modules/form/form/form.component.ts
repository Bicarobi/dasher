import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  constructor(public employeeService: EmployeeService) {}

  submittedWithErrors: boolean = false;
  selectedJob!: any;
  chosenFile: string = 'Nije odabrana datoteka.';

  jobs: { name: string; value: string }[] = [
    { name: 'Analitičar', value: 'Analitičar' },
    { name: 'Dizajner', value: 'Dizajner' },
    { name: 'Inženjer', value: 'Inženjer' },
    { name: 'Konzultant', value: 'Konzultant' },
    { name: 'Manager', value: 'Manager' },
    { name: 'Programer', value: 'Programer' },
  ];

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

  fileChosen(event: any) {
    if (event != undefined) {
      this.chosenFile =
        'Odabrana je datoteka: ' + event.srcElement.files[0].name;
    } else {
      this.employeeForm.controls.image.reset();
      this.chosenFile = 'Nije odabrana datoteka.';
    }
  }

  jobChosen() {
    if (this.selectedJob != undefined) {
      this.employeeForm.patchValue({ jobTitle: this.selectedJob });
    } else {
      this.employeeForm.controls.jobTitle.reset();
    }
  }

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
