import { Component, OnInit } from '@angular/core';
import { Budget } from '../model/budget';
import { BudgetService } from '../services/budget.service';
import { SharedServiceService } from '../services/shared-service.service';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  budget: Budget[];
  user: any;
  userName: any;
  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

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
    d3.json('http://localhost:3000/budget/username/' + this.userName).then(data => this.drawChart());
    this.createColors();
    this.drawChart();
  }
  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}
private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain(this.budget.map(d => d.budget.toString()))
  .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
}
private drawChart(): void {
  const pie = d3.pie<any>().value((d: any) => Number(d.budget));

  this.svg
  .selectAll('pieces')
  .data(pie(this.budget))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr("fill", "#c7d7f2")
  .attr("stroke", "#000000")
  .style("stroke-width", "1px");

  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
  .data(pie(this.budget))
  .enter()
  .append('text')
  .text(d => d.data.title)
  .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 15);
}
}
