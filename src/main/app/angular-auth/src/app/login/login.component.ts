import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {

   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  submit(): void{
    this.http.post(`http://localhost:8080/users/signin?username=${this.form.value['username']}&password=${this.form.value['password']}`, null, {responseType: 'text', withCredentials: true})
      .subscribe( res => {
        const date = new Date();
        date.setTime(date.getTime()+300000);
        document.cookie = `jwt = ${res}; Expires = ${date.toUTCString()};SameSite=Strict`;
        this.router.navigate(['/']);
      });
  }
}
