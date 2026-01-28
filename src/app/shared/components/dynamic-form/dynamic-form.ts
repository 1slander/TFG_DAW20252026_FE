import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormField } from '../../../interfaces/form-field';
import { MaterialModule } from '../../ui/material-modules';


@Component({
  selector: 'app-dynamic-form',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss',
})
export class DynamicFormComponent implements OnInit{

  @Input() fields: FormField[] = [];
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;
  
  ngOnInit(): void {
    this.form = new FormGroup({});

    this.fields.forEach(field => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      this.form.addControl(
        field.name,
        new FormControl('', validators)
      );
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
