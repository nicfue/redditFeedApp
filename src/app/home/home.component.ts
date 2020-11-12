import { FeedLimit } from './../feeds/model/feed-limit';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedCategories } from '../feeds/model/feed-categories';
import { FeedsService } from '../feeds/services/feeds.service';
import { LoadingService } from '../loading/loading.service';
import { FeedCategory } from './../feeds/model/feed-category';
import { Feed } from './../feeds/model/feeds';
import { FeedsLimits } from '../feeds/model/feed-limits';


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


  constructor(
    private feedsService: FeedsService,
    private loadingService: LoadingService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadFeedData();
  }

  onCategoryChange() {
    this.loadFeedData();
    this.router.navigateByUrl('feeds/' + this.categorySelected);
  }

  onNumberOfFeedsChange() {
    this.loadFeedData();
  }

  loadFeedData() {
    const feedsData$ = this.feedsService.loadFeeds(this.categorySelected)
      .pipe(
        map(res => res.slice(0, this.feedLimitSelected))
      );
    this.feeds$ = this.loadingService.showLoaderUntilCompleted(feedsData$);
  }

  onInputFeed(inputFeed: HTMLInputElement) {
    const hasInput = inputFeed.value !== '';
    if (hasInput) {
      this.feedCategories.push({
        value: inputFeed.value,
        viewValue: inputFeed.value
      });
      this.router.navigateByUrl('feeds/' + inputFeed.value);
    } else {
      this.router.navigateByUrl('feeds/' + this.categorySelected);
    }
    const feedsData$ = this.feedsService.loadFeeds(hasInput ? inputFeed.value : this.categorySelected)
      .pipe(
        map(res => res.slice(0, this.feedLimitSelected))
      );
    this.feeds$ = this.loadingService.showLoaderUntilCompleted(feedsData$)

  }

}
