import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Budget } from './../../model/budget';
import { BudgetService } from './../../services/budget.service';
import { Router } from '@angular/router';
import { SharedServiceService } from '../../services/shared-service.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private brs: BudgetService,
    private router: Router,
    private sharedService: SharedServiceService
  ) {}
  budgets: Budget = new Budget();
  user: any;
  userName: any;

  ngOnInit(): void {
    this.user = localStorage.getItem('JWT_Token');
    this.user = jwt_decode(this.user);
    console.log(this.user.userType);
    this.userName = this.user.username;
    console.log(this.userName);
    this.budgets.username = this.userName;
  }

  registerBudget(budgets: Budget) {
    this.brs.registerBudget(budgets).subscribe();
    alert('Budgets Added!');
    this.router.navigate(['/viewbudget']);
  }

}
