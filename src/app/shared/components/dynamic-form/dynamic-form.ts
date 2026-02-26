import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { FormFieldInterface } from '../../../interfaces/form-field';
import { MaterialModule } from '../../ui/material-modules';

@Component({
  selector: 'app-dynamic-form',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss',
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FormFieldInterface[] = [];
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({});

    this.fields.forEach((field) => {
      const validators: ValidatorFn[] = [];

      // Required
      if (field.required) {
        validators.push(Validators.required);
      }

      // Email (si el tipo es email)
      if (field.type === 'email') {
        validators.push(Validators.email);
      }

      // Longitudes
      if (field.minLength != null) {
        validators.push(Validators.minLength(field.minLength));
      }
      if (field.maxLength != null) {
        validators.push(Validators.maxLength(field.maxLength));
      }

      // Min/Max (números)
      if (field.min != null) {
        validators.push(Validators.min(field.min));
      }
      if (field.max != null) {
        validators.push(Validators.max(field.max));
      }

      // Pattern (regex)
      if (field.pattern) {
        validators.push(Validators.pattern(field.pattern));
      }

      this.form.addControl(field.name, new FormControl('', validators));
    });
  }

  isInvalid(fieldName: string): boolean {
    const ctrl = this.form.get(fieldName);
    return !!ctrl && ctrl.touched && ctrl.invalid;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
