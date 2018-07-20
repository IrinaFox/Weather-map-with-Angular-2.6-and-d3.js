export class WeatherDay {
  temperature: number;
  date: any;
  time: string;
  day: string;
  wind: number;
  pressure: number;
  humidity: number;


  constructor(data: any) {
    // making celsius  from Kelvin
    this.temperature = Math.round(data.main.temp - 273.15);
    this.wind = data.wind.speed;
    this.pressure = data.main.pressure;
    this.humidity = data.main.humidity;

    this.date = new Date(data.dt * 1000);
    this.time = this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
    this.day = this.date.getUTCDate() + '.' + (this.date.getUTCMonth() + 1);
  }
}
