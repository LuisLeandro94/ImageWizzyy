import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Image } from '../shared/image.model';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root',
})
export class DatastoreService {
  images = new BehaviorSubject<any>([]);
  images$ = this.images.asObservable();

  constructor(private imageService: ImageService) {}

  get Images(): Image[] {
    return this.images.getValue();
  }

  set Images(value: Image[]) {
    this.images.next(value);
  }

  async getImages(page: number) {
    this.Images = await this.imageService.convertAnsw(page);
  }

  async getSearch(queryString: string) {
    this.Images = await this.imageService.searchAPI(queryString);
  }
}
