import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../services/image.service';
import { Image } from '../shared/image.model';
import {
  faPlus,
  faMinus,
  faHeart,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DatastoreService } from '../services/datastore.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css'],
})
export class ImageDetailsComponent implements OnInit {
  imageService: ImageService;
  faPlus = faPlus;
  faMinus = faMinus;
  faHeart = faHeart;
  faDownload = faDownload;
  isFavorite = false;

  image: Image;
  images: Image[];
  imageID: string;

  constructor(
    imageService: ImageService,
    private activeRoute: ActivatedRoute,
    private dataStore: DatastoreService
  ) {
    this.imageService = imageService;
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((p) => {
      debugger;
      this.isFavorite = this.imageService.checkIfFavorite(p.id);
      const images = this.imageService.images;
      this.image = images.filter((x) => x.id == String(p.id))[0];
      if (this.image == undefined) {
        this.image = this.imageService.favorites.filter(
          (x) => x.id == String(p.id)
        )[0];
      }
    });
  }
}
