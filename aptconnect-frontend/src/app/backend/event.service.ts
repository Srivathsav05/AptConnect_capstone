import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Event } from '../../model/Event.model';
// import { Event } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'http://localhost:8000/admin/events'; // Adjust if needed

  constructor(private http: HttpClient) {}

//  // Get all events
//   getAllEvents(): Observable<Event[]> {
//     return this.http.get<Event[]>('http://localhost:8000/admin/events');
//   }

//   // Create a new event
//   createEvent(event: Event): Observable<Event> {
//     return this.http.post<Event>(`http://localhost:8000/admin/events/create`, event);
//   }

//   // Update an existing event
//   updateEvent(id: number, event: Event): Observable<Event> {
//     return this.http.put<Event>(`http://localhost:8000/admin/events/${id}`, event);
//   }

//   // Delete an event
//   deleteEvent(id: number): Observable<void> {
//     return this.http.delete<void>(`http://localhost:8000/admin/events/${id}`);
//   }
}
