import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from '../../model/vendor.model'; // Make sure to create this model

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private baseUrl = 'http://localhost:8080/vendors'; // Adjust the base URL if necessary

  constructor(private http: HttpClient) {}

  // Get all vendors
  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.baseUrl}/getAllVendors`);
  }

  // Create a new vendor
  createVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.baseUrl}/createVendor`, vendor);
  }

  // Update an existing vendor
  updateVendor(id: number, vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.baseUrl}/updateVendor/${id}`, vendor);
  }

  // Delete a vendor
  deleteVendor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteVendor/${id}`);
  }
}
