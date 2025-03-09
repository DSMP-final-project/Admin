import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatButton} from "@angular/material/button";

export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

const EXAMPLE_DATA: UserData[] = [
  {id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin'},
  {id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User'},
  {id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User'},
  {id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager'},
  {id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User'},
  {id: 6, name: 'Eva Davis', email: 'eva@example.com', role: 'User'},
  {id: 7, name: 'Frank Miller', email: 'frank@example.com', role: 'Manager'},
  {id: 8, name: 'Grace Lee', email: 'grace@example.com', role: 'User'},
  {id: 9, name: 'Henry Taylor', email: 'henry@example.com', role: 'Admin'},
  {id: 10, name: 'Ivy Chen', email: 'ivy@example.com', role: 'User'}
];

@Component({
  selector: 'app-order',
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
    MatButton
  ],
  template: `
    <div style="display: flex; justify-content: space-between">

      <h1>{{ type }} Orders</h1>

      <div style="display: flex; gap: 5px">

        <button mat-flat-button style="background-color: #3f51b5; color: white" (click)="newOrder()">
          New Orders
        </button>

        <button mat-flat-button style="background-color: #231955; color: white" (click)="deliveredOrder()">
          Delivered
        </button>

        <button mat-flat-button style="background-color: #1F4690; color: white" (click)="returnedOrder()">
          Returned
        </button>

      </div>
    </div>

    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let element">{{ element.id }}</td>
      </ng-container>

      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let element">{{ element.name }}</td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let element">{{ element.email }}</td>
      </ng-container>

      <ng-container matColumnDef="role">
        <th mat-header-cell *matHeaderCellDef>Role</th>
        <td mat-cell *matCellDef="let element">{{ element.role }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <mat-paginator
      [length]="dataSource.data.length"
      [pageSize]="5"
      [pageSizeOptions]="[5, 10, 25]"
      aria-label="Select page">
    </mat-paginator>
  `,
  styleUrl: './order.component.css'
})
export class OrderComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  type: string = "New";
  displayedColumns: string[] = ['id', 'name', 'email', 'role'];
  dataSource = new MatTableDataSource<UserData>(EXAMPLE_DATA);

  ngOnInit(): void {
    this.newOrder();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  newOrder() {
    this.type = "New";
  }

  deliveredOrder() {
    this.type = "Delivered";
  }

  returnedOrder() {
    this.type = "Returned";
  }
}
