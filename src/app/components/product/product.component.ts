import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatListItemIcon, MatListItemTitle} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatButton,
    MatIcon,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    RouterLink,
    ReactiveFormsModule,
    NgForOf,
    MatIconButton,
    NgIf
  ],
  template: `
    <div style="display: flex; justify-content: space-between">
      <h1>Product</h1>
      <div style="display:flex; gap: 5px; align-items: center">
        <form class="search-form">
          <input [formControl]="search" type="search" name="search" id="search" placeholder="search product"
                 class="search">
          <a class="searchIcon" (click)="searchMethod()">
            <mat-icon>search</mat-icon>
          </a>
        </form>

        <button mat-flat-button style="background-color: #3f51b5; color: white">+ Add Product</button>
      </div>
    </div>
    <div class="col-12">
      <table class="table col-12">
        <thead>
        <tr>
          <th>#id</th>
          <th>Name</th>
          <th>Description</th>
          <th>QTY</th>
          <th>Unit Price</th>
          <th>Discount</th>
          <th>Availability</th>
          <th>Rating</th>
          <th>Tools</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let item of dataList">
          <td>
            <div class="context">
              {{ item?.propertyId }} &nbsp;
              <!--<mat-icon (click)="copyText(item?.propertyId)">content_copy</mat-icon>-->
            </div>
          </td>
          <td>
            <div class="context">
              {{ item?.productName }}
            </div>
          </td>
          <td>
            <div class="context" style="max-width: 300px">
              {{ item?.description }}
            </div>
          </td>
          <td>
            <div class="context">
              {{ item?.qty }}
            </div>
          </td>
          <td>
            <div class="context">
              {{ item?.unitPrice }}
            </div>
          </td>
          <td>
            <div class="context">
              {{ item?.discount }}%
            </div>
          </td>
          <td>
            <div class="context">
              <ng-container *ngIf="item.available; else notAvailable">
                <div style="color: #1F4690; display: flex;align-items: center">
                  <mat-icon>fiber_manual_record</mat-icon>
                  <span>available</span>
                </div>
              </ng-container>
              <ng-template #notAvailable>
                <div style="color: red; display: flex;align-items: center">
                  <mat-icon>fiber_manual_record</mat-icon>
                  <span>notAvailable</span>
                </div>
              </ng-template>
            </div>
          </td>
          <td>
            <div class="context">
              {{ item?.starMean }}
            </div>
          </td>
          <td>
            <div class="context" style="display: flex">
              <button color="warn" (click)="deleteConfirm(item)" mat-icon-button
                      aria-label="Example icon button with a open in new tab icon">
                <mat-icon>delete_sweep</mat-icon>
              </button>
              <button (click)="openUpdateProductForm(item)" color="primary" mat-icon-button
                      aria-label="Example icon button with a open in new tab icon">
                <mat-icon>edit</mat-icon>
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <mat-paginator
        [length]="count"
        [pageIndex]="page"
        [pageSize]="size"
        [pageSizeOptions]="[5, 10, 25]"
        (page)="getServerData($event)"
      >
      </mat-paginator>
    </div>

  `,
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  dataList: any[] = [];
  searchText: any = '';
  size: number = 10;
  page: number = 0;
  count = 0;
  readonly productService = inject(ProductService);
  search: any = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadAllProducts();
  }

  searchMethod() {
    this.searchText = this.search.value;
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.productService.getAllProducts(this.page, this.size, this.searchText).subscribe(
      {
        next: (response) => {
          console.log(response.object?.dataList)
          this.dataList = response.object?.dataList;
          this.count = response.object?.count;
        },
        error: (error) => {

        }
      }
    )
  }

  getServerData(data: PageEvent) {
    this.size = data?.pageSize;
    this.page = data?.pageIndex;
    this.loadAllProducts();
  }

  deleteConfirm(item: any) {
  }

  openUpdateProductForm(item: any) {
  }
}
