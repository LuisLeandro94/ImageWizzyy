import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faSearch,
  faCameraRetro,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatastoreService } from '../services/datastore.service';
import { ImageService } from '../services/image.service';
import { Image } from '../shared/image.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faSearch = faSearch;
  faCameraRetro = faCameraRetro;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  images: Image[];
  searchInput: '';

  isMenuCollapsed = true;

  constructor(
    public dataStore: DatastoreService,
    private modalService: NgbModal,
    public router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {}

  search(): void {
    this.dataStore.getSearch(this.searchInput, this.dataStore.PageSearch);
    this.router.navigate(['']);
  }

  modalOpen(content: any) {
    this.modalService.open(content).result.then();
  }

  returnList() {
    this.dataStore.getImages(1);
    this.router.navigate(['']);
    this.dataStore.PageSearch = 1;
  }

  paginationR() {
    if (this.imageService.isSearch == false) {
      this.dataStore.Page += 1;
      this.dataStore.getImages(this.dataStore.Page);
    } else {
      debugger;
      this.dataStore.PageSearch += 1;
      this.dataStore.getSearch(this.searchInput, this.dataStore.PageSearch);
    }
  }

  paginationL() {
    if (this.imageService.isSearch == false) {
      this.dataStore.Page -= 1;
      this.dataStore.getImages(this.dataStore.Page);
    } else {
      this.dataStore.PageSearch -= 1;
      this.dataStore.getSearch(this.searchInput, this.dataStore.PageSearch);
    }
  }

  checkURL(): boolean {
    if (this.router.url.includes('/images/')) {
      return true;
    } else {
      return false;
    }
  }
}
