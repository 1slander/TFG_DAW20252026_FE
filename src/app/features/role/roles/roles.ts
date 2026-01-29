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
      }
    });
  }

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

