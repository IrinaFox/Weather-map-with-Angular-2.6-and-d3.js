import { TestBed, inject } from '@angular/core/testing';

import { WeatherDaysListService } from './weather-days-list.service';

describe('WeatherDaysListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherDaysListService]
    });
  });

  it('should be created', inject([WeatherDaysListService], (service: WeatherDaysListService) => {
    expect(service).toBeTruthy();
  }));
});
