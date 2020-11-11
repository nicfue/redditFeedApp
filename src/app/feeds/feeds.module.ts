import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoadingComponent } from '../loading/loading.component';
import { FeedsCardListComponent } from './feeds-card-list/feeds-card-list.component';
import { FeedsRoutingModule } from './feeds-routing.module';
import { FeedsServcie } from './services/feeds.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    HomeComponent,
    FeedsCardListComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FeedsRoutingModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [FeedsServcie]
})
export class FeedsModule { }



