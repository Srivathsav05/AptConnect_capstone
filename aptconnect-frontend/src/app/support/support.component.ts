import { CommonModule } from '@angular/common'; // Import CommonModule
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Support } from '../../model/support.model';
import { SupportService } from '../backend/support.service';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add CommonModule to the imports
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent implements OnInit {
  supportForm!: FormGroup;
  loading: boolean = false;
  supports: Support[] = [];
  isAdmin: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private supportService: SupportService) {}

  ngOnInit(): void {
    const userRole = localStorage.getItem('userRole');
    this.isAdmin = userRole === 'ADMIN';

    if (this.isAdmin) {
      this.loadSupportRequests();
    } else {
      this.initializeForm();
    }
  }

  // Initialize support form with validation rules
  initializeForm(): void {
    this.supportForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Validating for 10-digit phone number
      email: ['', [Validators.required, Validators.email]],
      helpSubject: ['', [Validators.required, Validators.minLength(5)]],
      helpDescription: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  submitSupportRequest(): void {
    if (this.supportForm.invalid) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const supportRequest = this.supportForm.value;
    this.loading = true;

    this.http.post('http://localhost:8500/api/help/create', supportRequest).subscribe({
      next: () => {
        alert('Help request submitted successfully!');
        this.supportForm.reset();
        this.loading = false;
      },
      error: () => {
        alert('Failed to submit the help request.');
        this.loading = false;
      },
    });
  }

  loadSupportRequests(): void {
    this.supportService.getAllSupportRequests().subscribe(
      (data) => {
        this.supports = data;
      },
      (error) => {
        console.error('Error fetching support requests', error);
      }
    );
  }

  toggleResolved(support: Support): void {
    support.resolved = !support.resolved;
  }
}
