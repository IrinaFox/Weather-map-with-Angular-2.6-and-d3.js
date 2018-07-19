import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherDaysListService {

  constructor(private http: HttpClient) { }

  getWeatherDays(): Observable<any> {
    const daysUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=London&cnt=16&APPID=4b8a14ed9a7b203c49074646f4bb55e8';

    return this.http.get(daysUrl);
  }
}
