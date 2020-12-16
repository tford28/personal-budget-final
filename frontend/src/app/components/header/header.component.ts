import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  user: any;

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('JWT_Token');
  }
}
