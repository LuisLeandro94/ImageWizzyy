import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from '../services/search.service';
import { Image } from '../shared/image.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  searchResults: Image[] = [];
  faEye = faEye;
  query: any;

  constructor(
    private searchService: SearchService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.params['query'];
    this.searchService.searchAPI(query);
    this.searchResults = this.searchService.searchResults;
  }
}
