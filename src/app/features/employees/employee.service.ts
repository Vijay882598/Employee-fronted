

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../../features/employees/models/employee.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://backened-six.vercel.app/';
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.http.get<Employee[]>(environment.apiBaseUrl).subscribe({
      next: (data) => this.employeesSubject.next(data),
      error: (err) => console.error('Error loading employees', err)
    });
  }

  getEmployees(): Observable<Employee[]> {
    return this.employees$;
  }

  addEmployee(emp: Employee): void {
    this.http.post<Employee>(`${environment.apiBaseUrl}create`, emp).subscribe({
      next: (newEmp) => {
        const current = this.employeesSubject.value;
        this.employeesSubject.next([...current, newEmp]);
      }
    });
  }

  updateEmployee(id: number, emp: Partial<Employee>): void {
    console.log("is")
    this.http.put<Employee>(`${environment.apiBaseUrl}${id}`, emp).subscribe({
      next: () => {
        const updated = this.employeesSubject.value.map(e =>
          e._id === id ? { ...e, ...emp } : e
        );
        this.employeesSubject.next(updated);
      }
    });
  }

  deleteEmployee(id: number): void {
    this.http.delete(`${environment.apiBaseUrl}${id}`).subscribe({
      next: () => {
        this.employeesSubject.next(
          this.employeesSubject.value.filter(e => e._id !== id)
        );
      }
    });
  }
}