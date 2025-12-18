// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { EmployeeService } from '../../../../core/service/employee.service';
// import { Employee } from '../../models/employee.model';
// import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
// import { Subscription } from 'rxjs';
// import { CommonModule } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatCardModule } from '@angular/material/card';
// import { PipesPipe } from '../../../../shared/pipes/pipes.pipe';
// import { DirectivesDirective } from '../../../../shared/directives/directives.directive';
// // import Rol

// @Component({
//   selector: 'app-employee-list',
//   standalone: true,
//   imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, PipesPipe  , DirectivesDirective  ],
//   templateUrl: './employee-list.component.html',
//   styleUrl: './employee-list.component.scss'
// })
// export class EmployeeListComponent  implements OnInit, OnDestroy{
// displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'role', 'status', 'actions'];
//   dataSource: Employee[] = [];
//   private sub!: Subscription;
//   constructor(private service: EmployeeService, private dialog: MatDialog) {}

//   ngOnInit(): void {
//     // this.service.loadEmployees();
//     // this.sub = this.service.employees$.subscribe((data:any) => this.dataSource = data);
//     // console.log(this.sub)
//         this.service.getEmployees().subscribe(data => {
//      this.dataSource = data;
//       console.log('DATA IN COMPONENT:', data);
//     });

//   }
//   ngOnDestroy(): void {
//     this.sub.unsubscribe();
//   }
//   openDialog(emp?: Employee): void {
//     const ref = this.dialog.open(EmployeeDialogComponent, {
//       width: '500px',
//       data: emp || null
//     });

//     ref.afterClosed().subscribe(result => {
//       if (result) {
//         if (emp) {
//           this.service.updateEmployee(emp.id, result);
//         } else {
//           // Note: id backend se aayega post ke baad, ya aap temporarily assign kar sakte ho
//           this.service.addEmployee({ ...result, id: Date.now() });
//         }
//       }
//     });
//   }

//   delete(id: number): void {
//     this.service.deleteEmployee(id);
//   }
// }
// employee-list.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../models/employee.model';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PipesPipe } from '../../../../shared/pipes/pipes.pipe';
import { DirectivesDirective } from '../../../../shared/directives/directives.directive';
// import { RoleColorPipe } from '../../../../shared/pipes/role-color.pipe';
// import { StatusHighlightDirective } from '../../../../shared/directives/status-highlight.directive';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    PipesPipe,
    DirectivesDirective
    // RoleColorPipe,
    // StatusHighlightDirective
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'role', 'status', 'actions'];
  dataSource: Employee[] = [];
  private sub!: Subscription;

  constructor(private service: EmployeeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.sub = this.service.employees$.subscribe(data => {
      this.dataSource = data;
      console.log('Employees updated:', data);
    });

    // Initial load
    this.service.refreshEmployees();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  openDialog(emp?: Employee): void {
    const ref = this.dialog.open(EmployeeDialogComponent, {
      width: '600px',
      data: emp || null,
    });

    ref.afterClosed().subscribe((result: Employee | undefined) => {
      if (result) {
        if (emp) {
          // Edit
          this.service.updateEmployee(emp._id, result);
        } else {
          // Add
          this.service.addEmployee(result);
        }
      }
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.service.deleteEmployee(id);
    }
  }
}