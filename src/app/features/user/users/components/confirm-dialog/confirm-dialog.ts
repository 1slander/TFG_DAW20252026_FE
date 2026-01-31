import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.html'
})
export class ConfirmDialog {
  private dialogRef = inject(MatDialogRef<ConfirmDialog>);

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}