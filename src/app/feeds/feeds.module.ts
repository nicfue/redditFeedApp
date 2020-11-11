import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from '../home/home.component';
import { FeedsCardListComponent } from './feeds-card-list/feeds-card-list.component';
import { FeedsRoutingModule } from './feeds-routing.module';
import { FeedsServcie } from './services/feeds.service';


@NgModule({
  declarations: [
    HomeComponent,
    FeedsCardListComponent
  ],
  imports: [
    CommonModule,
    FeedsRoutingModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [FeedsServcie]
})
export class FeedsModule { }



