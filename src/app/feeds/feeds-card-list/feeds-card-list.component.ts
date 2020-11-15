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
    const ONE_HOUR_IN_MILLISECONDS = 3600000,
      ONE_DAY_IN_MILLISECONDS = 86400000,
      ONE_MONTH_IN_MILLISECONDS = 2592000000,
      ONE_YEAR_IN_MILLISECONDS = 31556952000

    let currentTime = Date.now();
    let timeDifference = currentTime - (feedCreated * 1000);
    const MINUTES_AGO = (timeDifference / 60) / 1000,
      HOURS_AGO = (timeDifference / 60 / 60) / 1000,
      DAYS_AGO = HOURS_AGO / 24,
      MONTHS_AGO = ((timeDifference / 60 / 60 / 60) / 12) / 1000,
      YEARS_AGO = MONTHS_AGO / 12

    let createdTimeAgo: string;
    if (timeDifference < ONE_HOUR_IN_MILLISECONDS) {
      createdTimeAgo = `${Math.floor(MINUTES_AGO)} minutes ago`;
    } else if (timeDifference >= ONE_HOUR_IN_MILLISECONDS && timeDifference <= ONE_DAY_IN_MILLISECONDS) {
      createdTimeAgo = `${Math.round(HOURS_AGO)} hours ago`;
    } else if (timeDifference > ONE_DAY_IN_MILLISECONDS && timeDifference <= ONE_MONTH_IN_MILLISECONDS) {
      createdTimeAgo = `${Math.round(DAYS_AGO)} days ago`;
    } else if (timeDifference > ONE_MONTH_IN_MILLISECONDS && timeDifference <= ONE_YEAR_IN_MILLISECONDS) {
      createdTimeAgo = `created ${Math.round(MONTHS_AGO)} months ago`
    } else {
      createdTimeAgo = `${Math.round(YEARS_AGO)} years ago`;
    }
    return `created: ${createdTimeAgo}`;
  }

}
