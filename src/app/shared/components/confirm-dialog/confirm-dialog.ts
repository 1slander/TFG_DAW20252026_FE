import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.html',
  styleUrl:'./confirm-dialog.scss'
})
export class ConfirmDialog {
  private dialogRef = inject(MatDialogRef<ConfirmDialog>);

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
