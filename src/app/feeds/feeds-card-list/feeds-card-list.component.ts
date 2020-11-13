import { Component, Input } from '@angular/core';
import { Feed } from '../model/feed';


@Component({
  selector: 'feeds-card-list',
  templateUrl: './feeds-card-list.component.html',
  styleUrls: ['./feeds-card-list.component.css']
})
export class FeedsCardListComponent {
  @Input()
  feeds: Feed[] = [];
  showFeedText = false;
  selectedFeed: Feed;


  constructor() {
  }

  openFeedText(feed: Feed) {
    this.selectedFeed = feed;
    this.showFeedText = !this.showFeedText;
  }

}
