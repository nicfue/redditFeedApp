import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { FeedCategories } from '../model/feed-categories';
import { Feed } from '../model/feed';


@Injectable()
export class FeedsService {

    constructor(private http: HttpClient) { }

    loadFeeds(categorySelected): Observable<Feed[]> {
        const URL_SWEDEN = 'https://www.reddit.com/r/sweden/.json',
            URL_COVID19 = 'https://www.reddit.com/r/covid19/.json',
            URL_ANGULAR = 'https://www.reddit.com/r/angular/.json',
            URL_FROM_INPUT = 'https://www.reddit.com/r/' + categorySelected + '/.json'


        let url;
        switch (categorySelected) {
            case categorySelected == FeedCategories.SWEDEN:
                url = URL_SWEDEN;
                break;
            case categorySelected == FeedCategories.ANGULAR:
                url = URL_ANGULAR;
                break;
            case categorySelected == FeedCategories.COVID19:
                url = URL_COVID19
                break;
            default:
                url = URL_FROM_INPUT;
                break;
        }
        return this.http.get<Feed[]>(url)
            .pipe(
                tap((res) => console.log(res['data'])),
                map(res => (res["data"]["children"])),
                shareReplay()
            )
    }

}

