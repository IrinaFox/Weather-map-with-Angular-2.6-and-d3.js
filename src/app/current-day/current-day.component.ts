import { Component, OnInit } from '@angular/core';
import { CurrentDay } from './current-day';
import { CurrentDayService } from './current-day.service';

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.css']
})
export class CurrentDayComponent implements OnInit {
  currentDay: CurrentDay;

  constructor(private currentDayListService: CurrentDayService) { }

  ngOnInit() {
    this.getCurrentDay();

  }

  getCurrentDay() {
    this.currentDayListService.getCurrentDay().subscribe(data => {
      console.log(data);
        this.currentDay = new CurrentDay(data);
      },
      error => console.log(error));
  }
}
