import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { FeedCategories } from '../model/feed-categories';
import { Feed } from './../model/feeds';


@Injectable()
export class FeedsService {

    constructor(private http: HttpClient) { }

    loadFeeds(categorySelected): Observable<Feed[]> {
        const URL_SWEDEN = 'https://www.reddit.com/r/sweden/.json';
        const URL_COVID19 = 'https://www.reddit.com/r/covid19/.json';
        const URL_ANGULAR = 'https://www.reddit.com/r/angular/.json';
        const URL_FROM_INPUT = 'https://www.reddit.com/r/' + categorySelected + '/.json';

        let url;
        if (categorySelected == FeedCategories.SWEDEN) {
            url = URL_SWEDEN;
        } else if (categorySelected == FeedCategories.ANGULAR) {
            url = URL_ANGULAR;
        } else if (categorySelected == FeedCategories.COVID19) {
            url = URL_COVID19
        } else {
            url = URL_FROM_INPUT;
        }
        return this.http.get<Feed[]>(url)
            .pipe(
                tap((res) => console.log(res['data'])),
                map(res => (res["data"]["children"])),
                shareReplay()
            )
    }




}

