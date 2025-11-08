import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseURL from './env';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private baseUrl = baseURL + '/dashboard'; // endpoint API backend kamu

  constructor(private http: HttpClient) {}

  getSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/summary`, {
      withCredentials: true, // penting biar cookie token dikirim
    });
  }
}
