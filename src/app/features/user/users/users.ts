import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../shared/ui/material-modules';
import { EmployeeDetailSidenav } from './components/employee-detail-sidenav/employee-detail-sidenav';
import { EmployeeService } from '../../../core/services/employee.service';
import { EmployeeInterface } from '../../../interfaces/employee';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form';
import { FormField } from '../../../interfaces/form-field';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MaterialModule, EmployeeDetailSidenav, DynamicFormComponent],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  //nos traemos el service
  private employeeService = inject(EmployeeService);
  displayedColumns: string[] = ['fullName', 'email', 'role', 'isActive', 'actions'];

  //añadimos la lsita de employees a una variable de tipo EmployeeInterface[]
  employees: EmployeeInterface[] = this.employeeService.getEmployees();

  selectedEmployee: EmployeeInterface | null = null;
  sidenavOpen = false;

  openSidenav(employee: EmployeeInterface) {
    this.selectedEmployee = employee;
    this.sidenavOpen = true;
  }

  closeSidenav() {
    this.selectedEmployee = null;
    this.sidenavOpen = false;
  }

  onToggleActive(event: { id: number; nextIsActive: boolean }) {
    this.employeeService.setActive(event.id, event.nextIsActive);
    this.employees = this.employeeService.getEmployees();

    this.selectedEmployee = this.employees.find((e) => e.id === event.id) ?? this.selectedEmployee;
  }

  showCreateForm = false;
  employeeFields: FormField[] = [
    { name: 'firstName', label: 'Nombre', type: 'text', required: true },
    { name: 'lastName', label: 'Apellidos', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Contraseña', type: 'password', required: true },
    { name: 'dni', label: 'DNI', type: 'text', required: true },
    { name: 'hireDate', label: 'Fecha de contratación', type: 'date', required: true },
    { name: 'hourlyWage', label: 'Salario por hora', type: 'number', required: true },
  ];

  onCreateOwner(value:any){
    this.employeeService.createOwner(value);
    this.employees = this.employeeService.getEmployees();
    this.showCreateForm = false;
  }
}
