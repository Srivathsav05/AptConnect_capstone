import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parking } from '../../model/slot.model'
import { StorageService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private apiUrl = 'http://localhost:8000/api/parking';

  constructor(private http: HttpClient, private storageService: StorageService) {}

  // Fetch available slots for a given date
  getSlots(date: string): Observable<Parking[]> {
    return this.http.get<Parking[]>(`${this.apiUrl}?date=${date}`, {
      headers: this.storageService.getAuthHeader()
    });
  }

  // Book a slot
  bookSlot(id: number, guestName: string, date: string): Observable<Parking> {
    const requestBody = {
      slotNumber: id,
      guestName: guestName,
      date: date,
    };
    return this.http.post<Parking>(this.apiUrl, requestBody, {
      headers: this.storageService.getAuthHeader()
    });
  }
}
