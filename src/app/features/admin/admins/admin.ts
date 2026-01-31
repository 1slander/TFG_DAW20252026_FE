import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MaterialModule  } from '../../../shared/ui/material-modules'
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { ScreenSize } from '../../../core/services/screen-size';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form';
import { FormField } from '../../../interfaces/form-field';

@Component({
  selector: 'app-admin',
  imports: [MaterialModule, CommonModule,DynamicFormComponent],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})


export class Admin {
  protected adminService = inject(AdminService);
  public screenSize = inject(ScreenSize);


  //traemos los admins del array que hemos creado en AdminService
  admins = this.adminService.getAdmins();
  displayedColumns : string[] =['id','username','email','role','actions'];
  
  deleteAdmin(id:number){
    this.adminService.deleteById(id);
    this.admins = this.adminService.getAdmins();
  }

  viewAdmin(id:number){
    console.log("Viendo admin : ", id)
  }

  //REUTILIZAMOS EL FORMULARIO DINAMICO
  showCreateForm = false;
  adminFields: FormField[] = [
   {name:"username", label:"Nombre de usuario",type:"text",required:true},
   {name:"email", label:"Email",type:"email",required:true},
   {name:"password", label:"Contraseña",type:"password",required:true},
   {name:"role", label:"Rol",type:"select",required:true,options:[{value:"ADMIN",label:"Admin"}]}
  ]

  swapCreateForm(){
    this.showCreateForm=!this.showCreateForm
  }

  onCreateAdmin(value:any){
    this.adminService.createAdmin(value);
    this.admins = this.adminService.getAdmins();
    this.showCreateForm = false;
  }

}
