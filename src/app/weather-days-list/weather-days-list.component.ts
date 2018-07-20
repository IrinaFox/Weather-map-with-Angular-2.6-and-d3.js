import { Component, OnInit } from '@angular/core';
import { WeatherDaysListService } from './weather-days-list.service';
import { WeatherDay } from './weather-day';
import * as d3 from 'd3';

@Component({
  selector: 'app-weather-days-list',
  templateUrl: './weather-days-list.component.html',
  styleUrls: ['./weather-days-list.component.css']
})
export class WeatherDaysListComponent implements OnInit {
  weatherDays: WeatherDay[];

  constructor(private weatherDaysListService: WeatherDaysListService) { }

  ngOnInit() {
    this.getWeatherDays();
  }

  getWeatherDays() {
    this.weatherDaysListService.getWeatherDays().subscribe(data => {
      this.weatherDays = [];

      data.list.forEach((item) => {
        this.weatherDays.push(new WeatherDay(item));
      });

      this.drowDiagram('temperature');
    },
    error => console.log(error));
  }

  drowDiagram(index) {
    const height = 250;
    const width = 900;
    const margin = 30;
    const padding = 2;
    const scaleYDomain = {
      temperature: [40, 0],
      wind: [10, 0],
      pressure: [1025, 1015],
      humidity: [100, 0]
    };
    const diagramColor = {
      temperature: 'pink',
      wind: 'aquamarine',
      pressure: 'yellowgreen',
      humidity: 'black'
    };
    const xAxisLength = width - 2 * margin;
    const yAxisLength = height - 2 * margin;
    const data = [];
    let x = 1;

    // clearing old diagram
    d3.select('.svgContainer').html('');

    this.weatherDays.forEach((item) => {
      const indexMeaning = {
        temperature: item.temperature,
        wind: item.wind,
        pressure: item.pressure,
        humidity: item.humidity
      };

      data.push({x: x++, y: indexMeaning[index]});
    });

    const svg = d3.select('.svgContainer').append('svg')
      .attr('class', 'axis')
      .attr('width', width)
      .attr('height', height);

    const scaleX = d3.scaleLinear()
      .domain([1, 16])
      .range([0, xAxisLength]);

    const scaleXLiner = d3.scaleBand()
      .rangeRound([0, xAxisLength + margin + margin / 2])
      .domain(this.weatherDays.map((d) => {
        return d.time;
      }));

    const scaleY = d3.scaleLinear()
      .domain(scaleYDomain[index])
      .range([0, yAxisLength]);

    const xAxis = d3.axisBottom(scaleXLiner);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform',
        'translate(' + margin + ',' + (height - margin) + ')')
      .call(xAxis);

    const g = svg.append('g')
      .attr('class', 'body')
      .attr('transform',  // сдвиг объекта вправо
        'translate(' + margin + ', 0 )');

    g.selectAll('rect.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar');

    g.selectAll('rect.bar')
      .data(data)
      .attr('fill', diagramColor[index])
      .attr('x', function (d) {
        return scaleX(d.x);
      })
      .attr('y', function (d) {
        return scaleY(d.y) + margin;
      })
      .attr('height', function (d) {
        return yAxisLength - scaleY(d.y);
      })
      .attr('width', function(d) {

        return Math.floor(xAxisLength / data.length) - padding;
      });
  }
}
