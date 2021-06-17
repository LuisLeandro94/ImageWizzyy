import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class ImageDetailsComponent implements OnInit, OnDestroy {
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
    public dataStore: DatastoreService
  ) {
    this.imageService = imageService;
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((p) => {
      this.isFavorite = this.imageService.checkIfFavorite(p.id);
      this.dataStore.getFav(p.id);
    });
  }

  ngOnDestroy(): void {
    this.dataStore.getFav(null);
  }
}
