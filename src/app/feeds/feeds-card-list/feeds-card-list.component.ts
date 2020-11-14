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

  feedCreated(feedCreated) {
    const ONE_HOUR_IN_MILLISECONDS = 3600000, ONE_DAY_IN_MILLISECONDS = 86400000;

    let currentTime = Date.now();
    let timeDifference = currentTime - feedCreated;
    const MINUTES_AGO = (timeDifference / 60) / 1000,
      HOURS_AGO = (timeDifference / 60 / 60) / 1000,
      DAYS_AGO = (timeDifference / 60 / 60) / 1000

    let created: string;
    if (timeDifference < ONE_HOUR_IN_MILLISECONDS) {
      created = `${MINUTES_AGO} minutes ago`;
    } else if (timeDifference >= ONE_HOUR_IN_MILLISECONDS && timeDifference <= ONE_DAY_IN_MILLISECONDS) {
      created = `${Math.floor(HOURS_AGO)} hours ago`;
    } else {
      created = `${Math.floor(DAYS_AGO / 24)} days ago`
    }
    return created;
  }

}
