import { Component, OnInit } from '@angular/core';
import { Users } from './../../model/users';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: Users = new Users();
  error: any = {};

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {}

    registerUser(){
      this.userService.registerUser(this.user).subscribe((res) => {
      this. router.navigate(['/login']);
      },
      (err) => {
        this.error = err.error;
        this.router.navigate(['/register']);
      }
      );
    }
}
