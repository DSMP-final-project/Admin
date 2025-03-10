import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-delete-confirm',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatIcon
  ],
  template: `
    <h2 mat-dialog-title>Are you sure!</h2>
    <mat-dialog-content
      style="display: flex; align-items: center; background-color: blanchedalmond; justify-content: center;">
      <mat-icon>warning</mat-icon>
      This will remove all the data belongs to this.
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
      <button mat-button color="warn" (click)="deleteProduct()">
        Delete
      </button>
    </mat-dialog-actions>
  `,
  styleUrl: './delete-confirm.component.css'
})
export class DeleteConfirmComponent {
  readonly data = inject<any>(MAT_DIALOG_DATA);
  private readonly productService = inject(ProductService);
  private readonly dialogRef = inject(MatDialogRef<DeleteConfirmComponent>);

  deleteProduct() {
    this.productService.deleteProduct(this.data.productId).subscribe({
      next: (response) => {
        location.reload();
        this.dialogRef.close();
      },
      error: (error) => {
      }
    })
  }
}
