import { Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../shared/ui/material-modules';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { ScreenSizeService } from '../../core/services/screen-size';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form';
import { FormFieldInterface } from '../../interfaces/form-field';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box';
import { CreatePanelComponent } from '../../shared/components/create-panel/create-panel';
import { AdminResponseInterface } from '../../interfaces/admin';
@Component({
  selector: 'app-admin',
  standalone: true, // Asegúrate de que sea standalone
  imports: [
    MaterialModule,
    CommonModule,
    DynamicFormComponent,
    SearchBoxComponent,
    CreatePanelComponent,
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class AdminComponent {
  protected adminService = inject(AdminService);
  public screenSize = inject(ScreenSizeService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  // Lista que se muestra en la tabla
  admins = signal<AdminResponseInterface[]>([]);
  allAdmins: AdminResponseInterface[] = [];

  displayedColumns: string[] = ['username', 'email', 'actions'];

  // Lógica del Formulario
  showCreateForm = false;
  adminFields: FormFieldInterface[] = [
    { name: 'username', label: 'Nombre de usuario', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Contraseña', type: 'password', required: true },
    // {
    //   name: 'role',
    //   label: 'Rol',
    //   type: 'select',
    //   required: true,
    //   options: [{ value: 'ADMIN', label: 'Admin' }],
    // },
  ];

  // Al iniciar

  ngOnInit() {
    this.adminService.getAllAdmins().subscribe({
      next: (data) => {
        console.log(data);
        this.allAdmins = data;
        this.admins.set(data);
      },
      error: () => {
        this.notify('Error cargando administradores', 'error');
      },
    });
  }

  // FILTRO DE TEXTO
  applyFilter(filterValue: string) {
    if (!filterValue) {
      this.admins.set(this.allAdmins);
      return;
    }

    const filtered = this.allAdmins.filter(
      (admin) =>
        admin.username.toLowerCase().includes(filterValue.toLowerCase()) ||
        admin.email.toLowerCase().includes(filterValue.toLowerCase()),
    );

    this.admins.set(filtered);
  }

  // Función para lanzar el aviso
  private notify(message: string, type: 'success' | 'error' = 'success') {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error'],
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  onCreateAdmin(value: any) {
    this.adminService.createAdmin(value).subscribe({
      next: () => {
        // Refrescamos la lista después de que el backend confirme creación
        this.adminService.getAllAdmins().subscribe({
          next: (data) => {
            this.allAdmins = data;
            this.admins.set(data);
            this.notify('¡Administrador creado con éxito!', 'success');
            this.showCreateForm = false;
          },
          error: () => {
            this.notify('Error recargando administradores', 'error');
          },
        });
      },
      error: () => {
        this.notify('Error: No se ha podido crear el administrador', 'error');
      },
    });
  }

  deleteAdmin(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '350px' });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminService.deleteById(id).subscribe({
          next: () => {
            this.admins.update((list) => list.filter((a) => a.idAdmin !== id));
            this.allAdmins = this.allAdmins.filter((a) => a.idAdmin !== id);
            this.notify('Administrador borrado correctamente');
          },
          error: () => {
            this.notify('Error: No se ha podido borrar el administrador', 'error');
          },
        });
      }
    });
  }

  trackById(index: number, item: AdminResponseInterface): number {
    return item.idAdmin;
  }
}
