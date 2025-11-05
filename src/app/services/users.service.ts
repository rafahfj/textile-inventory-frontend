import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(`${this.baseUrl}/req-all`, {
      withCredentials: true,
    });
  }

  registUsers(data: any) {
    return this.http.post<any[]>(`${this.baseUrl}/regist`, data, {
      withCredentials: true,
    });
  }
}
