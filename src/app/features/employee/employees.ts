import { Component, inject, signal } from '@angular/core';
import { CreatePanelComponent } from '../../shared/components/create-panel/create-panel';
import { ScreenSizeService } from '../../core/services/screen-size';
import { NotificationService } from '../../core/services/notification.service';
import { FormFieldInterface } from '../../interfaces/form-field';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form';
import { AuthService } from '../../core/services/auth.service';
import { Role } from '../../core/models/RoleEnum';
import { RoleService } from '../../core/services/role.service';
import { EmployeeService } from '../../core/services/employee.service';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box';
import { EmployeeInterface } from '../../interfaces/employee';
import { MatIcon } from '@angular/material/icon';
import { MaterialModule } from '../../shared/ui/material-modules';
import { RestaurantService } from '../../core/services/restaurant.service';

@Component({
  selector: 'app-employees',
  imports: [CreatePanelComponent, DynamicFormComponent, SearchBoxComponent, MaterialModule],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
})
export class EmployeesComponent {
  public roleService = inject(RoleService);
  public employeeService = inject(EmployeeService);
  public restaurantService = inject(RestaurantService);
  public screenSize = inject(ScreenSizeService);
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);

  employees = signal<EmployeeInterface[]>([]);

  showCreateForm = false;

  employeeFields: FormFieldInterface[] = [];
  restaurantName = signal<string>('Cargando...');

  displayedColumns: string[] = ['firstName', 'lastName', 'dni', 'email', 'role'];

  ngOnInit(): void {
    this.employeeFields = [
      { name: 'firstName', label: 'Nombre', type: 'text', required: true },
      { name: 'lastName', label: 'Apellidos', type: 'text', required: true },
      { name: 'dni', label: 'DNI', type: 'text', required: true, minLength: 9, maxLength: 9 },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: 'Contraseña', type: 'password', required: true },
      {
        name: 'role',
        label: 'Rol',
        type: 'select',
        options: this.buildRoleOptions(),
      },
    ];
    this.getRestaurantName();
    this.getDatosIniciales();
  }

  getDatosIniciales() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        console.log(data);
        this.employees.set(data);
      },
      error: () => {
        this.notificationService.notify('Error cargando empleados', 'error');
      },
    });
  }

  private buildRoleOptions(): { value: string; label: string }[] {
    const currentRole = this.authService.roleValue;

    if (!currentRole) return [];

    const allowedRoles = this.roleService.getAssignableRoles(currentRole);

    return allowedRoles.map((role) => ({
      value: role,
      label: this.formatRole(role),
    }));
  }

  private formatRole(role: Role): string {
    return role
      .replace('ROLE_', '') // remove prefix
      .toLowerCase() // lowercase
      .replace(/_/g, ' ') // underscores → spaces
      .replace(/\b\w/g, (l) => l.toUpperCase()); // capitalize words
  }

  onCreateEmployee(value: any) {
    this.employeeService.createEmployees(value).subscribe({
      next: () => {
        this.employeeService.getEmployees().subscribe({
          next: (data) => {
            console.log(data);
            this.notificationService.notify('Empleado creado con éxito!', 'success');
            this.showCreateForm = false;
          },
          error: () => {
            this.notificationService.notify('Error cargando lista de empleados', 'error');
          },
        });
      },
      error: () => {
        this.notificationService.notify('No se ha podido crear al empleado', 'error');
      },
    });
  }

  deleteEmployee(arg0: any) {
    throw new Error('Method not implemented.');
  }
  applyFilter($event: string) {
    throw new Error('Method not implemented.');
  }

  private getRestaurantName() {
    this.restaurantService.getEmployeeRestaurant().subscribe({
      next: (restaurant) => {
        console.log(restaurant);
        // Adjust depending on your backend response structure
        this.restaurantName.set(restaurant.restaurantName);
      },
      error: () => {
        this.restaurantName.set('Restaurante');
        this.notificationService.notify('Error cargando restaurante', 'error');
      },
    });
  }
}
