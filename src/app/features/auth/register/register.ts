import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form';
import { OWNER_REGISTER_FORM } from '../../../forms/owner-register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {


  fields = OWNER_REGISTER_FORM;

  onSubmit(data: any) {
    console.log('Datos enviados:', data);
    // aquí irá el backend más adelante
  }
}