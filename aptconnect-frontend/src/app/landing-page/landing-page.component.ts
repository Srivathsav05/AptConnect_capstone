import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule,NavbarComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  constructor(private router: Router){}
  navigateToFeature(feature: string) {
    // Navigate to the route based on the feature parameter
    this.router.navigate([`/${feature}`]);
 
  }
}
