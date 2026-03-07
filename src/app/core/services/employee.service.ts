import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeCreateInterface, EmployeeInterface } from '../../interfaces/employee';
import { RoleService } from './role.service';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private roleService = inject(RoleService);
  private http = inject(HttpClient);

  // Variable para almacenar el estado local si es necesario (cache)
  private employeeList: EmployeeInterface[] = [];

  getEmployeesForAdmin() {
    return this.http.get<EmployeeInterface[]>(`${environment.apiUrl}employees`);
  }

  getEmployees() {
    return this.http.get<EmployeeInterface[]>(`${environment.apiUrl}employees/restaurant`);
  }

  getEmployeeById(id: number) {
    return this.http.get<EmployeeInterface>(`${environment.apiUrl}employees/${id}`);
  }

  createEmployees(employee: EmployeeCreateInterface) {
    return this.http.post<EmployeeCreateInterface>(
      `${environment.apiUrl}employees/create`,
      employee,
    );
  }

  updateEmployee(id: number, employee: any) {
    return this.http.put<any>(`${environment.apiUrl}employees/update/${id}`, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${environment.apiUrl}employees/delete/${id}`, { responseType: 'text' });
  }

  // createOwner(owner: Omit<EmployeeInterface, 'id' | 'role' | 'isActive' | 'createdAt' | 'updatedAt'>) {
  //   const maxId = this.employeeList.length === 0
  //     ? 1
  //     : Math.max(...this.employeeList.map(item => item.id)) + 1

  // const ownerRole = this.roleService.getRoleByName('OWNER')
  // if (!ownerRole)
  //     //   return;

  //     const newOwner: EmployeeInterface = {
  //       id: maxId,
  //       firstName: owner.firstName,
  //       lastName: owner.lastName,
  //       email: owner.email,
  //       password: owner.password,
  //       dni: owner.dni,
  //       hourlyWage: owner.hourlyWage,
  //       role: ownerRole,
  //       isActive: true,
  //       createdAt: new Date().toISOString().split('T')[0],
  //       updatedAt: new Date().toISOString().split('T')[0]
  //     }
  //     this.employeeList.push(newOwner)
  //   }

  //   setActive(id: number, isActive: boolean) {
  //     const emp = this.employeeList.find((e) => e.id === id)
  //     if (!emp)
  //       return;
  //     emp.isActive = isActive;
  //     emp.updatedAt = new Date().toISOString().split('T')[0]
  //   }
}
