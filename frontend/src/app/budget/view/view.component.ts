import { Component, OnInit } from '@angular/core';
import { Budget } from '../../model/budget';
import { BudgetService } from '../../services/budget.service';
import { SharedServiceService } from '../../services/shared-service.service';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

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
    });
  }

  updateBudget(budget: Budget) {
    this.brs.setBudget(budget);
    this.router.navigate(['/updatebudget']);
  }

  deleteBudget(budget: Budget) {
    this.brs.deleteBudgets(budget).subscribe();
    alert(' Successfully deleted!');
    location.reload();
    console.log(JSON.stringify(budget));
  }
}
