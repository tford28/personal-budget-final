import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Users } from './../../model/users';
import jwt_decode from 'jwt-decode';
import { SharedServiceService } from './../../services/shared-service.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: Users = new Users();
  error: any = {};
  data: any = {};
  constructor(private urs: UserService, private router: Router, private sharedService: SharedServiceService) {}

  ngOnInit(): void {
    this.urs.getUsers().subscribe((users) => {
      console.log(users);
    });
  }

  loginUser() {
    this.urs.loginUser(this.user).subscribe(
      (res:any) => {
        console.log(JSON.stringify(res));
        this.data = jwt_decode(res.token);

        localStorage.setItem('JWT_Token', res.token);
        var result = localStorage.getItem('JWT_Token');
        console.log(jwt_decode(result));

        if (this.data.userType === 'normal') {
          this.sharedService.sharedSubject.next('normal');
          this.sharedService.sharedSubject.subscribe((d) => {
            console.log(d);
          });
          this.router.navigate(['/home']);
        } else if (this.data.userType === 'admin') {
          this.sharedService.sharedSubject.next('admin');
          this.sharedService.sharedSubject.subscribe((d) => {
            console.log(d);
          });
          this.router.navigate(['/home']);
        } else {
          this.sharedService.sharedSubject.next('guest');
          this.sharedService.sharedSubject.subscribe((d) => {
            console.log(d);
          });
          this.router.navigate(['/login']);
        }
      },
      (err) => {
        this.error = err.error;
      }
    );
   }
}
