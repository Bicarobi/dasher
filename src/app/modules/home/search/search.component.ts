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
            if (this.employeeService.ascending) {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;

              if (a.lastname < b.lastname) return -1;
              if (a.lastname > b.lastname) return 1;
              return 0;
            } else {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;

              if (a.lastname > b.lastname) return -1;
              if (a.lastname < b.lastname) return 1;
              return 0;
            }
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
    this.employeeService.page = 0;
    this.employeeService.filteredEmployees =
      this.employeeService.filterEmployeesByJobTitle(
        this.employeeService.sortedEmployees,
        this.selectedOption
      );
    /* console.log(this.employeeService.filteredEmployees); */
  }

  sortByName() {
    this.employeeService.ascending = !this.employeeService.ascending;
    this.employeeService.sortEmployees();
    this.sortEmployees();
  }
}
