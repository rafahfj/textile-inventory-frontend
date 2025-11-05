import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginPage {
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  error = '';
  visibilePW = false;

  constructor(public auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (info: any) => {
          localStorage.setItem('info', JSON.stringify(info));
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log(err);
          this.error = err.error.detail;
        },
      });
  }

  visibilityPW() {
    const x = document.getElementById('inputPW') as HTMLInputElement;
    if (x.type === 'password') {
      this.visibilePW = true;
      x.type = 'text';
    } else {
      this.visibilePW = false;
      x.type = 'password';
    }
  }

  ngOnInit() {
    this.auth.checkLoginStatus().subscribe({
      next: (info: any) => {
        localStorage.setItem('info', JSON.stringify(info));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login status check failed:', err);
      },
    });
  }
}
