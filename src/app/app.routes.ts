import {Routes} from '@angular/router';
import {SideBarComponent} from "./components/side-bar/side-bar.component";
import {CustomerComponent} from "./components/customer/customer.component";
import {OrderComponent} from "./components/order/order.component";
import {ProductComponent} from "./components/product/product.component";
import {LoginComponent} from "./components/login/login.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },

  {
    path: 'signin',
    component: LoginComponent,
  },

  {
    path: 'dashboard',
    component: SideBarComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/customer',
        pathMatch: 'full'
      },

      {
        path: 'customer',
        component: CustomerComponent,
      },

      {
        path: 'order',
        component: OrderComponent,
      },

      {
        path: 'product',
        component: ProductComponent,
      }
    ]
  },

];
