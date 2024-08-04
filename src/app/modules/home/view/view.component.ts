import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../../types';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {
  constructor(private employeeService: EmployeeService) {}

  employees: Employee[] = [];

  fetchEmployees() {
    this.employeeService
      .getEmployees(
        'https://api.test.ulaznice.hr/paganini/api/job-interview/employees'
      )
      .subscribe({
        next: (data: Employee[]) => {
          this.employees = data;
          console.log(this.employees);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.fetchEmployees();
  }
}
