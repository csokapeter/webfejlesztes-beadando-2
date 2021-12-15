import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  authenticated = false;
  constructor() { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }

  logout(): void{
    const date = new Date();
    date.setTime(date.getTime());
    document.cookie = `jwt = ; Expires = ${date.toUTCString()};SameSite=Strict`;
    this.authenticated = false;
  }

}
