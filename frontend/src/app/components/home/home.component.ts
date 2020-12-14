import { Component, OnInit } from '@angular/core';
import { Budget } from '../../model/budget';
import { BudgetService } from '../../services/budget.service';
import { SharedServiceService } from '../../services/shared-service.service';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  budget: Budget[];
  user: any;
  userName: any;

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
  }
}
