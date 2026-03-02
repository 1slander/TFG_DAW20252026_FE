import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../shared/ui/material-modules';
import { DetailViewComponent } from '../../shared/components/detail-view.component/detail-view.component';
import { RestaurantService } from '../../core/services/restaurant.service';
import { RestaurantsResponseInterface } from '../../interfaces/restaurant';
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
import { AuthService } from '../../core/services/auth.service';
import { AdminService } from '../../core/services/admin.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MaterialModule,
    DetailViewComponent,
    DynamicFormComponent,
    SearchBoxComponent,
    CreatePanelComponent,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersComponent implements OnInit {
  //nos traemos el service
  private employeeService = inject(EmployeeService);
  public screenSize = inject(ScreenSizeService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  private adminService = inject(AdminService);
  private notificationService = inject(NotificationService);
  private restaurantService = inject(RestaurantService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Guardamos todos los empleados originales traídos de base de datos
  private sourceEmployees: EmployeeInterface[] = [];

  // El signal visible en la tabla
  employees = signal<EmployeeInterface[]>([]);
  restaurants = signal<RestaurantsResponseInterface[]>([]);
  role = signal(this.authService.getRole());

  displayedColumns = computed(() =>
    this.screenSize.isMobile()
      ? ['fullName', 'actions']
      : ['fullName', 'email', 'role', 'restaurant', 'actions'],
  );

  // Formulario
  showCreateForm = false;
  initialOwnerData: Record<string, any> = {};

  employeeFields: FormFieldInterface[] = [
    { name: 'firstName', label: 'Nombre', type: 'text', required: true },
    { name: 'lastName', label: 'Apellidos', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Contraseña', type: 'password', required: true },
    {
      name: 'dni',
      label: 'DNI',
      type: 'text',
      required: true,
      maxLength: 9,
      minLength: 9,
      pattern: '^[0-9]{8}[A-Z]$',
    },
    { name: 'hireDate', label: 'Fecha de contratación', type: 'date', required: true },
    { name: 'hourlyWage', label: 'Salario por hora', type: 'number', required: true },
  ];

  ownerFields: FormFieldInterface[] = [
    { name: 'firstName', label: 'Nombre', type: 'text', required: true },
    { name: 'lastName', label: 'Apellidos', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Contraseña', type: 'password', required: true },
    {
      name: 'dni',
      label: 'DNI',
      type: 'text',
      required: true,
      maxLength: 9,
      minLength: 9,
      pattern: '^[0-9]{8}[A-Z]$',
    },
  ];

  ngOnInit() {
    this.loadEmployees();
    this.loadRestaurants();

    // Comprobar parámetros de ruta para la autocompletación desde admisiones
    this.route.queryParams.subscribe((params) => {
      if (params['action'] === 'createOwner') {
        this.initialOwnerData = {
          firstName: params['firstName'] || '',
          lastName: params['lastName'] || '',
          email: params['email'] || '',
          dni: params['dni'] || '',
        };
        this.showCreateForm = true;
      }
    });
  }

  loadRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe({
      next: (data) => this.restaurants.set(data),
      error: (err) => console.error('Error fetching restaurants', err),
    });
  }

  loadEmployees() {
    this.employeeService.getEmployeesForAdmin().subscribe({
      next: (data: EmployeeInterface[]) => {
        console.log(data);
        this.sourceEmployees = data;
        this.employees.set(data);
      },
      error: (err) => {
        console.error('Error fetching employees', err);
        this.notificationService.notify('No se pudo cargar la lista de trabajadores', 'error');
      },
    });
  }

  applyFilter(filterValue: string) {
    if (!filterValue) {
      this.employees.set(this.sourceEmployees);
      return;
    }

    const lowerFIlter = filterValue.toLowerCase();
    this.employees.set(
      this.sourceEmployees.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(lowerFIlter) ||
          employee.lastName.toLowerCase().includes(lowerFIlter) ||
          employee.email.toLowerCase().includes(lowerFIlter),
      ),
    );
  }

  onCreateOwner(value: any) {
    this.adminService.createOwner(value).subscribe({
      next: (res) => {
        this.notificationService.notify('¡Dueño creado con éxito!', 'success');
        this.showCreateForm = false;
        this.initialOwnerData = {};

        // Limpiamos los query parameters para evitar que se reabra el formulario al recargar
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { action: null, firstName: null, lastName: null, email: null, dni: null },
          queryParamsHandling: 'merge',
        });

        this.loadEmployees();
      },
      error: (error) => {
        this.notificationService.notify('Error: no se ha podido crear el dueño', 'error');
        console.error('Error al crear owner', error);
      },
    });
  }

  onCreateEmployee(value: any) {
    try {
      // this.employeeService.createEmployee(value);
      // this.employees.set(this.employeeService.getEmployees());
      // this.notify('¡Empleado creado con exito!', 'success')
      // this.showCreateForm = false;
    } catch (error) {
      this.notificationService.notify('Error: no se ha podido crear', 'error');
      console.error('Error al crear empleado', error);
    }
  }

  // onToggleActive(event: { id: number; nextIsActive: boolean }) {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '350px' });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       try {
  //         // This requires adjusting EmployeeService to fire a PUT request to the backend.
  //         // For now, this will just call the mock function but since we are fetching from backend
  //         // it won't persist unless 'setActive' also hits an API.
  //         // this.employeeService.setActive(event.id, event.nextIsActive);

  //         // Patch locally to avoid reloading the whole table unnecessarily
  //         const patchedSource = this.sourceEmployees.map(emp =>
  //           emp.id === event.id ? { ...emp, isActive: event.nextIsActive } : emp
  //         );
  //         this.sourceEmployees = patchedSource;
  //         this.employees.set(patchedSource);

  //         const selEmp = patchedSource.find((e) => e.id === event.id);
  //         this.selectedEmployee = selEmp ?? this.selectedEmployee;

  //       } catch (error) {
  //         this.notify('Error: no se ha podido ejecutar', 'error')
  //       }
  //     }
  //   });
  // }

  //añadimos la lista de employees a una variable de tipo EmployeeInterface[]
  selectedEmployee = signal<EmployeeInterface | null>(null);
  sidenavOpen = signal(false);

  openSidenav(employee: EmployeeInterface) {
    this.selectedEmployee.set(employee);
    this.sidenavOpen.set(true);
  }

  closeSidenav() {
    this.selectedEmployee.set(null);
    this.sidenavOpen.set(false);
  }

  getRestaurantName(employee: EmployeeInterface): string {
    // If it's already an object with a name (from EmployeeInterface)
    if (employee.restaurant && (employee.restaurant as any).name) {
      return (employee.restaurant as any).name;
    }
    // If it's a string (old behavior)
    if (typeof employee.restaurant === 'string') {
      return employee.restaurant;
    }
    // Search in restaurants list by owner ID (for Owners)
    // We use == for defensive type matching
    const found = this.restaurants().find((r) => r.idOwner == (employee as any).id);

    // Debugging link
    const isOwner =
      typeof employee.role === 'string'
        ? employee.role === 'ROLE_OWNER'
        : (employee.role as any)?.roleName === 'ROLE_OWNER';

    if (!found && isOwner) {
      console.warn(
        `No restaurant found for OWNER ID: ${employee.id}. Available restaurants:`,
        this.restaurants(),
      );
    }

    return found ? found.restaurantName : 'No asignado';
  }
}
