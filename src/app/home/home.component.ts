import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedCategories } from '../feeds/model/feed-categories';
import { FeedsServcie } from '../feeds/services/feeds.service';
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


  constructor(private feedsServcie: FeedsServcie, private router: Router) { }

  ngOnInit(): void {
    this.feeds$ = this.feedsServcie.loadFeeds(this.categorySelected)
  }

  onChange() {
    this.feeds$ = this.feedsServcie.loadFeeds(this.categorySelected)
    this.router.navigateByUrl('feeds/' + this.categorySelected.toLowerCase())
  }










}
