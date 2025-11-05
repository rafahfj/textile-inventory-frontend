import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, throwError } from 'rxjs';

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
      .post('http://localhost:8080/auth/login', body, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        tap((res) => (res)),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  logout() {
    // Kamu bisa buat endpoint logout di FastAPI untuk menghapus cookie
    return this.http
      .post('http://localhost:8080/auth/logout', {}, { withCredentials: true })
      .pipe(
        tap((res) => (res)),
        catchError((error) => {
        return throwError(() => error);
        }));
  }

  checkLoginStatus() {
    return this.http.get('http://localhost:8080/auth/protected', {
      withCredentials: true,
    });
  }

}
