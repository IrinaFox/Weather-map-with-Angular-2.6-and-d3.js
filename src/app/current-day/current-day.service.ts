import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentDayService {

  constructor(private http: HttpClient) { }

  getCurrentDay(): Observable<any> {
    const dayUrl = 'http://api.openweathermap.org/data/2.5/weather?q=London&cnt=16&APPID=4b8a14ed9a7b203c49074646f4bb55e8';

    return this.http.get(dayUrl);
  }
}
