import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule,RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  currentUrl: string = '';

  constructor(private router: Router) {
    // Listen to router events and update the current URL
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentUrl = this.router.url;
      });
  }

  isActive(route: string): boolean {
    // Return true if the current route matches the provided route
    return this.currentUrl === route;
  }

  // logout() {
   
  //   localStorage.removeItem('userRole');
  //   console.log('Logout successful');
  
  //   this.router.navigate(['/login']);
  // }
  logout() {
    // Retrieve the role from localStorage before removing it
    const userRole = localStorage.getItem('userRole');
  
    // Log the role of the user who is logging out
    if (userRole) {
      console.log(`Logout successful: {role: '${userRole}', message: 'Logout successful'}`);
    } else {
      console.log('No user role found, but logout successful');
    }
  
    // Clear any stored user data, token, or session information
    localStorage.removeItem('userRole');
  
    // Navigate to the login page
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    const userName = localStorage.getItem('userName');
    if (userName) {
      console.log(`User ${userName} is logged in.`);
    }
  }
  
  
}
