import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message: String;

  constructor() { }

  ngOnInit(): void {

    if(document.cookie.length === 0){
      this.message = "Please log in!";
      Emitters.authEmitter.emit(false);
    } else {
      this.message = "";
      Emitters.authEmitter.emit(true);
    }
  }

}
