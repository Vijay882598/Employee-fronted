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
import { PhoneNumberPipe } from '../../../../shared/pipes/phone-number.pipe';
import { DirectivesDirective } from '../../../../shared/directives/directives.directive';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
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
    PhoneNumberPipe,
    MatMenuModule,
    MatDividerModule,
    DirectivesDirective,
    
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'role',
    'status',
    'actions'
  ];
  dataSource: Employee[] = [];

  private sub!: Subscription;

  constructor(
    private service: EmployeeService,
    private dialog: MatDialog
  ) {}

  
  ngOnInit(): void {
    this.sub = this.service.employees$.subscribe({
      next: (data) => {
        this.dataSource = [...data];
        console.log('Employees updated:', this.dataSource);
      }
    });

    this.service.loadEmployees();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  openDialog(emp?: Employee): void {
    const ref = this.dialog.open(EmployeeDialogComponent, {
      width: '600px',
      data: emp ?? null
    });

    ref.afterClosed().subscribe((result: Employee | undefined) => {
      if (!result) return;

      if (emp) {
        this.service.updateEmployee(emp._id, result);
      } else {
        this.service.addEmployee(result);
      }
    });
  }

  delete(id: number): void {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    this.service.deleteEmployee(id);
  }

 
}
