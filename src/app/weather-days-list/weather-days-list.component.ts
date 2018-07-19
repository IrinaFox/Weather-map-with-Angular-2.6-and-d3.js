import { Component, OnInit } from '@angular/core';
import { WeatherDaysListService } from './weather-days-list.service';
import { WeatherDay } from './weather-day';
import * as d3 from 'd3';
import {Output} from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-weather-days-list',
  templateUrl: './weather-days-list.component.html',
  styleUrls: ['./weather-days-list.component.css']
})
export class WeatherDaysListComponent implements OnInit {
  weatherDays: WeatherDay[];
  temperatureArrays;

  constructor(private weatherDaysListService: WeatherDaysListService) { }

  ngOnInit() {
    this.getWeatherDays();

  }

  getWeatherDays() {
    this.weatherDaysListService.getWeatherDays().subscribe(data => {
        this.weatherDays = [];

        data.list.forEach((item) => {
          const temperature = item.main.temp;
          const date = new Date(item.dt);

          this.weatherDays.push(new WeatherDay(item));
        });

        this.generateDiagram();
      },
      error => console.log(error));
  }

  generateDiagram() {
    const height = 250;
    const width = 800;
    const margin = 30;
    const padding = 2;
    const data = [];
    let x = 1;

    this.weatherDays.forEach((item) => {
      data.push({x: x++, y: item.temperature, date: item.day + item.time});
    });

    const svg = d3.select('.svgContainer').append('svg')
      .attr("class", "axis")
      .attr("width", width)
      .attr("height", height);

    const xAxisLength = width - 2 * margin;
    const yAxisLength = height - 2 * margin;

// функция интерполяции значений на ось Х
    const scaleX = d3.scaleLinear()
      .domain([1, 16])
      .range([0, 690]);

    // let scaleX = d3.scaleOrdinal()
    //   .range([1, xAxisLength])
    //   .domain(data.map((d) => {
    //     console.log(d.date);
    //     return d.date;
    //   }));

// функция интерполяции значений на ось Y
    const scaleY = d3.scaleLinear()
      .domain([40, 0])
      .range([0, yAxisLength]);

// создаем ось X
    let xAxis = d3.axisBottom(scaleX);

// создаем ось Y
    let yAxis = d3.axisLeft(scaleY);

    // отрисовка оси Х
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform",  // сдвиг оси вниз и вправо
        "translate(" + margin + ',' + (height - margin) + ')')
      .call(xAxis);

// рисуем горизонтальные линии
    d3.selectAll("g.y-axis g.tick")
      .append("line")
      .classed("grid-line", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", xAxisLength)
      .attr("y2", 0);
// создаем объект g для прямоугольников
    let g =svg.append("g")
      .attr("class", "body")
      .attr("transform",  // сдвиг объекта вправо
        "translate(" + margin + ", 0 )");
// связываем данные с прямоугольниками
    g.selectAll("rect.bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar");
// устанавливаем параметры прямоугольников
    g.selectAll("rect.bar")
      .data(data)
      .attr('fill', 'pink')
      .attr("x", function (d) {
        return scaleX(d.x);
      })
      .attr("y", function (d) {
        return scaleY(d.y) + margin;
      })
      .attr("height", function (d) {
        return yAxisLength - scaleY(d.y);
      })
      .attr("width", function(d) {

        return Math.floor(xAxisLength / data.length) - padding;
      });
  }
}
