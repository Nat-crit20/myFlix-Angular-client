import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  //void means that we can expect no return value
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * gets the movies from the api
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
  /**
   *  This is used to create info about the genre, director, or the synopsis
   */
  openInfo(name: string, description: string): void {
    //Opens the Movie Info Modal
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        content: description,
      },
    });
  }

  /**
   * Checks if a movie is a favorite for a user
   * @param id Movie ID
   * @returns boolean
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  /**
   * Makes a call to the API to add a movie to the users favorites
   * @param id movie ID
   */
  addToFavorite(id: string): void {
    this.fetchApiData.addFavToUser(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   * Makes a call to the API to remove a movie to the users favorites
   * @param id movie ID
   */
  removeToFavorite(id: string): void {
    this.fetchApiData.removeFavFromUser(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000,
      });
    });
  }
}
