import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseURL from './env';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private baseUrl = baseURL + '/auth';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(`${this.baseUrl}/req-all`, {
      withCredentials: true,
    });
  }

  registUsers(data: any) {
    return this.http.post<any[]>(`${this.baseUrl}/register`, data, {
      withCredentials: true,
    });
  }
}
