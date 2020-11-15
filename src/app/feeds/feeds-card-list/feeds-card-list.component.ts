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

  createdTimeAgo(created) {
    const ONE_HOUR = 3600000,
      ONE_DAY = 86400000,
      ONE_MONTH = 2592000000,
      ONE_YEAR = 31556952000

    let currentTime = Date.now();
    let timeDifference = currentTime - (created * 1000);
    const MINUTES_AGO = (timeDifference / 60) / 1000,
      HOURS_AGO = MINUTES_AGO / 60,
      DAYS_AGO = HOURS_AGO / 24,
      MONTHS_AGO = (HOURS_AGO / 60) / 12,
      YEARS_AGO = MONTHS_AGO / 12

    let createdTimeAgo: string;
    if (timeDifference < ONE_HOUR) {
      createdTimeAgo = `${Math.floor(MINUTES_AGO)} minutes ago`;
    } else if (timeDifference >= ONE_HOUR && timeDifference < ONE_DAY) {
      createdTimeAgo = `${Math.floor(HOURS_AGO)} hours ago`;
    } else if (timeDifference >= ONE_DAY && timeDifference < ONE_MONTH) {
      createdTimeAgo = `${Math.floor(DAYS_AGO)} days ago`;
    } else if (timeDifference >= ONE_MONTH && timeDifference < ONE_YEAR) {
      createdTimeAgo = `${Math.floor(MONTHS_AGO)} months ago`;
    } else {
      createdTimeAgo = `${Math.floor(YEARS_AGO)} years ago`;
    }
    return `created: ${createdTimeAgo}`;
  }

}
