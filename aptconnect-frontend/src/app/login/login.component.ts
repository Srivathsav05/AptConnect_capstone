import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const loginPayload = { email: this.email, password: this.password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });
  
    this.http.post('http://localhost:8000/user/login', loginPayload, { headers: headers, withCredentials: true })
      .subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
          localStorage.setItem('userEmail', this.email);
          localStorage.setItem('userRole', response.role);
          // this.router.navigate(['/home']);
          // Assuming the backend returns the user's name in the response
          const userName = response.name || this.email.split('@')[0]; // Use email prefix if name is not available
          localStorage.setItem('userName', userName);
          
          // Show the welcome pop-up
          alert(`Welcome, ${userName}!`);
          
          // Navigate to home
          this.router.navigate(['/event']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Invalid credentials or server error. Please try again.');
        }
      });
  }
}