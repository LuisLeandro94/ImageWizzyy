import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../shared/image.model';

@Injectable()
export class ImageService {
  isSearch: boolean = false;
  images: Image[] = [];
  favorites = [];
  clientID: string = 'hsntDSGlKnHUNoVJgTTvMw14mHh9GgNAEwRrwLP_j_0';
  baseURL: string =
    'https://api.unsplash.com/search/photos?per_page=24&page=1&order_by=latest&client_id=' +
    this.clientID +
    '&query=';

  constructor(private http: HttpClient) {}

  getData(page: number) {
    let url = `https://api.unsplash.com/photos?per_page=24&page=${page}&order_by=latest&client_id=hsntDSGlKnHUNoVJgTTvMw14mHh9GgNAEwRrwLP_j_0`;
    return this.http.get(url);
  }

  getImageByID(id: string) {
    let url = `https://api.unsplash.com/photos/${id}?client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578`;
    return this.http.get(url);
  }

  convertAnsw(page: number) {
    this.isSearch = false;
    this.images = [];
    this.getData(page).subscribe((data) => {
      for (const item of data as any) {
        this.createImage(item).then((data: any) => {
          this.images.push(data.image);
        });
      }
    });
    return this.images;
  }

  searchAPI(queryString: string, page: number) {
    this.isSearch = true;
    this.images = [];
    this.getSearch(queryString, page).subscribe((data: any) => {
      for (const item of data.results as any) {
        this.createImage(item).then((data: any) => {
          this.images.push(data.image);
        });
      }
    });
    return this.images;
  }

  getSearch(queryString: string, page: number) {
    let url = `https://api.unsplash.com/search/photos?per_page=24&page=${page}&order_by=latest&client_id=hsntDSGlKnHUNoVJgTTvMw14mHh9GgNAEwRrwLP_j_0&query=${queryString}`;
    return this.http.get(url);
  }

  createImage(image: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let img: Image = new Image(
        image.description == null ? '' : image.description,
        image.alt_description == null ? '' : image.alt_description,
        image.created_at,
        image.id,
        image.likes,
        image.urls.raw + '&fit=crop&w=500&h=500',
        image.urls.regular + '&fit=crop&w=500&h=500',
        image.user.name,
        null,
        null
      );
      resolve({ image: img });
    });
  }

  convertSingle(id: string): Promise<any> {
    let image: Image;

    return new Promise((resolve, reject) => {
      this.getImageByID(id).subscribe((data) => {
        this.createImageDetails(data).then((data: any) => {
          image = data.image;
          resolve({ image: image });
        });
      });
    });
  }

  createImageDetails(image: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getImageByID(image.id)
        .toPromise()
        .then((data: any) => {
          let arrayTags: string[] = [];

          data.tags.forEach((element) => {
            arrayTags.push(element.title);
          });

          let img: Image = new Image(
            image.description == null ? '' : image.description,
            image.alt_description == null ? '' : image.alt_description,
            image.created_at,
            image.id,
            data.likes,
            image.urls.raw + '&fit=crop&w=500&h=500',
            image.urls.regular + '&fit=crop&w=500&h=500',
            image.user.name,
            arrayTags,
            data.downloads
          );
          resolve({ image: img });
        });
    });
  }

  addToFavorite(image: {
    description: string;
    alt_description: string;
    created_at: Date;
    id: string;
    total_likes: number;
    path: string;
    regPath: string;
    creator: string;
    tags: string[];
    total_downloads: number;
  }) {
    this.insertFavorite(image);
  }

  insertFavorite(image: Image) {
    if (this.favorites.find((x) => x.id == image.id) == undefined) {
      this.favorites.push(image);
    }
  }

  checkIfFavorite(id: string): boolean {
    return this.favorites.find((x) => x.id == id) == undefined;
  }

  remFromFavorite(id: string) {
    let i: number = 0;
    for (let i = 0; i < this.favorites.length; i++) {
      if (this.favorites[i].id === id) {
        this.favorites.splice(i, 1);
      }
    }
  }

  getFavImage(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getImageByID(id).subscribe((data) => {
        this.createImage(data).then((data: any) => {
          resolve({ image: data.image });
        });
      });
    });
  }
}
