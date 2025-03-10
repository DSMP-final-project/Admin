import {Component, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {ProductService} from "../../../service/product.service";
import {response} from "express";

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  template: `
    <h2 mat-dialog-title>{{ data.type }} Product</h2>
    <form [formGroup]="form">
      <mat-dialog-content class="mat-typography">

        <div class="col-12" style="margin-bottom: 15px">
          <label for="productName">Product Name</label>
          <input type="text" formControlName="productName" class="form-control" id="product_name">
        </div>

        <div class="col-12" style="margin-bottom: 15px">
          <label for="description">Product Description</label>
          <input type="text" formControlName="description" class="form-control" id="description">
        </div>

        <div class="col-12" style="margin-bottom: 15px">
          <label for="unitPrice">Product Unit Price</label>
          <input type="number" formControlName="unitPrice" class="form-control" id="unit_price">
        </div>

        <div class="col-12" style="margin-bottom: 15px">
          <label for="discount">Discount</label>
          <input type="number" formControlName="discount" class="form-control" id="discount">
        </div>

        <div class="col-12" style="margin-bottom: 15px">
          <label for="qty">Product QTY On Hand</label>
          <input type="number" formControlName="qty" class="form-control" id="qty">
        </div>

      </mat-dialog-content>

      <mat-dialog-actions align="end">

        <button mat-button mat-dialog-close>Close</button>
        <button mat-button class="btn btn-primary" (click)="process()">{{ data.type }} Product</button>

      </mat-dialog-actions>

    </form>
  `,
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent implements OnInit {
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly productService = inject(ProductService);
  private readonly dialogRef = inject(MatDialogRef<ManageProductComponent>)

  form = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    qty: new FormControl('', [Validators.required]),
    unitPrice: new FormControl('', [Validators.required]),
    discount: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.form.patchValue({
      qty: this.data?.item?.qty,
      unitPrice: this.data?.item?.unitPrice,
      description: this.data?.item?.description,
      productName: this.data?.item?.productName,
      discount: this.data?.item?.discount
    })
  }

  process() {

    const obj = {
      qty: this.form.value.qty,
      unitPrice: this.form.value.unitPrice,
      description: this.form.value.description,
      productName: this.form.value.productName,
      discount: this.form.value.discount
    }

    if (this.data.type == "Add") {

      this.productService.saveProduct(obj).subscribe({
        next: (response) => {
          this.dialogRef.close(true);
          location.reload();
        },
        error: err => {
        }
      })
    } else if (this.data.type == "Update") {
      this.productService.updateProduct(this.data?.item?.propertyId, obj).subscribe({
        next: (response) => {
          this.dialogRef.close(true);
          location.reload();
        },
        error: err => {
        }
      })
    }
  }
}
