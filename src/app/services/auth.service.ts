import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, throwError } from 'rxjs';
import baseURL from './env';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const body = JSON.stringify({
      email,
      password,
    });

    return this.http
      .post(baseURL + '/auth/login', body, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        tap((res) => res),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  logout() {
    // Kamu bisa buat endpoint logout di FastAPI untuk menghapus cookie
    return this.http
      .post(baseURL + '/auth/logout', {}, { withCredentials: true })
      .pipe(
        tap((res) => res),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  checkLoginStatus() {
    return this.http.get(baseURL + '/auth/protected', {
      withCredentials: true,
    });
  }
}
