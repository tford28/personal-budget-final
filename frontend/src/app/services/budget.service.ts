import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Budget } from '../model/budget';

const apiUrl = 'http://localhost:3000/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor(private httpClient: HttpClient) {}

  setBudget(budget) {
    localStorage.setItem('budget', JSON.stringify(budget));
  }

  getBudgets(): Observable<Budget[]> {
    return this.httpClient.get<Budget[]>(apiUrl + '/allBudgets');
  }

  getBudgetById(): Observable<Budget> {
    let jobj = JSON.parse(localStorage.getItem('budget'));
    return this.httpClient.get<Budget>(apiUrl + '/' + jobj._id);
  }

  getBudgetByUser(username:String): Observable<Budget[]> {
    return this.httpClient.get<Budget[]>(apiUrl + '/username/' + username);
  }

  registerBudget(budget: Budget): Observable<Budget> {
    return this.httpClient.post<Budget>(apiUrl + '/register', budget);
  }

  updateBudgets(budget: Budget): Observable<Budget> {
    localStorage.removeItem('budget');
    return this.httpClient.put<Budget>(apiUrl + '/update/' + budget._id, budget);
  }

  deleteBudgets(budget: Budget): Observable<Budget> {
    return this.httpClient.delete<Budget>(apiUrl + '/delete/' + budget._id);
  }
}
