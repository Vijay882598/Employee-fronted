

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Employee } from '../../features/employees/models/employee.model';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {
//   private apiUrl = 'https://backened-six.vercel.app/';
//   private employeesSubject = new BehaviorSubject<Employee[]>([]);
//   employees$ = this.employeesSubject.asObservable();

//   constructor(private http: HttpClient) {
//     this.loadEmployees();
//   }

//   loadEmployees(): void {
//     this.http.get<Employee[]>(this.apiUrl).subscribe({
//       next: (data) => this.employeesSubject.next(data),
//       error: (err) => console.error('Error loading employees', err)
//     });
//   }

//   getEmployees(): Observable<Employee[]> {
//     return this.employees$;
//   }

//   addEmployee(emp: Employee): void {
//     this.http.post<Employee>(`${this.apiUrl}create`, emp).subscribe({
//       next: (newEmp) => {
//         const current = this.employeesSubject.value;
//         this.employeesSubject.next([...current, newEmp]);
//       }
//     });
//   }

//   updateEmployee(id: number, emp: Partial<Employee>): void {
//     console.log("is")
//     this.http.put<Employee>(`${this.apiUrl}${id}`, emp).subscribe({
//       next: () => {
//         const updated = this.employeesSubject.value.map(e =>
//           e._id === id ? { ...e, ...emp } : e
//         );
//         this.employeesSubject.next(updated);
//       }
//     });
//   }

//   deleteEmployee(id: number): void {
//     this.http.delete(`${this.apiUrl}${id}`).subscribe({
//       next: () => {
//         this.employeesSubject.next(
//           this.employeesSubject.value.filter(e => e._id !== id)
//         );
//       }
//     });
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Employee } from '../../features/employees/models/employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://backened-six.vercel.app/';

  // Local state with BehaviorSubject
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$: Observable<Employee[]> = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEmployees(); // App start hote hi load karo
  }

  // Initial load
  private loadEmployees(): void {
    this.http.get<Employee[]>(this.apiUrl).subscribe({
      next: (employees) => this.employeesSubject.next(employees),
      error: (err) => console.error('Error loading employees:', err)
    });
  }

  // Fresh data load karne ke liye (agar chaaho to component se call kar sakte ho)
  refreshEmployees(): void {
    this.loadEmployees();
  }

  // Add new employee
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}create`, employee).pipe(
      tap((newEmployee) => {
        const current = this.employeesSubject.value;
        this.employeesSubject.next([...current, newEmployee]);
      })
    );
  }

  // Update employee
  updateEmployee(id: number, updates: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}${id}`, updates).pipe(
      tap(() => {
        const updatedList = this.employeesSubject.value.map((emp) =>
          emp._id === id ? { ...emp, ...updates } : emp
        );
        this.employeesSubject.next(updatedList);
      })
    );
  }

  // Delete employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`).pipe(
      tap(() => {
        const filtered = this.employeesSubject.value.filter((emp) => emp._id !== id);
        this.employeesSubject.next(filtered);
      })
    );
  }

  // Agar chaaho to current employees synchronously bhi le sakte ho (rare cases mein)
  getCurrentEmployees(): Employee[] {
    return this.employeesSubject.value;
  }
}