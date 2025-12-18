import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Employee } from '../../models/employee.model';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIcon,
  ],
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss'],
})
export class EmployeeDialogComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee | null
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data;

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      role: ['', Validators.required],
      status: [false],
    });

    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const result: Employee = {
      ...this.form.value,
      _id: this.data?._id,
    };

    this.dialogRef.close(result);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
