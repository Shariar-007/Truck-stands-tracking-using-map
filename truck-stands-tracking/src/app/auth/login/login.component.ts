import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {ErrorStateMatcher} from "@angular/material/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });


constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  loggedin(): void {
    this.authService.login(this.loginForm.value);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
