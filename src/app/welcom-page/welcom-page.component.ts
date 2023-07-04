import { Component } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-welcom-page',
  templateUrl: './welcom-page.component.html',
  styleUrls: ['./welcom-page.component.css'],
})
export class WelcomPageComponent {
  constructor(public dialog: MatDialog) {}
  // This is the function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }

  // This is the function that will open the dialog when the login button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      //Assigning the dialog a width
      width: '280px',
    });
  }
}
