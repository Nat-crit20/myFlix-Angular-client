import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://blooming-shore-67354.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
/**
 * Creates a serves to load data from the API
 * @component
 */
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http

  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint
  /**
   * Makes the call to sign up a user
   * @param userDetails the users credentials
   * @returns http Post request
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  //User login
  /**
   * Makes the call to login a user
   * @param userDetails the users credentials
   * @returns http Post request
   */
  userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  //Get all movies
  /**
   * Gets all the movies from the api
   * @returns http get request
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get one movie
  /**
   * Gets one movie from the API
   * @param title Movie Title
   * @returns http get request for one movie
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get director
  /**
   * Make an API request to get one director
   * @param name Director name
   * @returns http get request
   */
  getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'directors/' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get genre
  /**
   * Make an API request to get the info on a genre
   * @param name Genre name
   * @returns http get request
   */
  getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genre/' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get user
  /**
   * Get the user info from the local storage
   * @returns user data
   */
  getUser(): Observable<any> {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    return storedUser;
  }

  //Get favorite movies for a user
  /**
   * Make an API request to get a list of Favorite movies from a user
   * @returns http get request
   */
  getFavoriteMovie(): Observable<any> {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + storedUser.id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  //Add a movie to favorite Movies
  /**
   * Make an API request to add a Movie to the users Favorite list
   * @param movieId
   * @returns http post request
   */
  addFavToUser(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    user.FavoriteMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));
    return this.http
      .post(
        apiUrl + 'users/' + user._id + '/movies/' + movieId,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
          responseType: 'text',
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Edit user
  /**
   * Make an API request to update a users info
   * @param userDetails
   * @returns http post request
   */
  updateUser(userDetails: any): Observable<any> {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/' + storedUser._id, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Delete user
  /**
   * Delete a user
   * @returns http delete request
   */
  deleteUser(): Observable<any> {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + storedUser.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Delete a movie from the favorite movies
  /**
   * Make a request to delete a movie from a users Favorite list
   * @param movie The movie ID
   * @returns http delete request
   */
  removeFavFromUser(movie: string): Observable<any> {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const index = storedUser.FavoriteMovies.indexOf(movie);
    console.log(index);
    if (index > -1) {
      // only splice array when item is found
      storedUser.FavoriteMovies.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(storedUser));
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + storedUser._id + '/movies/' + movie, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Ask if a movie is in a users favorite list
   * @param movieId
   * @returns boolean
   */
  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieId) >= 0;
  }

  //Non-types response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

export class FetchApiDataService {
  constructor() {}
}
