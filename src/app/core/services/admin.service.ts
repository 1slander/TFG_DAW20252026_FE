import { Injectable } from '@angular/core';
import { AdminInterface } from '../../interfaces/admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  //nos creamos un array de admins en local para probar
  private adminList: AdminInterface[] =[
  {
    "id": 1,
    "username": "admin_master",
    "email": "admin.master@restaurant.com",
    "password": "hashed_password_1",
    "role": "ADMIN"
  },
  {
    "id": 2,
    "username": "admin_julia",
    "email": "julia.admin@restaurant.com",
    "password": "hashed_password_2",
    "role": "ADMIN"
  },
  {
    "id": 3,
    "username": "admin_carlos",
    "email": "carlos.admin@restaurant.com",
    "password": "hashed_password_3",
    "role": "ADMIN"
  }
  ]

  //este metodo nos devuelve todos los admins, 
  //const adminListResult = [...this.adminList];
  //lo utilizamos para devolver una copia del array 
  // y que no nos puedan modificar el original
  getAdmins(){
    const adminListResult = [...this.adminList];
    return adminListResult;
  }

  //creamos un admin nuevo y con Omit
  //recogemos todos los datos menos el Id, 
  //que lo vamos a generar nosotros por ahora
  createAdmin(admin:Omit<AdminInterface,'id'>){
    const maxId = this.adminList.length === 0
    ? 1
    : Math.max(...this.adminList.map(item => item.id)) + 1
    
    const newAdmin : AdminInterface = {
      id : maxId,
      username : admin.username,
      email : admin.email,
      password : admin.password,
      role:admin.role
    }
    this.adminList.push(newAdmin)
  }
  
  deleteById(id:number){
    this.adminList = this.adminList.filter((admin) => admin.id!==id)
  }


}
