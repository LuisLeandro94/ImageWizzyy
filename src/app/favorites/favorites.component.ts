import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Image } from '../shared/image.model';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  faEye = faEye;
  imageService: ImageService;

  constructor(imageService: ImageService) {
    this.imageService = imageService;
  }

  ngOnInit(): void {
    debugger;
    let favorites: Image[] = this.imageService.favorites;
  }
}
