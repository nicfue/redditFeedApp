import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedCategories } from '../feeds/model/feed-categories';
import { FeedsServcie } from '../feeds/services/feeds.service';
import { LoadingService } from '../loading/loading.service';
import { FeedCategory } from './../feeds/model/feed-category';
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


  constructor(private feedsServcie: FeedsServcie, private loadingService: LoadingService, private router: Router) { }

  ngOnInit(): void {
    this.reloadFeed();
  }

  reloadFeed() {
    const feedsData$ = this.feedsServcie.loadFeeds(this.categorySelected);
    this.feeds$ = this.loadingService.showLoaderUntilCompleted(feedsData$);
  }

  onChange() {
    const feedsData$ = this.feedsServcie.loadFeeds(this.categorySelected)
    this.feeds$ = this.loadingService.showLoaderUntilCompleted(feedsData$)
    this.router.navigateByUrl('feeds/' + this.categorySelected);
  }












}
