export class CurrentDay {
  temperature: string;
  date: any;
  time: string;
  day: string;
  windSpeed: string;
  clouds: string;
  weatherState: string;
  city: string;
  countryCode: string;
  pressure: string;
  humidity: string;

  constructor(data: any) {
    // making celsius  from Kelvin
    this.temperature = Math.round(data.main.temp - 273.15) + ' C';

    this.pressure = data.main.pressure;
    this.humidity = data.main.humidity;
    this.clouds = data.clouds.all + '%';
    this.windSpeed = data.wind.speed + ' m/s';
    this.city = data.name;
    this.countryCode = data.sys.country;
    this.weatherState = data.weather[0].main;

    this.date = new Date(data.dt * 1000);
    this.time = this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
    this.day = this.date.getUTCDate() + '.' + (this.date.getUTCMonth() + 1);
  }
}
