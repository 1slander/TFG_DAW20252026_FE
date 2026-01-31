<<<<<<< HEAD
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/ui/material-modules';
import { RoleService } from '../../../core/services/role.service';
import { ScreenSize } from '../../../core/services/screen-size';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form';
import { FormField } from '../../../interfaces/form-field';

// Servicios para avisos y diálogos
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../admin/admins/confirm-dialog/confirm-dialog';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, MaterialModule, DynamicFormComponent],
  templateUrl: './roles.html',
  styleUrl: './roles.scss',
})
export class Roles {
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
=======
import { Component, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MaterialModule } from "../../../shared/ui/material-modules";
import { MatDialog } from "@angular/material/dialog";
import { RoleFormDialogComponent } from "./components/role-form-dialog";
import { ScreenSize } from "../../../core/services/screen-size";

export interface Role {
  idRole?: number;
  roleName: string;
  category: 'ADMIN' | 'OWNER' | 'EMPLOYEE';
}

@Component({
  selector: 'app-role-management',
  standalone: true,

  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './roles.html',
  styleUrl: './roles.scss'
})
export class Roles implements OnInit {
  private dialog = inject(MatDialog);
  public screenSize = inject(ScreenSize);
  private initialRoles: Role[] = [
    { idRole: 1, roleName: 'ROLE_ADMIN', category: 'ADMIN' },
    { idRole: 2, roleName: 'OWNER', category: 'OWNER' },
    { idRole: 3, roleName: 'MANAGER', category: 'EMPLOYEE' },
    { idRole: 4, roleName: 'ASSISTANT_MANAGER', category: 'EMPLOYEE' },
    { idRole: 5, roleName: 'TEAM_LEADER', category: 'EMPLOYEE' },
    { idRole: 6, roleName: 'EMPLOYEE', category: 'EMPLOYEE' }
  ];

  dataSource = new MatTableDataSource<Role>(this.initialRoles);
  displayedColumns: string[] = ['category', 'roleName', 'actions'];

  newRoleName = signal('');
  selectedCategory = signal<'ADMIN' | 'OWNER' | 'EMPLOYEE' | 'ALL'>('ALL');

  ngOnInit() {
    // Esto es lo que permite que al poner "" (ALL) se vea todo
    this.dataSource.filterPredicate = (data: Role, filter: string) => {
      return filter === '' || data.category.toLowerCase() === filter.toLowerCase();
    };
  }

  addRole() {
    if (!this.newRoleName() || this.selectedCategory() === 'ALL') {
      // Opcional: podrías poner un aviso de que elija una categoría real
      return;
    }

    const newRole: Role = {
      idRole: this.dataSource.data.length + 1,
      roleName: this.newRoleName().toUpperCase(),
      // Forzamos el tipo porque sabemos que no es 'ALL' por el if de arriba
      category: this.selectedCategory() as 'ADMIN' | 'OWNER' | 'EMPLOYEE'
    };

    this.dataSource.data = [...this.dataSource.data, newRole];
    this.newRoleName.set('');
  }

  deleteRole(id: number | undefined) {
    if (id) {
      this.dataSource.data = this.dataSource.data.filter(r => r.idRole !== id);
    }
  }

  onCategoryChange(category: string) {
    this.selectedCategory.set(category as any);
    // Si es ALL, mandamos string vacío para que el filterPredicate muestre todo
    this.dataSource.filter = category === 'ALL' ? '' : category.trim().toLowerCase();
  }

  openAddRoleDialog(): void {
    const dialogRef = this.dialog.open(RoleFormDialogComponent, {
      width: '400px',
      disableClose: true // Evita que se cierre al hacer clic fuera (opcional)
    });

    // Escuchamos cuando el diálogo se cierra
    dialogRef.afterClosed().subscribe(result => {
      // result contiene los datos (roleName y category) si el usuario pulsó "Guardar"
      if (result) {
        this.addNewRole(result.roleName, result.category);
>>>>>>> 983e1e65b784a593d8a4c0ad6b1d9f18a6eb2547
      }
    });
  }

<<<<<<< HEAD
  onCategoryChange(value: string) {
    this.selectedCategory.set(value);
    const all = this.roleService.getRoles();
    this.roles.set(value === 'ALL' ? all : all.filter(r => r.roleCategory === value));
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
=======
  private addNewRole(name: string, cat: 'ADMIN' | 'OWNER' | 'EMPLOYEE') {
    const newRole: Role = {
      idRole: this.dataSource.data.length + 1, // ID temporal
      roleName: name.toUpperCase(),
      category: cat
    };

    // Actualizamos la tabla (sobrescribiendo el array para que Angular lo detecte)
    this.dataSource.data = [...this.dataSource.data, newRole];

    // Opcional: Volvemos a mostrar todos para ver el nuevo registro
    this.onCategoryChange('ALL');
  }
}

>>>>>>> 983e1e65b784a593d8a4c0ad6b1d9f18a6eb2547
