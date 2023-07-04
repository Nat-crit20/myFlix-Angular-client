import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { WelcomPageComponent } from './welcom-page/welcom-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

// const appRoutes: Routes = [
//   { path: 'welcome', component: WelcomePageComponent },
//   { path: 'movies', component: MovieCardComponent },
//   { path: 'user', component: UserProfileComponent },
//   { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
// ];

@NgModule({
  declarations: [AppComponent, UserRegistrationFormComponent, WelcomPageComponent, UserProfileComponent, UserLoginFormComponent, MovieInfoComponent, MovieCardComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
