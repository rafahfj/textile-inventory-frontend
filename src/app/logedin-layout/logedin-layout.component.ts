import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'logedin-layout',
  imports: [RouterOutlet],
  templateUrl: './logedin-layout.component.html',
})
export class LogedinLayout implements OnInit {
  constructor(private auth: AuthService, public router: Router) {}

  user = JSON.parse(localStorage.getItem('info') as string);

  ngOnInit() {
    this.user.user_id;
    this.auth.checkLoginStatus().subscribe({
      next: (info: any) => {
        localStorage.setItem('info', JSON.stringify(info));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login status check failed:', err);
        localStorage.removeItem('info');
      },
    });
  }

  onLogout() {
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Logout failed:', err),
    });
  }
}
