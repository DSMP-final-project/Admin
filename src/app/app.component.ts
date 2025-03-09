import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SideBarComponent} from "./components/side-bar/side-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent],
  template:`
    <router-outlet/>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin';
}
