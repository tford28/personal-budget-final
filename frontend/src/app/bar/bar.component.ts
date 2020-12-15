import { Component, OnInit } from '@angular/core';
import { Budget } from '../model/budget';
import { BudgetService } from '../services/budget.service';
import { SharedServiceService } from '../services/shared-service.service';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  budget: Budget[];
  user: any;
  userName: any;
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private brs: BudgetService,private sharedService: SharedServiceService, private router: Router,) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('JWT_Token');
    this.user = jwt_decode(this.user);
    console.log(this.user.userType);
    this.userName = this.user.username;
    console.log(this.userName);
    this.brs.getBudgetByUser(this.userName).subscribe((data) => {
      this.budget = data;
      console.log(this.budget);
    });
    this.createSvg();
    d3.json('http://localhost:3000/budget/username/' + this.userName).then(data => this.drawBars(this.budget));
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}
private drawBars(data: any[]): void {
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.title))
  .padding(0.2);

  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  const y = d3.scaleLinear()
  .domain([0, 1000])
  .range([this.height, 0]);

  this.svg.append("g")
  .call(d3.axisLeft(y));

  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(d.title))
  .attr("y", d => y(d.budget))
  .attr("width", x.bandwidth())
  .attr("height", (d) => this.height - y(d.budget))
  .attr("fill", "#d04a35");
}
}
