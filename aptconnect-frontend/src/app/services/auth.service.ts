// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(email: string, role: string) {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userRole', role);
  }

  logout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userEmail');
  }

  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'ADMIN';
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }
}