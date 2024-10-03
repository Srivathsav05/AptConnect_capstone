import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Support} from '../../model/supportAdmin.model';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  private baseUrl = 'http://localhost:8080'; // Assuming the backend runs on this port

  constructor(private http: HttpClient) {}

  getAllSupportRequests(): Observable<Support[]> {
    return this.http.get<Support[]>(`${this.baseUrl}/getAll`);
  }
}
