import {Component, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-manage-product-image',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    NgForOf
  ],
  template: `
    <h2 mat-dialog-title>Manage Product Images</h2>
    <form [formGroup]="form">
      <mat-dialog-content class="mat-typography">
        <div class="col-12" style="margin-bottom: 15px">
          <label for="file">Product Image</label>
          <input (change)="onFileSelected($event)" formControlName="image" type="file" class="form-control" id="file">
        </div>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-raised-button mat-dialog-close (click)="close()">Cancel</button>
        <button mat-raised-button (click)="updateFile()" [hidden]="updated || !selected || !uploaded"
                color="primary">
          Update Image
        </button>
        <button mat-raised-button color="warn" (click)="deleteFile()" [hidden]="selected">
          Delete Image
        </button>
        <button mat-raised-button (click)="uploadFile()" [disabled]="loading || form.invalid" [hidden]="uploaded"
                color="primary">
          Upload Image
        </button>
      </mat-dialog-actions>
    </form>
    <hr>

    <div class="image-outer" style="display: flex; align-items: center; overflow: auto; margin: 5px">
      <div class="image" style="width: 100px; min-width: 100px; height: 100px; min-height: 100px; margin: 0 2px"
           *ngFor="let image of dataList; let i = index">
        <img style="width: 100px; height: 100px; align-items: center" [src]="image?.resourceUrl"
             alt="{{image?.fileName}}"
             [class.selected]="selectedImageIndex === i"
             (click)="onImageClick(i)"
        >
      </div>
    </div>
  `,
  styleUrl: './manage-product-image.component.css'
})
export class ManageProductImagesComponent implements OnInit {

  readonly data = inject<any>(MAT_DIALOG_DATA)
  readonly dialogRef = inject(MatDialogRef<ManageProductImagesComponent>);
  readonly productService = inject(ProductService)

  form = new FormGroup({
    image: new FormControl(null, Validators.required)
  });

  loading: boolean = false;
  selectedImage: any;
  dataList: any[] = [];
  selectedImageIndex: number = 0;
  imageId: any;
  selected: boolean = true;
  updated: boolean = true;
  uploaded: boolean = false;

  ngOnInit(): void {
    this.loadImages(this.data?.propertyId);
    console.log(this.data)
  }

  loadImages(id: any) {
    this.productService.getProduct(id).subscribe(response => {
      this.dataList = response.object?.productImages;
    })
  }


  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.selectedImage = fileInput.files?.[0];
    this.updated = false;
    this.selected = true;
    if (this.selectedImage) {
      if (this.isFileSizeValid(this.selectedImage)) {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'pdf'];
        const fileExtension = this.selectedImage.name.split('.').pop()?.toLowerCase();

        if (fileExtension && allowedExtensions.includes(fileExtension)) {

        } else {
          this.selectedImage = null;
          fileInput.value = '';
          return;
        }

      } else {
        this.selectedImage = null;
        fileInput.value = '';
        return;
      }
    }
  }

  handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  isFileSizeValid(file: File): boolean {
    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
    return file.size <= maxSizeInBytes;
  }

  uploadFile() {
    this.loading = true;
    const formData = new FormData();
    formData.append("productImage", this.selectedImage)
    this.productService.productImageUpload(formData, this.data.propertyId).subscribe({
      next: (response) => {
        this.dialogRef.close(true);
      },
      error: err => {
      }
    })
  }

  onImageClick(i: number) {
    this.imageId = this.dataList[i].propertyId
    this.selected = !this.updated;
    this.uploaded = true;
  }

  updateFile() {
    const formData = new FormData();
    formData.append("image", this.selectedImage)
    this.productService.productImageUpdate(formData, this.imageId).subscribe({
      next: (response) => {
        this.dialogRef.close(true);
      },
      error: err => {
      }
    })
  }

  deleteFile() {
    this.productService.productImageDelete(this.imageId).subscribe({
      next: (response) => {
        this.dialogRef.close(true);
      },
      error: err => {
      }
    })
  }

  close() {
    this.dialogRef.close(false);
  }
}
