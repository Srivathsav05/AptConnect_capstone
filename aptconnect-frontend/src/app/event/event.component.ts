import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Event } from '../../model/event.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../app/services/auth.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  events: Event[] = [];
  eventForm!: FormGroup;
  loading: boolean = false;
  isEditing: boolean = false;
  editingEventId: number | null = null;
  isAdmin: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    if (this.isAdmin) {
      this.initializeForm();
    }
    this.loadEvents();
  }

  initializeForm(): void {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      eventDate: ['', Validators.required],
    });
  }

  loadEvents(): void {
    this.loading = true;
    const url = this.isAdmin ? 'http://localhost:8000/events/admin/all' : 'http://localhost:8000/events/all'; 
    const token = localStorage.getItem('authToken');

    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: Event[]) => {
        this.events = data;
        this.loading = false;
      })
      .catch((error) => {
        console.error('Error loading events:', error);
        this.loading = false;
        this.handleError('Failed to load events');
      });
  }

  submitEvent(): void {
    if (!this.isAdmin) return;
    if (this.eventForm.invalid) {
      return;
    }

    const newEvent: Event = this.eventForm.value;

    if (this.isEditing && this.editingEventId) {
      this.updateEvent(this.editingEventId, newEvent);
    } else {
      this.addEvent(newEvent);
    }
  }

  addEvent(event: Event): void {
    if (!this.isAdmin) return;
    fetch('http://localhost:8000/events/admin/create', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(event),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((newEvent: Event) => {
      this.events.push(newEvent);
      this.eventForm.reset();
      this.handleError('Event created successfully');
    })
    .catch(error => this.handleError(`Failed to create event: ${error.message}`));
  }

  deleteEvent(eventId: number): void {
    if (!this.isAdmin) return;
    if (confirm('Do you want to delete this event?')) {
      fetch(`http://localhost:8000/events/admin/${eventId}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
        .then(() => {
          this.events = this.events.filter(event => event.id !== eventId);
          this.handleError('Event deleted successfully');
        })
        .catch(() => this.handleError('Failed to delete event'));
    }
  }

  updateEvent(eventId: number, updatedEvent: Event): void {
    if (!this.isAdmin) return;
    fetch(`http://localhost:8000/events/admin/${eventId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(updatedEvent),
    })
      .then(() => {
        const index = this.events.findIndex(e => e.id === eventId);
        if (index !== -1) {
          this.events[index] = updatedEvent;
          this.isEditing = false;
          this.editingEventId = null;
          this.eventForm.reset();
          this.handleError('Event updated successfully');
        }
      })
      .catch(() => this.handleError('Failed to update event'));
  }

  editEvent(event: Event): void {
    if (!this.isAdmin) return;
    this.isEditing = true;
    this.editingEventId = event.id;
    this.eventForm.patchValue({
      title: event.title,
      description: event.description,
      location: event.location,
      eventDate: event.eventDate,
    });
  }

  cancelEdit(): void {
    if (!this.isAdmin) return;
    this.isEditing = false;
    this.editingEventId = null;
    this.eventForm.reset();
  }

  handleError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
