import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Vendor } from '../../model/vendor.model';

@Component({
  selector: 'app-vendor',
  standalone: true,
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class VendorComponent implements OnInit {
  vendors: any[] = [];
  vendorForm!: FormGroup;
  loading: boolean = false;
  isEditing: boolean = false;
  editingVendorId: number | null = null;
  isAdmin: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadVendors();
    this.checkUserRole();
  }

  initializeForm(): void {
    this.vendorForm = this.fb.group({
      vendorId: [null],
      vendorName: ['', Validators.required],
      vendorEmail: ['', [Validators.required, Validators.email]],
      vendorPhone: ['', Validators.required],
      vendorService: ['', Validators.required]
    });
  }

  loadVendors(): void {
    this.loading = true;
    this.http.get('http://localhost:8080/vendors/getAllVendors')
      .subscribe({
        next: (data: any) => {
          this.vendors = data;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.error('Failed to load vendors:', err);
          alert('Failed to load vendors');
        }
      });
  }

  checkUserRole(): void {
    const role = localStorage.getItem('userRole');
    console.log('User Role:', role);
    this.isAdmin = role === 'ADMIN';
  }

  submitVendor(): void {
    if (this.vendorForm.invalid) {
      console.error('Form is invalid:', this.vendorForm);
      alert('Please fill in all required fields correctly.');
      return;
    }

    if (this.isEditing) {
      const vendorId = this.editingVendorId;
      const updatedVendor = this.vendorForm.value;
      this.updateVendor(updatedVendor, vendorId!);
    } else {
      const newVendor = this.vendorForm.value;
      this.addVendor(newVendor);
    }
  }

  addVendor(vendor: any): void {
    this.http.post('http://localhost:8080/vendors/createVendor', vendor)
      .subscribe({
        next: (createdVendor: any) => {
          console.log('Created Vendor:', createdVendor);
          this.vendors.push(createdVendor);
          this.vendorForm.reset();
          this.isEditing = false;
        },
        error: (err) => {
          console.error('Error creating vendor:', err);
          alert('Failed to create vendor. Check the console for details.');
        }
      });
  }

  deleteVendor(vendorId: number): void {
    if (confirm('Do you want to delete this vendor?')) {
      this.http.delete(`http://localhost:8080/vendors/deleteVendor/${vendorId}`)
        .subscribe({
          next: () => {
            this.vendors = this.vendors.filter(v => v.vendorId !== vendorId);
          },
          error: (err) => {
            console.error('Failed to delete vendor:', err);
            alert('Failed to delete vendor. Check the console for details.');
          }
        });
    }
  }

  updateVendor(vendor: any, vendorId: number): void {
    this.http.put(`http://localhost:8080/vendors/updateVendor/${vendorId}`, vendor)
      .subscribe({
        next: () => {
          const index = this.vendors.findIndex(v => v.vendorId === vendorId);
          if (index !== -1) {
            this.vendors[index] = vendor;
            this.isEditing = false;
            this.editingVendorId = null;
            this.vendorForm.reset();
          }
        },
        error: (err) => {
          console.error('Error updating vendor:', err);
          alert('Failed to update vendor. Check the console for details.');
        }
      });
  }

  editVendor(vendor: any): void {
    this.isEditing = true;
    this.editingVendorId = vendor.vendorId;
    this.vendorForm.patchValue({
      vendorId: vendor.vendorId,
      vendorName: vendor.vendorName,
      vendorEmail: vendor.vendorEmail,
      vendorPhone: vendor.vendorPhone,
      vendorService: vendor.vendorService
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingVendorId = null;
    this.vendorForm.reset();
  }
}
