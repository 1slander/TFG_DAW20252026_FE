import { Component, inject } from '@angular/core';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form';
import { ADMIN_LOGIN_FORM } from '../../../forms/admin-login';
import { AdminService } from '../../../core/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  imports: [DynamicFormComponent],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLoginComponent {

  fields = ADMIN_LOGIN_FORM;

  private adminService = inject(AdminService);
  private router = inject(Router);

  onSubmit(data:any){
    this.adminService.login(data).subscribe({ 
      next: (res) =>{
        console.log(res)
      this.adminService.saveToken(res.token)
        this.router.navigate(["dashboard/home"])
    },
      error: (err) =>{
        console.error("Error login: " , err)
      } 
    })
  }
}
