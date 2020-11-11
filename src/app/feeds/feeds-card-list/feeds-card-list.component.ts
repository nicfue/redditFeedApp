import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Feed } from './../model/feeds';

@Component({
  selector: 'feeds-card-list',
  templateUrl: './feeds-card-list.component.html',
  styleUrls: ['./feeds-card-list.component.css']
})
export class FeedsCardListComponent  {
  @Input()
  feeds: Feed[] = [];


  constructor() {
  }

}
