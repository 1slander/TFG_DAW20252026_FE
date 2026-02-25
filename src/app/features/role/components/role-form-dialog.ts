import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/ui/material-modules';

@Component({
  selector: 'app-role-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, MatDialogContent, MatDialogActions],
  templateUrl: './role-form-dialog.html', // 👈 Apuntamos al archivo externo
  styleUrl: './role-form-dialog.scss'
})
export class RoleFormDialogComponent {
  private dialogRef = inject(MatDialogRef<RoleFormDialogComponent>);

  roleData = {
    roleName: '',
    category: ''
  };

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.roleData.roleName && this.roleData.category) {
      this.dialogRef.close(this.roleData);
    }
  }
}
