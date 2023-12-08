import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SignupResponseType} from "../../../../types/signup-response.type";
import {LoginResponseType} from "../../../../types/login-response.type";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.pattern(/^[А-Я][а-я]+\s*$/), Validators.required]),
    lastName: new FormControl('', [Validators.pattern(/^[А-Я][а-я]+\s*$/), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[0-9a-zA-Z]{8,30}$'), Validators.required]),
    agree: new FormControl(false, [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
  }

  signup() {
    if (this.signupForm.valid &&
      this.signupForm.value.name &&
      this.signupForm.value.lastName &&
      this.signupForm.value.email &&
      this.signupForm.value.password) {
      this.authService.signup(this.signupForm.value.name, this.signupForm.value.lastName, this.signupForm.value.email, this.signupForm.value.password)
        .subscribe({
          next: (data: SignupResponseType) => {
            if (data.error || !data.user) {
              this.snackbar.open('Ошибка авторизации')
              throw new Error(data.message ? data.message : 'Signup failed');
            }
            if (this.signupForm.valid && this.signupForm.value.email && this.signupForm.value.password) {
              this.authService.login(this.signupForm.value.email, this.signupForm.value.password)
                .subscribe({
                  next: (data: LoginResponseType) => {
                    if (data.error || !data.accessToken || !data.refreshToken || !data.fullName || !data.userId) {
                      this.snackbar.open('Ошибка авторизации')
                      throw new Error(data.message ? data.message : 'Login failed');
                    }
                    this.router.navigate(['/'])
                  },
                  error: (error: HttpErrorResponse) => {
                    console.log(error)
                    this.snackbar.open('Ошибка авторизации')
                    throw new Error(error.error.message)
                  }
                })
            }
          },
          error: (error: HttpErrorResponse) => {
            // this.router.navigate(['/'])
            console.log(error)
            this.snackbar.open('Ошибка регистрации')
            throw new Error(error.error.message)
          }
        })
    }
  }
}
