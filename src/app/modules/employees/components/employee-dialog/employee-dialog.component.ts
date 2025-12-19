import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../models/employee.model';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss'],
})
export class EmployeeDialogComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee | null
  ) { }
  ngOnInit(): void {
    this.isEdit = !!this.data;
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          this.onlyAlphabetsValidator
        ]
      ],
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ],
      role: ['', Validators.required],
      status: [true]
    });

    if (this.data) {
      this.form.patchValue({
        name: this.data.name,
        email: this.data.email,
        phone: this.data.phone,
        role: this.data.role,
        status: this.data.status === true
      });
    }
  }
  
  onlyAlphabetsValidator(control: AbstractControl): ValidationErrors | null {
    const valid = /^[a-zA-Z\s]*$/.test(control.value);
    return valid ? null : { onlyAlphabets: true };
  }

  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('pattern') && field === 'phone') {
      return 'Phone number must be exactly 10 digits';
    }
    if (control?.hasError('minlength')) {
      return 'Name must be at least 3 characters';
    }
    if (control?.hasError('onlyAlphabets')) {
      return 'Name can only contain letters and spaces';
    }

    return '';
  }

  onSubmit(): void {
    if (this.form.invalid || this.isSubmitting) return;
    this.isSubmitting = true;
    setTimeout(() => {
      const result: Employee = {
        ...this.form.value,
        _id: this.data?._id,
      };
      this.dialogRef.close(result);
      this.isSubmitting = false;
    }, 1500);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}