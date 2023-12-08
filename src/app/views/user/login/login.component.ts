import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {LoginResponseType} from "../../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[0-9a-zA-Z]{8,30}$'), Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {
  }

  ngOnInit() {

  }

  login() {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (data: LoginResponseType) => {
            if (data.error || !data.accessToken || !data.refreshToken || !data.fullName || !data.userId) {
              // this.router.navigate(['/']);
              this.snackbar.open('Ошибка авторизации')
              throw new Error(data.message ? data.message : 'Login failed');
            }

            this.router.navigate(['/choice'])
          },
          error: (error: HttpErrorResponse) => {
            // this.router.navigate(['/'])
            console.log(error)
            this.snackbar.open('Ошибка авторизации')
            throw new Error(error.error.message)
          }
        })
    }
  }

}
