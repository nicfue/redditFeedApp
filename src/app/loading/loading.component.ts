import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LoadingService } from './loading.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(public loadingService: LoadingService, private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .subscribe(
        event => {
          if (
            event instanceof NavigationStart ||
            event instanceof RouteConfigLoadStart) {
            this.loadingService.loadingOn();
          }
          else if (
            event instanceof NavigationEnd ||
            event instanceof NavigationError ||
            event instanceof NavigationCancel ||
            event instanceof RouteConfigLoadEnd) {
            this.loadingService.loadingOff();
          }
        }
      )
  }

}
