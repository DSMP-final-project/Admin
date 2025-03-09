import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <div class="login-container">
      <div class="login-box">
        <div class="login-header">
          <h1>Admin Login</h1>
          <p>Enter your credentials to access the admin panel</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              class="form-control"
              placeholder="Enter your email"
            />
            @if (loginForm.get('email')?.touched && loginForm.get('email')?.errors?.['required']) {
              <span class="error-message">Email is required</span>
            }
            @if (loginForm.get('email')?.touched && loginForm.get('email')?.errors?.['email']) {
              <span class="error-message">Please enter a valid email</span>
            }
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              class="form-control"
              placeholder="Enter your password"
            />
            @if (loginForm.get('password')?.touched && loginForm.get('password')?.errors?.['required']) {
              <span class="error-message">Password is required</span>
            }
            @if (loginForm.get('password')?.touched && loginForm.get('password')?.errors?.['minlength']) {
              <span class="error-message">Password must be at least 6 characters</span>
            }
          </div>

          <div class="form-footer">
            <label class="remember-me">
              <input type="checkbox">
              Remember me
            </label>
            <a href="#" class="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">
            Sign In
          </button>
        </form>
      </div>
    </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private roter: Router) {
  }

  readonly userService = inject(UserService);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      const obj = {
        password: this.loginForm.value.password,
        email: this.loginForm.value.email
      };

      this.userService.login(obj).subscribe({
        next: (response) => {

          const token = response?.headers.get('Authorization');

          if (token) {
            localStorage.setItem('token', response.token);
          }

          const decodedToken = jwtDecode(token);

          // @ts-ignore
          const roles = decodedToken.authorities
            .filter((auth: any) => auth.authority.startsWith('ROLE_'))
            .map((auth: any) => auth.authority);

          if (roles == 'ROLE_ADMIN') {
            this.roter.navigate(['/dashboard']);
          }

        },
        error: (error) => {
          console.error('Login error:', error);
        }
      });
    }
  }
}
