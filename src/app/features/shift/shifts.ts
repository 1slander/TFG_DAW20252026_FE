import { Component, inject, signal } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box';
import { MaterialModule } from '../../shared/ui/material-modules';
import { EmployeeInterface } from '../../interfaces/employee';
import { ShiftInterface } from '../../interfaces/shift';
import { CreatePanelComponent } from '../../shared/components/create-panel/create-panel';
import { EmployeeService } from '../../core/services/employee.service';
import { ShiftService } from '../../core/services/shift.service';
import { NotificationService } from '../../core/services/notification.service';
import { ScreenSizeService } from '../../core/services/screen-size';
import { C } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-shifts',
  standalone: true,
  imports: [CommonModule, KeyValuePipe, SearchBoxComponent, MaterialModule,CreatePanelComponent],
  templateUrl: './shifts.html',
  styleUrl: './shifts.scss',
})
export class ShiftsComponent {
  protected employeeService = inject(EmployeeService);
  private shiftService = inject(ShiftService);
  private notificationService = inject(NotificationService);
  public screenSize = inject(ScreenSizeService);
  showCreateShiftPanel = false;

  shiftTypes = ['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT'];

  employees = signal<EmployeeInterface[]>([]);
  allEmployees: EmployeeInterface[] = [];
  shiftGroups = signal<Record<string, EmployeeInterface[]>>({});
  availableShifts = signal<ShiftInterface[]>([]);

  ngOnInit() {
    this.loadEmployees();
    this.loadShifts();
  }

loadEmployees() {
  this.employeeService.getEmployees().subscribe({
    next: (data) => {
      this.allEmployees = data;
      this.employees.set(data);
      this.buildShiftGroups(data);
    },
    error: () => {
      this.notificationService.notify('Error cargando empleados', 'error');
    },
  });
}

loadShifts() {
  this.shiftService.getAllShifts().subscribe({
    next: (data) => {
      this.availableShifts.set(data);
      this.buildShiftGroups(this.employees());
    },
    error: () => {
      this.notificationService.notify('Error cargando turnos', 'error');
    },
  });
}

buildShiftGroups(employees: EmployeeInterface[]) {
  const groups: Record<string, EmployeeInterface[]> = {};

  this.availableShifts().forEach((shift) => {
    groups[shift.assignShift] = [];
  });

  groups['SIN ASIGNAR'] = [];

  employees.forEach((emp) => {
    const shift = emp.shift || 'SIN ASIGNAR';

    if (groups[shift]) {
      groups[shift].push(emp);
    } else {
      groups['SIN ASIGNAR'].push(emp);
    }
  });

  this.shiftGroups.set(groups);
}

  applyFilter(filterValue: string) {
    if (!filterValue) {
      this.employees.set(this.allEmployees);
      this.buildShiftGroups(this.allEmployees);
      return;
    }

    const filtered = this.allEmployees.filter((emp) =>
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(filterValue.toLowerCase()),
    );

    this.employees.set(filtered);
    this.buildShiftGroups(filtered);
  }

  formatShiftLabel(shift: string): string {
    const labels: Record<string, string> = {
      MORNING: 'Turno de mañana',
      AFTERNOON: 'Turno de tarde',
      EVENING: 'Turno de tarde-noche',
      NIGHT: 'Turno de noche',
      'SIN ASIGNAR': 'Sin asignar',
    };

    return labels[shift] || shift;
  }

  changeEmployeeShift(employeeId: number, shiftId: number) {
    this.employeeService.assignShiftToEmployee(employeeId, shiftId).subscribe({
      next: () => {
        this.notificationService.notify('Turno actualizado correctamente', 'success');
        this.loadEmployees();
      },
      error: () => {
        this.notificationService.notify('Error actualizando turno', 'error');
      },
    });
  }

  deleteShift(idShift: number) {
    this.shiftService.deleteShift(idShift).subscribe({
      next: () => {
        this.notificationService.notify('Turno eliminado correctamente', 'success');
        this.loadShifts();
        this.loadEmployees();
      },
      error: () => {
        this.notificationService.notify('No se pudo eliminar el turno', 'error');
      },
    });
  }

createShift(assignShift: string) {
  this.shiftService.createShift({ assignShift }).subscribe({
    next: () => {
      this.notificationService.notify('Turno creado correctamente', 'success');
      this.loadShifts();
      this.loadEmployees();
      this.showCreateShiftPanel = false;
    },
    error: () => {
      this.notificationService.notify('No se pudo crear el turno', 'error');
    },
  });
}

  updateShift(idShift: number, assignShift: string) {
    this.shiftService.updateShift(idShift, { assignShift }).subscribe({
      next: () => {
        this.notificationService.notify('Turno actualizado correctamente', 'success');
        this.loadShifts();
        this.loadEmployees();
      },
      error: () => {
        this.notificationService.notify('No se pudo actualizar el turno', 'error');
      },
    });
  }

  getShiftByName(assignShift: string): ShiftInterface | undefined {
    return this.availableShifts().find((shift) => shift.assignShift === assignShift);
  }

  onDeleteShift(assignShift: string) {
    const shift = this.availableShifts().find((s) => s.assignShift === assignShift);

    if (!shift) {
      this.notificationService.notify('No se encontró el turno', 'error');
      return;
    }

    this.deleteShift(shift.idShift);
  }

  onUpdateShift(currentShiftName: string, newShiftName: string) {
    const shift = this.getShiftByName(currentShiftName);

    if (!shift) {
      this.notificationService.notify('No se encontró el turno', 'error');
      return;
    }

    this.updateShift(shift.idShift, newShiftName);
  }

  getAvailableShiftTypesToCreate(): string[] {
    const existing = this.availableShifts().map((shift) => shift.assignShift);
    return this.shiftTypes.filter((type) => !existing.includes(type));
  }
}
