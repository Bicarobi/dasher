import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Employee } from '../../types';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apiService: ApiService) {}

  employees: Employee[] = [];
  visibleEmployees!: Employee[];
  sortedEmployees!: Employee[];

  pageSize: number = 12;
  page: number = 0;
  total!: number;

  normalizeEmail(value: string): string {
    if (!value) return '';

    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  normalizeDateOfBirth(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}.${month}.${year}.`;
  }

  getEmployees = (url: string): Observable<Employee[]> => {
    return this.apiService
      .get(url, {
        responseType: 'json',
      })
      .pipe(
        map((res: any) => {
          return res.data.map((item: any) => this.mapToEmployee(item));
        })
      );
  };

  private mapToEmployee(item: any): Employee {
    return {
      id: item.id,
      name: item.firstName,
      lastname: item.lastName,
      email: `${this.normalizeEmail(item.firstName)}.${this.normalizeEmail(
        item.lastName
      )}@gmail.com`,
      phone: item.phone || '091 123 4567',
      jobTitle: item.jobTitle,
      dateOfBirth: this.normalizeDateOfBirth(item.dateOfBirth),
      image: item.image || 'avatar-placeholder.jpg',
    };
  }

  fetchEmployees() {
    this.getEmployees(
      'https://api.test.ulaznice.hr/paganini/api/job-interview/employees'
    ).subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        this.sortedEmployees = this.employees;
        console.log(this.employees, this.total);
        this.visibleEmployees = this.paginate(this.employees);
        this.total = this.employees.length;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  paginate(data: Employee[]): Employee[] {
    return data.slice(
      this.page * this.pageSize,
      this.page * this.pageSize + this.pageSize
    );
  }

  previousPage() {
    if (this.page != 0) {
      this.page -= 1;
      this.visibleEmployees = this.paginate(this.sortedEmployees);
    }
    return null;
  }

  nextPage() {
    if (this.page != Math.ceil(this.total / this.pageSize) - 1) {
      this.page += 1;

      this.visibleEmployees = this.paginate(this.sortedEmployees);
    }
    return null;
  }
}
