import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../../modules/employees/models/employee.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) {}
  loadEmployees(): void {
    this.http
      .get<Employee[]>(`${environment.apiBaseUrl}api/employees`)
      .subscribe({
        next: (data) => {
          this.employeesSubject.next([...data]);
        },
        error: (err) =>
          console.error('Error loading employees', err)
      });
  }

  getEmployees(): Observable<Employee[]> {
    return this.employees$;
  }

  addEmployee(emp: Employee): void {
    this.http
      .post<Employee>(
        `${environment.apiBaseUrl}api/employees/create`,
        emp
      )
      .subscribe({
        next: (newEmp) => {
          const current = this.employeesSubject.value;
          this.employeesSubject.next([...current, newEmp]);
        },
        error: err => console.error(err)
      });
  }

  updateEmployee(id: number, emp: Partial<Employee>): void {
    this.http
      .put<Employee>(
        `${environment.apiBaseUrl}api/employees/${id}`,
        emp
      )
      .subscribe({
        next: (updatedEmp) => {
          const updated = this.employeesSubject.value.map(e =>
            e._id === id
              ? { ...e, ...updatedEmp }
              : e
          );
          this.employeesSubject.next(updated);
        },
        error: err => console.error(err)
      });
  }

  deleteEmployee(id: number): void {
    this.http
      .delete(`${environment.apiBaseUrl}api/employees/${id}`)
      .subscribe({
        next: () => {
          this.employeesSubject.next(
            this.employeesSubject.value.filter(e => e._id !== id)
          );
        },
        error: err => console.error(err)
      });
  }

  toggleStatus(id: number): void {
    const updated = this.employeesSubject.value.map((emp:any) =>
      emp._id === id
        ? {
            ...emp,
            status: emp.status === 'true' ? 'false' : 'true'
          }
        : emp
    );

    this.employeesSubject.next(updated);
  }
}
