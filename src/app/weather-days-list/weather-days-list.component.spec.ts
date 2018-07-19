import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDaysListComponent } from './weather-days-list.component';

describe('WeatherDaysListComponent', () => {
  let component: WeatherDaysListComponent;
  let fixture: ComponentFixture<WeatherDaysListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherDaysListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDaysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
