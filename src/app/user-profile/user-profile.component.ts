import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApi: UserRegistrationService,
    public route: Router,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  getUser(): void {
    this.user = this.fetchApi.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = formatDate(
      this.user.Birthday,
      'yyyy-MM-dd',
      'en-US',
      'UTC+0'
    );
    this.fetchApi.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((movie: { _id: any }) => {
        return this.user.FavoriteMovies.indexOf(movie._id) >= 0;
      });
    });
  }
}
