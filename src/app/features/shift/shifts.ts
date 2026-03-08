import { Component, inject, signal } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box';
import { MaterialModule } from '../../shared/ui/material-modules';
import { EmployeeInterface } from '../../interfaces/employee';
import { ShiftInterface } from '../../interfaces/shift';

import { EmployeeService } from '../../core/services/employee.service';
import { ShiftService } from '../../core/services/shift.service';
import { NotificationService } from '../../core/services/notification.service';
import { ScreenSizeService } from '../../core/services/screen-size';

@Component({
  selector: 'app-shifts',
  standalone: true,
  imports: [CommonModule, KeyValuePipe, SearchBoxComponent, MaterialModule],
  templateUrl: './shifts.html',
  styleUrl: './shifts.scss',
})
export class ShiftsComponent {
  protected employeeService = inject(EmployeeService);
  private shiftService = inject(ShiftService);
  private notificationService = inject(NotificationService);
  public screenSize = inject(ScreenSizeService);

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
    },
    error: () => {
      this.notificationService.notify('Error cargando turnos', 'error');
    },
  });
}

  buildShiftGroups(employees: EmployeeInterface[]) {
    const groups: Record<string, EmployeeInterface[]> = {
      MORNING: [],
      AFTERNOON: [],
      EVENING: [],
      NIGHT: [],
      'SIN ASIGNAR': [],
    };

    employees.forEach((emp) => {
      const shift = emp.shift || 'SIN ASIGNAR';

      if (!groups[shift]) {
        groups[shift] = [];
      }

      groups[shift].push(emp);
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
}