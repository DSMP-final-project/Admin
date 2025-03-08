import {Component} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>SecretSanta Admin Panel</span>
      <span class="toolbar-spacer"></span>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" class="sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/customer" routerLinkActive="active" ariaCurrentWhenActive="page">
            <mat-icon matListItemIcon>person</mat-icon>
            <span matListItemTitle>Customer</span>
          </a>
          <a mat-list-item routerLink="/order" routerLinkActive="active" ariaCurrentWhenActive="page">
            <mat-icon matListItemIcon>shopping_cart</mat-icon>
            <span matListItemTitle>Order</span>
          </a>
          <a mat-list-item routerLink="/product" routerLinkActive="active" ariaCurrentWhenActive="page">
            <mat-icon matListItemIcon>inventory_2</mat-icon>
            <span matListItemTitle>Product</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="sidenav-content">
        <h1>Welcome to {{ title }}!</h1>
        <p>This is the main content area. Select an item from the side navigation to get started.</p>
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  title: string = 'sid bar';
}
