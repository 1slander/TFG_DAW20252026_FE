import { inject, Injectable } from '@angular/core';
import { EmployeeInterface } from '../../interfaces/employee';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private roleService = inject(RoleService)


  private employeeList: EmployeeInterface[]=[
    
  ]

  getEmployees(){
    const employeeListResult = [...this.employeeList]
    return employeeListResult;
  }

  createOwner(owner:Omit<EmployeeInterface,'id' | 'role' | 'isActive' | 'createdAt' | 'updatedAt'>){
    const maxId = this.employeeList.length===0 
    ? 1
    : Math.max(...this.employeeList.map(item => item.id)) + 1
    
    const ownerRole = this.roleService.getRoleByName('OWNER')
    if(!ownerRole)
      return;
   
    const newOwner : EmployeeInterface = {
      id: maxId,
      firstName:owner.firstName,
      lastName:owner.lastName,
      email:owner.email,
      password:owner.password,
      dni:owner.dni,
      hireDate:owner.hireDate,
      hourlyWage:owner.hourlyWage,
      role: ownerRole,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    this.employeeList.push(newOwner)
  }

  setActive(id:number, isActive:boolean){
    const emp = this.employeeList.find((e)=>e.id === id)
    if(!emp)
      return;
    emp.isActive=isActive;
    emp.updatedAt = new Date().toISOString().split('T')[0]
  }


}
