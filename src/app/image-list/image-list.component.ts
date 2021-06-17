import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../services/image.service';
import { Image } from '../shared/image.model';
import {
  faEye,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { DatastoreService } from '../services/datastore.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
})
export class ImageListComponent implements OnInit {
  images: Image[] = [];
  faEye = faEye;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  constructor(
    public dataStore: DatastoreService,
    public imageService: ImageService
  ) {}

  ngOnInit(): void {}

  paginationR() {
    this.dataStore.Page += 1;
    this.dataStore.getImages(this.dataStore.Page);
  }

  paginationL() {
    this.dataStore.Page -= 1;
    this.dataStore.getImages(this.dataStore.Page);
  }
}
