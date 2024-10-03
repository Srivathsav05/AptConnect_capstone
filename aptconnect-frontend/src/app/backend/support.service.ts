import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Support } from '../../model/support.model'; // Make sure to create this model

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  updateSupportRequest(support: Support) {
    throw new Error('Method not implemented.');
  }
  
  private baseUrl = 'http://localhost:8500/api/help'; // Base URL for your backend

  constructor(private http: HttpClient) {}

  // Get all help requests
  getAllSupportRequests(): Observable<Support[]> {
    return this.http.get<Support[]>(`${this.baseUrl}/getAll`);
  }

  // Create a new support request
  createSupportRequest(support: Support): Observable<Support> {
    return this.http.post<Support>(`${this.baseUrl}/create`, support);
  }
}
