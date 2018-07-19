import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherDaysListComponent } from './weather-days-list/weather-days-list.component';
import { CurrentDayComponent } from './current-day/current-day.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDaysListComponent,
    CurrentDayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
