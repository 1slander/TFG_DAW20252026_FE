import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from '../../shared/ui/material-modules';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public authService = inject(AuthService);
  base = '/dashboard';

  private allModules = [
    {
      title: 'Administradores',
      description: 'Lista de todos los Administradores.',
      rolesAllowed: ['ROLE_ADMIN'],
      route: () => `${this.base}/admins`,
    },
    {
      title: 'Admisión',
      description: 'Aprobar o rechazar nuevos Owners.',
      rolesAllowed: ['ROLE_ADMIN'],
      route: () => `${this.base}/admision`,
    },
    {
      title: 'Roles',
      description: 'Vista para insertar nuevos roles.',
      rolesAllowed: ['ROLE_ADMIN'], // Owner will no longer see this as requested: "Admin solo deberá ver Roles, Admins y Users"
      route: () => `${this.base}/roles`,
    },
    {
      title: 'Usuarios',
      description: 'Vista de todos los usuarios.',
      rolesAllowed: ['ROLE_ADMIN'], // ONLY ADMIN as requested
      route: () => `${this.base}/users`,
    },
    {
      title: 'Empleados',
      description: 'Gestión y listado de empleados.',
      rolesAllowed: ['ROLE_OWNER', 'ROLE_MANAGER'],
      route: () => `${this.base}/employees`,
    },
    {
      title: 'Restaurantes',
      description: 'Módulo para la gestión de locales.',
      rolesAllowed: ['ROLE_ADMIN', 'ROLE_OWNER'],
      route: () => `${this.base}/restaurants`,
    },
    {
      title: 'Turnos',
      description: 'Módulo para la gestión de turnos.',
      rolesAllowed: [
        'ROLE_OWNER',
        'ROLE_MANAGER',
        'ROLE_ASSISTANT_MANAGER',
        'ROLE_TEAM_LEADER',
        'ROLE_EMPLOYEE',
      ],
      route: () => `${this.base}/shifts`,
    },
    {
      title: 'Mesas',
      description: 'Módulo para la gestión de mesas.',
      rolesAllowed: [
        'ROLE_OWNER',
        'ROLE_MANAGER',
        'ROLE_ASSISTANT_MANAGER',
        'ROLE_TEAM_LEADER',
        'ROLE_EMPLOYEE',
      ],
      route: () => `${this.base}/tables`,
    },
  ];

  get modules() {
    const role = this.authService.roleValue;
    if (!role) return [];
    return this.allModules.filter((m) => m.rolesAllowed.includes(role));
  }
}
