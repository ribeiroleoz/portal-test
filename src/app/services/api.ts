import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  get<T>(endpoint: string, filters?: any): Observable<T> {
    console.log('filter', filters);
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params: filters });
  }

  getOne<T>(endpoint: string, param: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${param}`);
  }

  post<T, R = unknown>(endpoint: string, data: T): Observable<R> {
    return this.http.post<R>(`${this.baseUrl}/${endpoint}`, data);
  }

  put<T, R = unknown>(endpoint: string, data: T): Observable<R> {
    return this.http.put<R>(`${this.baseUrl}/${endpoint}`, data);
  }

  delete<R = unknown>(endpoint: string, id: string): Observable<R> {
    return this.http.delete<R>(`${this.baseUrl}/${endpoint}/${id}`);
  }
}
