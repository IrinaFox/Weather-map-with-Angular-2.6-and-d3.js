export class WeatherDay {
  temperature: number;
  time: string;
  wind: number;
  pressure: number;
  humidity: number;

  constructor(data: any) {
    // making celsius  from Kelvin
    this.temperature = Math.round(data.main.temp - 273.15);
    this.wind = data.wind.speed;
    this.pressure = data.main.pressure;
    this.humidity = data.main.humidity;

    const date = new Date(data.dt * 1000);
    this.time = date.getUTCDate() + '/' + date.getHours() + 'h';
  }
}
