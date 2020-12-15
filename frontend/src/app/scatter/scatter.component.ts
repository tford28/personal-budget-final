import { Component, OnInit } from '@angular/core';
import { Budget } from '../model/budget';
import { BudgetService } from '../services/budget.service';
import { SharedServiceService } from '../services/shared-service.service';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.scss']
})
export class ScatterComponent implements OnInit {
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
    this.drawPlot();
    d3.json('http://localhost:3000/budget/username/' + this.userName).then(data => this.drawPlot());

  }

  private createSvg(): void {
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}
private drawPlot(): void {
  const x = d3.scaleLinear()
  .domain([2018, 2020])
  .range([ 0, this.width ]);
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  const y = d3.scaleLinear()
  .domain([0, 1000])
  .range([ this.height, 0]);
  this.svg.append("g")
  .call(d3.axisLeft(y));

  const dots = this.svg.append('g');
  dots.selectAll("dot")
  .data(this.budget)
  .enter()
  .append("circle")
  .attr("cx", d => x(d.title))
  .attr("cy", d => y(d.budget))
  .attr("r", 7)
  .style("opacity", .5)
  .style("fill", "#69b3a2");

  dots.selectAll("text")
  .data(this.budget)
  .enter()
  .append("text")
  .text(d => d.Framework)
  .attr("x", d => x(d.title))
  .attr("y", d => y(d.budget))
}
}
