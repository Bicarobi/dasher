import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Employee } from '../../types';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apiService: ApiService) {}

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
      jobTitle: item.jobTitle,
      dateOfBirth: this.normalizeDateOfBirth(item.dateOfBirth),
      image: item.image || 'avatar-placeholder.jpg',
    };
  }
}
