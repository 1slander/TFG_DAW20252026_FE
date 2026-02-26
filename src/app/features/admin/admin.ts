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
@Component({
  selector: 'app-admin',
  standalone: true, // Asegúrate de que sea standalone
  imports: [MaterialModule, CommonModule, DynamicFormComponent],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class AdminComponent {
  protected adminService = inject(AdminService);
  public screenSize = inject(ScreenSizeService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  // Lista que se muestra en la tabla
  admins = signal(this.adminService.getAdmins());
  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'actions'];

  // Lógica del Formulario
  showCreateForm = false;
  adminFields: FormFieldInterface[] = [
    { name: "username", label: "Nombre de usuario", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Contraseña", type: "password", required: true },
    { name: "role", label: "Rol", type: "select", required: true, options: [{ value: "ADMIN", label: "Admin" }] }
  ];

  // FILTRO DE TEXTO
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const allAdmins = this.adminService.getAdmins();

    if (!filterValue) {
      this.admins.set(allAdmins); // Usamos .set() para actualizar
      return;
    }

    this.admins.set(allAdmins.filter(admin =>
      admin.username.toLowerCase().includes(filterValue) ||
      admin.email.toLowerCase().includes(filterValue)
    ));
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
    try {
      // 1. Llamamos al servicio para guardar los datos
      this.adminService.createAdmin(value);

      // 2. Actualizamos el Signal de la tabla inmediatamente
      // Obtenemos la lista actualizada del servicio y la seteamos
      this.admins.set(this.adminService.getAdmins());

      // 3. Notificación de éxito
      this.notify('¡Administrador creado con éxito!', 'success');

      // 4. Cerramos el acordeón del formulario automáticamente
      this.showCreateForm = false;

    } catch (error) {
      // 5. Si algo falla (ej. error de validación), mostramos el aviso en rojo
      this.notify('Error: No se ha podido crear el administrador', 'error');
      console.error('Error al crear admin:', error);
    }
  }

  deleteAdmin(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '350px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          // Intentamos borrar
          this.adminService.deleteById(id);

          // Si el service no lanza error, actualizamos UI y avisamos
          this.admins.update(list => list.filter(a => a.id !== id));
          this.notify('Administrador borrado correctamente');
        } catch (error) {
          // Si algo sale mal en el service
          this.notify('Error: No se ha podido borrar el administrador', 'error');
        }
      }
    });
  }
  trackById(index: number, item: any) {
    return item.id;
  }
}


