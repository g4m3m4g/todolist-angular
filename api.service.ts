import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private BASE_URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post(`${this.BASE_URL}/auth/signup`, data);
  }

  login(data: any) {
    return this.http.post<{ token: string }>(`${this.BASE_URL}/auth/login`, data);
  }

  getTasks() {
    return this.http.get(`${this.BASE_URL}/tasks`, this.getAuthHeader());
  }

  addTask(task: any) {
    return this.http.post(`${this.BASE_URL}/tasks`, task, this.getAuthHeader());
  }

  editTask(id: string, task: any) {
    return this.http.put(`${this.BASE_URL}/tasks/${id}`, task, this.getAuthHeader());
  }

  private getAuthHeader() {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  }
}
