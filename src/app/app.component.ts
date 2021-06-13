import { Component, OnInit } from '@angular/core';
import { DatastoreService } from './services/datastore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'finalProject';

  constructor(public dataStore: DatastoreService) {}

  ngOnInit() {
    this.dataStore.getImages(1);
  }
}
