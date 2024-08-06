import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(public employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.fetchEmployees();
  }
}
