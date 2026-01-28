import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form';
import { LOGIN_FORM } from '../../../forms/login-form';

@Component({
  selector: 'app-login',
  imports: [DynamicFormComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {

  fields = LOGIN_FORM;
  
  onSubmit(data:any){
    console.log('Datos enviados:', data);
    // aquí irá el backend más adelante
  }
}
