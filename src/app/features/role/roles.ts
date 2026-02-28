import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/ui/material-modules';
import { RoleService } from '../../core/services/role.service';
import { ScreenSizeService } from '../../core/services/screen-size';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form';
import { FormFieldInterface } from '../../interfaces/form-field';

// Servicios para avisos y diálogos
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog';
import { CreatePanelComponent } from '../../shared/components/create-panel/create-panel';
import { RoleResponseInterface } from '../../interfaces/role';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, MaterialModule, DynamicFormComponent, CreatePanelComponent],
  templateUrl: './roles.html',
  styleUrl: './roles.scss',
})
export class RolesComponent {
  protected roleService = inject(RoleService);
  public screenSize = inject(ScreenSizeService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  // Usamos Signal para que la UI vuele
  roles = signal<RoleResponseInterface[]>([]);
  showCreateForm = false;
  selectedCategory = signal<string>('ALL');
  displayedColumns: string[] = ['roleName'];

  roleFields: FormFieldInterface[] = [
    { name: "roleName", label: "Nombre del Rol (ej: ADMIN)", type: "text", required: true },
  ];


  private notify(message: string, type: 'success' | 'error' = 'success') {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error'],
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  ngOnInit() {
    this.roleService.getRoles().subscribe({
      next: (roles) => this.roles.set(roles),
      error: (err) => console.error(err)
    });
  }

  onCreateRole(value: any) {
    console.log(value);
    this.roleService.createRole(value).subscribe({
      next: (role) => {
        this.roles.update(list => [...list, role]);
        this.notify('¡Rol creado correctamente!');
        this.showCreateForm = false;
      },
      error: () => { this.notify('Error: No se ha podido crear el rol', 'error'); }
    });
  }

  // deleteRole(id: number) {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '350px' });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.roleService.deleteById(id).subscribe({
  //         next: () => {
  //           this.roles.update(list => list.filter(r => r.idRole !== id));
  //           this.notify('Rol eliminado con éxito');
  //         },
  //         error: (err) => {
  //           console.error(err);
  //           this.notify('Error: No se ha podido eliminar el rol', 'error');
  //         }
  //       });
  //     }
  //   });
  // }

  // onCategoryChange(value: string) {
  //   this.selectedCategory.set(value);
  //   const all = this.roleService.getRoles();
  //   this.roles.set(value === 'ALL' ? all : all.filter(r => r.roleCategory === value));
  // }

  trackById(index: number, item: any) {
    return item.idRole;
  }
}
