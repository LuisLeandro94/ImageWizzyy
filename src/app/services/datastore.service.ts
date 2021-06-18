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

  image = new BehaviorSubject<any>(null);
  image$ = this.image.asObservable();

  page = new BehaviorSubject<any>(1);
  page$ = this.page.asObservable();

  constructor(private imageService: ImageService) {}

  get Images(): Image[] {
    return this.images.getValue();
  }

  set Images(value: Image[]) {
    this.images.next(value);
  }

  get Image(): Image {
    return this.image.getValue();
  }

  set Image(value: Image) {
    this.image.next(value);
  }

  get Page(): any {
    return this.page.getValue();
  }

  set Page(value: any) {
    this.page.next(value);
  }

  async getImages(page: number) {
    this.Images = await this.imageService.convertAnsw(page);
  }

  async getSearch(queryString: string) {
    this.Images = await this.imageService.searchAPI(queryString);
  }

  async getFav(id: string | null) {
    if (id != null) {
      await this.imageService.convertSingle(id).then((data: any) => {
        this.Image = data.image;
      });
    } else {
      this.Image = <Image>{};
    }
  }
}
