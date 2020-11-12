import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeedCategories } from '../feeds/model/feed-categories';
import { FeedsLimits } from '../feeds/model/feed-limits';
import { FeedsService } from '../feeds/services/feeds.service';
import { LoadingService } from '../loading/loading.service';
import { FeedCategory } from './../feeds/model/feed-category';
import { FeedLimit } from './../feeds/model/feed-limit';
import { Feed } from './../feeds/model/feeds';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  feeds$: Observable<Feed[]>;
  feedCategories: FeedCategory[] = [
    { value: FeedCategories.SWEDEN, viewValue: 'Sweden' },
    { value: FeedCategories.ANGULAR, viewValue: 'Angular' },
    { value: FeedCategories.COVID19, viewValue: 'Covid19' }
  ];
  categorySelected = FeedCategories.SWEDEN;
  feedLimitSelected = FeedsLimits.LIMIT_10;
  numberOfFeeds: FeedLimit[] = [
    { value: 5 },
    { value: 10 },
    { value: 25 }
  ]
  hasInput: boolean;
  inputFeed: HTMLInputElement;

  constructor(
    private feedsService: FeedsService,
    private loadingService: LoadingService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadFeedData();
  }

  onCategoryChange() {
    this.hasInput = false;
    this.loadFeedData();
  }

  onNumberOfFeedsChange() {
    this.loadFeedData();
  }

  loadFeedData() {
    const feedsData$ = this.feedsService.loadFeeds(this.hasInput ? this.inputFeed.value : this.categorySelected)
      .pipe(
        map(res => res.slice(0, this.feedLimitSelected)),
      );
    this.feeds$ = this.loadingService.showLoaderUntilCompleted(feedsData$);
    const feedCategory = this.hasInput ? this.inputFeed.value : this.categorySelected;
    this.router.navigate(['feeds/' + feedCategory], { queryParams: { limit: this.feedLimitSelected } });
  }

  onInputFeed(inputFeed: HTMLInputElement) {
    this.inputFeed = inputFeed;
    this.hasInput = inputFeed.value !== '';
    if (this.hasInput) {
      this.feedCategories.push({
        value: inputFeed.value,
        viewValue: inputFeed.value
      });
    }
    this.loadFeedData();
  }

}
