import { inject, Injectable } from '@angular/core';
import { EmployeeInterface } from '../../interfaces/employee';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private roleService = inject(RoleService)


  private employeeList: EmployeeInterface[] = [
    {
      id: 1,
      firstName: 'Laura',
      lastName: 'Gómez',
      email: 'laura.gomez@restaurant.com',
      password: 'pass123',
      dni: '12345678A',
      hireDate: '2023-01-10',
      hourlyWage: 0,
      role: { id: 1, roleName: 'OWNER', roleCategory: 'OWNER' },
      isActive: true,
      createdAt: '2023-01-10',
      updatedAt: '2023-01-10',
    },
    {
      id: 2,
      firstName: 'Carlos',
      lastName: 'Martínez',
      email: 'carlos.martinez@restaurant.com',
      password: 'pass123',
      dni: '23456789B',
      hireDate: '2023-02-01',
      hourlyWage: 0,
      role: { id: 1, roleName: 'OWNER', roleCategory: 'OWNER' },
      isActive: true,
      createdAt: '2023-02-01',
      updatedAt: '2023-02-01',
    },
    {
      id: 3,
      firstName: 'Ana',
      lastName: 'Ruiz',
      email: 'ana.ruiz@restaurant.com',
      password: 'pass123',
      dni: '34567890C',
      hireDate: '2023-03-15',
      hourlyWage: 18,
      role: { id: 2, roleName: 'EMPLOYEE', roleCategory: 'EMPLOYEE' },
      isActive: true,
      createdAt: '2023-03-15',
      updatedAt: '2023-03-15',
    },
    {
      id: 4,
      firstName: 'David',
      lastName: 'López',
      email: 'david.lopez@restaurant.com',
      password: 'pass123',
      dni: '45678901D',
      hireDate: '2023-04-20',
      hourlyWage: 16,
      role: { id: 2, roleName: 'EMPLOYEE', roleCategory: 'EMPLOYEE' },
      isActive: true,
      createdAt: '2023-04-20',
      updatedAt: '2023-04-20',
    },
    {
      id: 5,
      firstName: 'María',
      lastName: 'Fernández',
      email: 'maria.fernandez@restaurant.com',
      password: 'pass123',
      dni: '56789012E',
      hireDate: '2023-05-05',
      hourlyWage: 15,
      role: { id: 2, roleName: 'EMPLOYEE', roleCategory: 'EMPLOYEE' },
      isActive: true,
      createdAt: '2023-05-05',
      updatedAt: '2023-05-05',
    },
    {
      id: 6,
      firstName: 'Javier',
      lastName: 'Santos',
      email: 'javier.santos@restaurant.com',
      password: 'pass123',
      dni: '67890123F',
      hireDate: '2023-06-01',
      hourlyWage: 13,
      role: { id: 2, roleName: 'EMPLOYEE', roleCategory: 'EMPLOYEE' },
      isActive: true,
      createdAt: '2023-06-01',
      updatedAt: '2023-06-01',
    },
    {
      id: 7,
      firstName: 'Lucía',
      lastName: 'Moreno',
      email: 'lucia.moreno@restaurant.com',
      password: 'pass123',
      dni: '78901234G',
      hireDate: '2023-07-12',
      hourlyWage: 13,
      role: { id: 2, roleName: 'EMPLOYEE', roleCategory: 'EMPLOYEE' },
      isActive: false,
      createdAt: '2023-07-12',
      updatedAt: '2023-09-01',
    },
    {
      id: 8,
      firstName: 'Pedro',
      lastName: 'Navarro',
      email: 'pedro.navarro@restaurant.com',
      password: 'pass123',
      dni: '89012345H',
      hireDate: '2023-08-03',
      hourlyWage: 14,
      role: { id: 2, roleName: 'EMPLOYEE', roleCategory: 'EMPLOYEE' },
      isActive: true,
      createdAt: '2023-08-03',
      updatedAt: '2023-08-03',
    },
    {
      id: 9,
      firstName: 'Elena',
      lastName: 'Cruz',
      email: 'elena.cruz@restaurant.com',
      password: 'pass123',
      dni: '90123456I',
      hireDate: '2023-09-18',
      hourlyWage: 12,
      role: { id: 2, roleName: 'EMPLOYEE', roleCategory: 'EMPLOYEE' },
      isActive: true,
      createdAt: '2023-09-18',
      updatedAt: '2023-09-18',
    },
    {
      id: 10,
      firstName: 'Sergio',
      lastName: 'Vega',
      email: 'sergio.vega@restaurant.com',
      password: 'pass123',
      dni: '01234567J',
      hireDate: '2023-10-01',
      hourlyWage: 17,
      role: { id: 2, roleName: 'EMPLOYEE', roleCategory: 'EMPLOYEE' },
      isActive: false,
      createdAt: '2023-10-01',
      updatedAt: '2023-11-15',
    },
  ]

  getEmployees() {
    const employeeListResult = [...this.employeeList]
    return employeeListResult;
  }

  createOwner(owner: Omit<EmployeeInterface, 'id' | 'role' | 'isActive' | 'createdAt' | 'updatedAt'>) {
    const maxId = this.employeeList.length === 0
      ? 1
      : Math.max(...this.employeeList.map(item => item.id)) + 1

    const ownerRole = this.roleService.getRoleByName('OWNER')
    if (!ownerRole)
      return;

    const newOwner: EmployeeInterface = {
      id: maxId,
      firstName: owner.firstName,
      lastName: owner.lastName,
      email: owner.email,
      password: owner.password,
      dni: owner.dni,
      hireDate: owner.hireDate,
      hourlyWage: owner.hourlyWage,
      role: ownerRole,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    this.employeeList.push(newOwner)
  }

  setActive(id: number, isActive: boolean) {
    const emp = this.employeeList.find((e) => e.id === id)
    if (!emp)
      return;
    emp.isActive = isActive;
    emp.updatedAt = new Date().toISOString().split('T')[0]
  }


}
