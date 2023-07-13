import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css'],
})
/**
 * Grabs the data from the movie card to create a modal for the movies
 * @component
 */
export class MovieInfoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
    }
  ) {}

  ngOnInit(): void {}
}
