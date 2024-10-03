import { Component, OnInit } from '@angular/core';
import { Support } from '../../model/support.model';
import { SupportService } from '../backend/support.service';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-support',
  standalone: true,
  imports:[CommonModule, NgIf, NgClass,FormsModule, ReactiveFormsModule],
  templateUrl: './support-admin.component.html',
  styleUrls: ['./support-admin.component.css'],
})
export class SupportAdminComponent implements OnInit {
  supports: Support[] = [];

  constructor(private supportService: SupportService) {}

  ngOnInit(): void {
    this.loadSupportRequests();
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
    support.resolved = !support.resolved; // Toggle the resolved status without backend interaction
  }
}
