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
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

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

  editUser() {
    this.fetchApi.updateUser(this.userData).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result));
        window.location.reload();
        this.snackBar.open('User successfully updated', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }

  deleteUser(): void {
    this.fetchApi.deleteUser().subscribe(
      (res) => {
        localStorage.clear();
        this.route.navigate(['welcome']);
        this.snackBar.open('User successfully deleted', 'OK', {
          duration: 2000,
        });
      },
      (res) => {
        this.snackBar.open(res, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
