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
      rolesAllowed: ['ADMIN'],
      route: () => `${this.base}/admin`,
    },
    {
      title: 'Roles',
      description: 'Vista para insertar nuevos roles.',
      rolesAllowed: ['ADMIN'], // Owner will no longer see this as requested: "Admin solo deberá ver Roles, Admins y Users"
      route: () => `${this.base}/role`,
    },
    {
      title: 'Usuarios',
      description: 'Vista de todos los usuarios.',
      rolesAllowed: ['ADMIN'], // ONLY ADMIN as requested
      route: () => `${this.base}/user`,
    },
    {
      title: 'Empleados',
      description: 'Gestión y listado de empleados.',
      rolesAllowed: ['OWNER'],
      route: () => `${this.base}/employee`,
    },
    {
      title: 'Restaurantes',
      description: 'Módulo para la gestión de locales.',
      rolesAllowed: ['OWNER'],
      route: () => `${this.base}/restaurant`,
    },
    {
      title: 'Turnos',
      description: 'Módulo para la gestión de turnos.',
      rolesAllowed: ['OWNER', 'EMPLOYEE'],
      route: () => `${this.base}/shift`,
    },
  ];

  get modules() {
    return this.allModules.filter(m => m.rolesAllowed.includes(this.authService.roleValue));
  }
}
