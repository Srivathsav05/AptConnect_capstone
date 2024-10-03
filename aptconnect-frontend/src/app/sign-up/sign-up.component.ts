import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  username: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  smsNotificationsEnabled: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  signUp() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const user = {
      username: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
      smsNotificationsEnabled: this.smsNotificationsEnabled,
      role: 'USER' // Set a default role
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });

    this.http.post('http://localhost:8000/user/create', user, { headers: headers, withCredentials: true }).subscribe(
      (response: any) => {
        console.log('User created successfully', response);
        this.login(user);
      },
      (error) => {
        console.error('Error creating user', error);
        alert('Error creating user. Please try again.');
      }
    );
  }

  private login(user: any) {
    const loginPayload = { email: user.email, password: user.password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });

    this.http.post('http://localhost:8000/user/login', loginPayload, { headers: headers, withCredentials: true }).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userRole', response.role);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed', error);
        alert('Login failed after signup. Please try logging in manually.');
      }
    );
  }
}