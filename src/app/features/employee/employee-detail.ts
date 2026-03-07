import { Component, Inject, OnInit, signal, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/ui/material-modules';
import { EmployeeInterface } from '../../interfaces/employee';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form';
import { FormFieldInterface } from '../../interfaces/form-field';
import { RoleService } from '../../core/services/role.service';
import { AuthService } from '../../core/services/auth.service';
import { Role } from '../../core/models/RoleEnum';

@Component({
    selector: 'app-employee-detail',
    standalone: true,
    imports: [CommonModule, MaterialModule, DynamicFormComponent],
    templateUrl: './employee-detail.html',
    styleUrl: './employee-detail.scss',
})
export class EmployeeDetailComponent implements OnInit {
    private roleService = inject(RoleService);
    private authService = inject(AuthService);

    isEditing = signal(false);
    employeeFields: FormFieldInterface[] = [];
    initialValues: Record<string, any> = {};

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { employee: EmployeeInterface },
        private dialogRef: MatDialogRef<EmployeeDetailComponent>
    ) { }

    ngOnInit(): void {
        const roleData = this.data.employee.role as any;
        this.initialValues = {
            firstName: this.data.employee.firstName,
            lastName: this.data.employee.lastName,
            email: this.data.employee.email,
            isActive: this.data.employee.isActive,
            hourlyWage: this.data.employee.hourlyWage,
            role: roleData?.roleName || roleData?.name || this.data.employee.role
        };

        this.employeeFields = [
            { name: 'firstName', label: 'Nombre', type: 'text', required: true },
            { name: 'lastName', label: 'Apellidos', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'isActive', label: 'Activo', type: 'checkbox' },
            { name: 'hourlyWage', label: 'Salario por hora', type: 'number', required: true },
            {
                name: 'role',
                label: 'Rol',
                type: 'select',
                options: this.buildRoleOptions(),
            },
        ];
    }

    private buildRoleOptions(): { value: string; label: string }[] {
        const currentRole = this.authService.roleValue;
        if (!currentRole) return [];
        return this.roleService.getAssignableRoles(currentRole).map((role: Role) => ({
            value: role,
            label: this.formatRole(role),
        }));
    }

    private formatRole(role: Role): string {
        return role.replace('ROLE_', '').toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
    }

    toggleEdit() {
        this.isEditing.set(!this.isEditing());
    }

    onUpdate(value: any) {
        this.dialogRef.close({ action: 'update', data: value });
    }

    onDelete() {
        this.dialogRef.close({ action: 'delete' });
    }

    onClose() {
        this.dialogRef.close();
    }
}
