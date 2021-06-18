import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatastoreService } from '../services/datastore.service';
import { Image } from '../shared/image.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faSearch = faSearch;
  faCameraRetro = faCameraRetro;
  images: Image[];
  searchInput: '';

  isMenuCollapsed = true;

  constructor(
    public dataStore: DatastoreService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {}

  search(): void {
    this.dataStore.getSearch(this.searchInput);
  }

  modalOpen(content: any) {
    this.modalService.open(content).result.then();
  }

  returnList() {
    this.dataStore.getImages(1);
    this.router.navigate(['']);
  }
}
