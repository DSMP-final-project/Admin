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
import {CustomerService} from "../../service/customer.service";

@Component({
  selector: 'app-customer',
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
      <h1>Customer</h1>
      <div>
        <form class="search-form">
          <input [formControl]="search" type="search" name="search" id="search" placeholder="search username"
                 class="search">
          <a class="searchIcon" (click)="searchMethod()">
            <mat-icon>search</mat-icon>
          </a>
        </form>
      </div>
    </div>
    <div class="col-12">
      <table class="table col-12">
        <thead>
        <tr>
          <th>#customer id</th>
          <th>first name</th>
          <th>last name</th>
          <th>userName</th>
          <th>gender</th>
          <th>email</th>
          <th>phone</th>
          <th>address</th>
          <th>postalCode</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let item of dataList">
          <td>
            <div class="context">
              {{ item?.customerId }} &nbsp;
            </div>
          </td>
          <td>
            <div class="context">
              {{ item?.firstName }}
            </div>
          </td>
          <td>
            <div class="context" style="max-width: 300px">
              {{ item?.lastName }}
            </div>
          </td>
          <td>
            <div class="context">
              {{ item?.userName }}
            </div>
          </td>
          <td>
            <div class="context">
              {{ item?.gender }}
            </div>
          </td>
          <td>
            <div class="context">
              {{ item?.email }}
            </div>
          </td>
          <td>
            <div class="context">
              {{ item?.phone }}
            </div>
          </td>
          <td>
            <div class="context">
              {{ item?.address }}
            </div>
          </td>
          <td>
            <div class="context">
              {{ item?.postalCode }}
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
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  dataList: any[] = [];
  searchText: any = '';
  size: number = 10;
  page: number = 0;
  count = 0;
  readonly customerService = inject(CustomerService);
  search: any = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadAllCustomers();
  }

  searchMethod() {
    this.searchText = this.search.value;
    this.loadAllCustomers();
  }

  loadAllCustomers() {
    this.customerService.getAllCustomers(this.size, this.page, this.searchText).subscribe(
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
    this.loadAllCustomers();
  }
}
