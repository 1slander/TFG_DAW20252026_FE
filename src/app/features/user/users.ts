import { Component, computed, inject, signal } from '@angular/core';
import { MaterialModule } from '../../shared/ui/material-modules';
import { EmployeeDetailSidenav } from './components/employee-detail-sidenav/employee-detail-sidenav';
import { EmployeeService } from '../../core/services/employee.service';
import { EmployeeInterface } from '../../interfaces/employee';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form';
import { FormFieldInterface } from '../../interfaces/form-field';
import { ScreenSizeService } from '../../core/services/screen-size';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box';
import { CreatePanelComponent } from '../../shared/components/create-panel/create-panel';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MaterialModule, EmployeeDetailSidenav, DynamicFormComponent,SearchBoxComponent, CreatePanelComponent],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersComponent {
  //nos traemos el service
  private employeeService = inject(EmployeeService);
  public screenSize = inject(ScreenSizeService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);


  employees = signal(this.employeeService.getEmployees());
  displayedColumns = computed(() =>
    this.screenSize.isMobile()
      ? ['fullName', 'isActive', 'actions']
      : ['fullName', 'email', 'role', 'isActive', 'actions']
  );


  //Formulario
  showCreateForm = false;
  employeeFields: FormFieldInterface[] = [
    { name: 'firstName', label: 'Nombre', type: 'text', required: true },
    { name: 'lastName', label: 'Apellidos', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Contraseña', type: 'password', required: true },
    { name: 'dni', label: 'DNI', type: 'text', required: true },
    { name: 'hireDate', label: 'Fecha de contratación', type: 'date', required: true },
    { name: 'hourlyWage', label: 'Salario por hora', type: 'number', required: true },
  ];


  applyFilter(filterValue: string) {
  const allEmployees = this.employeeService.getEmployees();

  if (!filterValue) {
    this.employees.set(allEmployees);
    return;
  }

  this.employees.set(allEmployees.filter(employee =>
    employee.firstName.toLowerCase().includes(filterValue) ||
    employee.lastName.toLocaleLowerCase().includes(filterValue) ||
    employee.email.toLowerCase().includes(filterValue)
  ));
}


  private notify(message: string, type: 'success' | 'error' = 'success') {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error'],
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  onCreateOwner(value: any) {
    try {
      this.employeeService.createOwner(value);
      this.employees.set(this.employeeService.getEmployees());
      this.notify('¡Owner creado con exito!', 'success')
      this.showCreateForm = false;
    } catch (error) {
      this.notify('Error: no se ha podido crear', 'error');
      console.error('Error al crear owner', error);
    }
  }

  onToggleActive(event: { id: number; nextIsActive: boolean }) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '350px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          this.employeeService.setActive(event.id, event.nextIsActive);
          this.employees.set(this.employeeService.getEmployees());
          this.selectedEmployee = this.employees().find((e) => e.id === event.id) ?? this.selectedEmployee;

        } catch (error) {
          this.notify('Error: no se ha podido ejecutar')
        }
      }
    });
  }


  //añadimos la lsita de employees a una variable de tipo EmployeeInterface[]
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



}
