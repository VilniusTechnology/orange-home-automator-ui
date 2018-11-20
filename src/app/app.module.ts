import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {LightningLevelService} from './lightning-level.service';
import {DataService} from './data.service';


import {LightingChartComponent} from './lighting-chart/lighting-chart.component';
import { TopbarComponent } from './topbar/topbar.component';
import { GraphsComponent } from './graphs/graphs.component';
import { HistoryComponent } from './history/history.component';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { PromisesComponent } from './promises/promises.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LightingChartComponent,
    TopbarComponent,
    GraphsComponent,
    HistoryComponent,
    PromisesComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    LightningLevelService,
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}