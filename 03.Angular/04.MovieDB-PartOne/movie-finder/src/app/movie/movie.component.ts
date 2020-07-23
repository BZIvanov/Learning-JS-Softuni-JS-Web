import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Movie from '../models/Movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  //Input decorator is to tell the data is coming from the parent component
  @Input('movie')
  movie: Movie;

  @Output()
  clickButtonEmitter = new EventEmitter();

  imagePath: string;

  constructor() {}

  ngOnInit() {
    this.imagePath = 'https://image.tmdb.org/t/p/w500' + this.movie.poster_path;
  }

  clickButton() {
    this.clickButtonEmitter.emit(this.movie.id.toString());
  }
}
