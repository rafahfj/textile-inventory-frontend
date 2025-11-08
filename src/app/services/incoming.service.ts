import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, tap } from 'rxjs';
import baseURL from './env';

@Injectable({ providedIn: 'root' })
export class IncomingService {
  private apiUrl = baseURL + '/incoming';

  user: any | null = null;

  constructor(private http: HttpClient) {
    this.user = this.getUserFromCookie();
  }

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

  getTransactions() {
    return this.http.get<any[]>(`${this.apiUrl}/`, { withCredentials: true });
  }

  addTransaction(data: any) {
    const userId = this.user?.user_id ?? null;
    return this.http
      .post(
        `${this.apiUrl}/`,
        { ...data, user_id: userId },
        { withCredentials: true }
      )
      .pipe(
        tap((res) => res),
        catchError((err) => throwError(() => err))
      );
  }
}
