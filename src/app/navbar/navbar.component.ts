import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public router: Router) {}

  goToProfile(): void {
    this.router.navigate(['user']);
  }

  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
