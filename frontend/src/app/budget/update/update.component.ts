import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from './../../services/shared-service.service';
import { Budget } from './../../model/budget';
import { BudgetService } from './../../services/budget.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(private brs: BudgetService, private router: Router, private sharedService: SharedServiceService) { }

  budgets: Budget = new Budget();

  ngOnInit(): void {
    this.brs.getBudgetById().subscribe((budget) => {
      this.budgets = budget;
      console.log(budget);
    });
  }

  updateBudget(budget: Budget) {
    this.brs.updateBudgets(budget).subscribe();
    alert('Successfully Updated!');
    console.log(JSON.stringify(budget));
    this.router.navigate(['/viewbudget']);
  }

}
