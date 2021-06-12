import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from '../services/image.service';
import { Image } from '../shared/image.model';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
})
export class ImageListComponent implements OnInit {
  images: Image[] = [];
  faEye = faEye;

  router: string;
  page = 1;
  count = 1000;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    debugger;
    this.images = this.imageService.images;
    this.imageService.getData().subscribe();
  }
}
