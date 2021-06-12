import { Component, OnInit } from '@angular/core';
import { faSearch, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ImageService } from '../services/image.service';
import { SearchService } from '../services/search.service';
import { Image } from '../shared/image.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faSearch = faSearch;
  faCameraRetro = faCameraRetro;
  query: any;
  images: Image[];
  searchInput: '';

  isMenuCollapsed = true;

  constructor() {}

  ngOnInit(): void {}
}
