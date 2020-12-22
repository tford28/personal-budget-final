import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../model/users';
import jwt_decode from 'jwt-decode';

const api = 'http://localhost:3000/users/';

Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(api + 'allUsers');
  }

  addUser(user: Users): Observable<Users>{
    return this.httpClient.post<Users>(api + 'addUser', user);
  }

  loginUser(user: Users): Observable<Users>{
    return this.httpClient.post<Users>(api + 'login' , user);
  }
}
