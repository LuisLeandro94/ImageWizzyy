import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../shared/image.model';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ImageService {
  images = [];
  favorites = [];
  clientID: string = 'hsntDSGlKnHUNoVJgTTvMw14mHh9GgNAEwRrwLP_j_0';
  baseURL: string =
    'https://api.unsplash.com/search/photos?per_page=24&page=1&order_by=latest&client_id=' +
    this.clientID +
    '&query=';

  constructor(private http: HttpClient) {}

  getData(): Observable<Image[]> {
    debugger;
    let url =
      'https://api.unsplash.com/photos?per_page=24&order_by=latest&client_id=hsntDSGlKnHUNoVJgTTvMw14mHh9GgNAEwRrwLP_j_0&page=1';
    return this.http.get(url).pipe(
      map((res) => {
        return this.convertImages(res);
      })
    );
  }
  

  getImageByID(id: string) {
    let url = `https://api.unsplash.com/photos/${id}?client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578`;
    return this.http.get(url);
  }

  convertImages(response): Image[] {
    let imageResponse = response;

    let i = 0;

    for (i = 0; i < imageResponse.length; i++) {
      let image = imageResponse[i];
      this.getImageByID(image.id)
        .toPromise()
        .then((data: any) => {
          const arrayTags: string[] = [];

          data.tags.forEach((item) => {
            arrayTags.push(item.title);
          });
          let description = image.description == null ? '' : image.description;
          let alt_description =
            image.alt_description == null ? '' : image.alt_description;
          let created_at = image.created_at;
          let id = image.id;
          let path = image.urls.raw + '&fit=crop&w=500&h=500';
          let regPath = image.urls.regular + '&fit=crop&w=500&h=500';
          let creator = image.user.name;
          let download = image.links.download;
          this.images.push(
            new Image(
              description,
              alt_description,
              created_at,
              id,
              data.likes,
              path,
              regPath,
              creator,
              arrayTags,
              download,
              data.downloads
            )
          );
        });
    }
    return this.images;
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
    download: string;
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
}
