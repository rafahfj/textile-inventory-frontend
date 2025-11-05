import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SuppliersService {
  private apiUrl = 'http://localhost:8080/suppliers';

  constructor(private http: HttpClient) {}

  getSuppliers() {
    return this.http.get<any[]>(`${this.apiUrl}/`, { withCredentials: true });
  }

  addSupplier(supplier: { name: string; contact: string }) {
    return this.http
      .post(`${this.apiUrl}/`, supplier, { withCredentials: true })
      .pipe(
        tap((res) => res),
        catchError((error) => throwError(() => error))
      );
  }

  deleteSupplier(id: number) {
    return this.http
      .delete(`${this.apiUrl}/${id}`, { withCredentials: true })
      .pipe(catchError((error) => throwError(() => error)));
  }
}
