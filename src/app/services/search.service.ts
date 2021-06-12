import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Image } from '../shared/image.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchResults = [];

  clientID: string = 'hsntDSGlKnHUNoVJgTTvMw14mHh9GgNAEwRrwLP_j_0';
  baseURL: string =
    'https://api.unsplash.com/search/photos?per_page=24&order_by=latest&client_id=' +
    this.clientID +
    '&query=';

  constructor(private _http: HttpClient) {}

  searchAPI(queryString: string) {
    debugger;
    let _url = this.baseURL + queryString;
    this._http
      .get(_url)
      .toPromise()
      .then((data: any) => {
        this.convertSearch(data.results);
      });
  }

  getImageByID(id: string) {
    let url = `https://api.unsplash.com/photos/${id}?client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578`;
    return this._http.get(url);
  }

  convertSearch(response): Image[] {
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
          this.searchResults.push(
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
    return this.searchResults;
  }
}
