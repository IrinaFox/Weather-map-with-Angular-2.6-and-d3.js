import { TestBed, inject } from '@angular/core/testing';

import { CurrentDayService } from './current-day.service';

describe('CurrentDayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentDayService]
    });
  });

  it('should be created', inject([CurrentDayService], (service: CurrentDayService) => {
    expect(service).toBeTruthy();
  }));
});
