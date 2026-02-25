import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeInterface } from '../../../../interfaces/employee';
import { MaterialModule } from '../../../../shared/ui/material-modules';

@Component({
  selector: 'app-employee-detail-sidenav',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './employee-detail-sidenav.html',
  styleUrl: './employee-detail-sidenav.scss',
})
export class EmployeeDetailSidenav {

  @Input() employee: EmployeeInterface | null = null;
  @Input() opened: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() toggleActive = new EventEmitter<{ id: number, nextIsActive: boolean }>()



}
