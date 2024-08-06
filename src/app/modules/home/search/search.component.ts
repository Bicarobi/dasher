import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  constructor(public employeeService: EmployeeService) {}

  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  selectedOption!: any;

  sortEmployees() {
    if (!this.value) {
      this.employeeService.sortedEmployees = [
        ...this.employeeService.employees,
      ];
    } else if (this.value.length) {
      const searchTerms = this.value
        .toLowerCase()
        .split(' ')
        .filter((term) => term);

      this.employeeService.sortedEmployees =
        this.employeeService.sortedEmployees
          .filter((employee) => {
            const fullName =
              `${employee.name} ${employee.lastname}`.toLowerCase();
            return searchTerms.every((term) => fullName.includes(term));
          })
          .sort((a, b) => {
            const nameA = `${a.name} ${a.lastname}`.toLowerCase();
            const nameB = `${b.name} ${b.lastname}`.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
    }

    this.filterEmployees();

    this.employeeService.total = this.employeeService.filteredEmployees.length;
    this.employeeService.visibleEmployees = this.employeeService.paginate(
      this.employeeService.filteredEmployees
    );
    this.employeeService.filters = this.employeeService.getFilters(
      this.employeeService.visibleEmployees
    );
  }

  filterEmployees() {
    this.employeeService.filteredEmployees =
      this.employeeService.filterEmployeesByJobTitle(
        this.employeeService.sortedEmployees,
        this.selectedOption
      );
    console.log(this.employeeService.filteredEmployees);
  }
}
