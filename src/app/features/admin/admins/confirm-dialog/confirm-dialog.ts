import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirmar eliminación</h2>
    <mat-dialog-content>
      ¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Eliminar</button>

      <button mat-button (click)="onNoClick()">Cancelar</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialog {
  private dialogRef = inject(MatDialogRef<ConfirmDialog>);

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
