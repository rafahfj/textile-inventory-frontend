import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient) {}

  addProduct(body: object) {
    return this.http
      .post('http://localhost:8000/products', body, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .pipe(
        tap(() => console.log('succes add product')),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
