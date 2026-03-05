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
  filteredEmployees = signal<EmployeeInterface[]>([]);

  showCreateForm = false;

  employeeFields: FormFieldInterface[] = [];
  restaurantName = signal<string>('Cargando...');

  displayedColumns: string[] = ['firstName', 'lastName', 'dni', 'email', 'role', 'actions'];

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
        console.log('Employees loaded:', data);
        this.employees.set(data);
        this.filteredEmployees.set(data);
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
      next: (newEmployee: any) => {
        // Option 1: Full reload
        // this.getDatosIniciales();

        // Option 2: Local update for "instant" feel
        const current = this.employees();
        this.employees.set([...current, newEmployee]);
        this.filteredEmployees.set([...current, newEmployee]);

        this.notificationService.notify('Empleado creado con éxito!', 'success');
        this.showCreateForm = false; // Auto-close form
      },
      error: (err) => {
        console.error('Error creating employee:', err);
        this.notificationService.notify('No se ha podido crear al empleado', 'error');
      },
    });
  }

  deleteEmployee(id: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      // Assuming there's a delete method in EmployeeService. 
      // If not, I'll need to check the backend API or implement it if possible.
      // For now, I'll assume it exists or call a general delete if it's a User.
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          const current = this.employees().filter(e => (e as any).idemployee !== id && (e as any).id !== id);
          this.employees.set(current);
          this.filteredEmployees.set(current);
          this.notificationService.notify('Empleado eliminado con éxito', 'success');
        },
        error: () => {
          this.notificationService.notify('Error al eliminar empleado', 'error');
        }
      });
    }
  }

  applyFilter(value: string) {
    const filterValue = value.toLowerCase().trim();
    if (!filterValue) {
      this.filteredEmployees.set(this.employees());
      return;
    }

    const filtered = this.employees().filter(node =>
      node.firstName.toLowerCase().includes(filterValue) ||
      node.lastName.toLowerCase().includes(filterValue) ||
      node.email.toLowerCase().includes(filterValue) ||
      node.dni.toLowerCase().includes(filterValue)
    );
    this.filteredEmployees.set(filtered);
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
