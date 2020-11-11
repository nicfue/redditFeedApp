import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input()
  detectRoutingOnGoing = false;

  constructor(public loadingService: LoadingService, private router: Router) { }

  ngOnInit(): void {
    if (this.detectRoutingOnGoing) {
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

}
