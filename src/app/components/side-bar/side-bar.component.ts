import {Component, inject} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {UserService} from "../../service/user.service";

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
    <mat-toolbar style="display: flex; justify-content: space-between; background-color: #1F4690">
      <div style="display: flex; align-items: center">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>SecretSanta Admin Panel</span>
        <span class="toolbar-spacer"></span>
      </div>
      <div>
        <button mat-icon-button (click)="handleSignOut()">
          <mat-icon>logout</mat-icon>
        </button>
      </div>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">

      <mat-sidenav #sidenav mode="side" class="sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard/customer" ariaCurrentWhenActive="page">
            <mat-icon matListItemIcon>person</mat-icon>
            <span matListItemTitle>Customer</span>
          </a>
          <a mat-list-item routerLink="/dashboard/order" ariaCurrentWhenActive="page">
            <mat-icon matListItemIcon>shopping_cart</mat-icon>
            <span matListItemTitle>Order</span>
          </a>
          <a mat-list-item routerLink="/dashboard/product" ariaCurrentWhenActive="page">
            <mat-icon matListItemIcon>inventory_2</mat-icon>
            <span matListItemTitle>Product</span>
          </a>

          <div style="margin: 5px">
            <p> &copy; {{ year }} SecretSanta. All rights reserved.</p>
          </div>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="sidenav-content">
        <router-outlet/>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  title: string = 'sid bar';

  year= new Date().getFullYear()

  constructor(private readonly router: Router) {
  }

  readonly userService = inject(UserService);

  handleSignOut() {
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (e) => {
        console.error(e)
        this.router.navigate(['/']);
      }
    })
  }

  protected readonly Date = Date;
}
