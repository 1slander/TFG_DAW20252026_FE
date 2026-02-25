import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/ui/material-modules';
import { RoleService } from '../../core/services/role.service';
import { ScreenSize } from '../../core/services/screen-size';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form';
import { FormField } from '../../interfaces/form-field';

// Servicios para avisos y diálogos
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, MaterialModule, DynamicFormComponent],
  templateUrl: './roles.html',
  styleUrl: './roles.scss',
})
export class RolesComponent {
  protected roleService = inject(RoleService);
  public screenSize = inject(ScreenSize);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  // Usamos Signal para que la UI vuele
  roles = signal(this.roleService.getRoles());
  showCreateForm = false;
  selectedCategory = signal<string>('ALL');
  displayedColumns: string[] = ['id', 'roleName', 'roleCategory', 'actions'];

  roleFields: FormField[] = [
    { name: "roleName", label: "Identificador del Rol", type: "text", required: true },
    {
      name: "roleCategory",
      label: "Categoría de Nivel",
      type: "select",
      required: true,
      options: [
        { value: "ADMIN", label: "Admin" },
        { value: "OWNER", label: "Owner" },
        { value: "EMPLOYEE", label: "Employee" }
      ]
    }
  ];

  private notify(message: string, type: 'success' | 'error' = 'success') {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error'],
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  onCreateRole(value: any) {
    try {
      this.roleService.createRole(value);
      this.roles.set(this.roleService.getRoles()); // Actualización limpia
      this.notify('¡Rol creado correctamente!');
      this.showCreateForm = false;
    } catch (error) {
      this.notify('Error: No se ha podido crear el rol', 'error');
    }
  }

  deleteRole(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialog, { width: '350px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          this.roleService.deleteById(id);
          // Actualización optimista del signal
          this.roles.update(list => list.filter(r => r.id !== id));
          this.notify('Rol eliminado con éxito');
        } catch (error) {
          this.notify('Error: No se ha podido eliminar el rol', 'error');
        }
      }
    });
  }

  onCategoryChange(value: string) {
    this.selectedCategory.set(value);
    const all = this.roleService.getRoles();
    this.roles.set(value === 'ALL' ? all : all.filter(r => r.roleCategory === value));
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
