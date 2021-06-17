import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatastoreService } from '../services/datastore.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  constructor(private dataStore: DatastoreService, private router: Router) {}

  ngOnInit(): void {}

  returnList() {
    this.dataStore.getImages(1);
    this.router.navigate(['']);
  }
}
