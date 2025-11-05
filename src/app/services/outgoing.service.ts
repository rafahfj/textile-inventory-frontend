import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OutgoingService {
  private apiUrl = 'http://localhost:8080/outgoing';
  user: any | null = null;

  private getUserFromCookie(): any | null {
    if (typeof document === 'undefined' || !document.cookie) return null;
    const cookies = document.cookie.split(';').map((c) => c.trim());
    const userInfoCookie = cookies.find((c) => c.startsWith('user_info='));
    if (!userInfoCookie) return null;
    const parts = userInfoCookie.split('=');
    if (parts.length < 2) return null;
    try {
      const value = decodeURIComponent(parts.slice(1).join('='));
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  constructor(private http: HttpClient) {
    this.user = this.getUserFromCookie();
  }

  getTransactions() {
    return this.http.get<any[]>(`${this.apiUrl}/`, { withCredentials: true });
  }

  addTransaction(data: any) {
    const userId = this.user?.user_id ?? null;
    return this.http
      .post(
        `${this.apiUrl}/`,
        { ...data, user_id: this.user.user_id },
        { withCredentials: true }
      )
      .pipe(
        tap((res) => res),
        catchError((err) => throwError(() => err))
      );
  }
}
