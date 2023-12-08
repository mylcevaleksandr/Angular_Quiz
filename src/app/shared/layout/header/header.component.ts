import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {UserInfoType} from "../../../../types/user-info.type";
import {LogoutResponseType} from "../../../../types/logout-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo: UserInfoType | null = null

  constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {

    if (this.authService.getLoggedIn()) {
      this.userInfo = this.authService.getUserInfo()
    }
  }

  ngOnInit() {
    this.authService.isLogged$
      .subscribe((isLoggedIn:boolean ):void=> {
        this.userInfo = isLoggedIn ? this.authService.getUserInfo() : null
      })
  }

  logout() {
    this.authService.logout()
      .subscribe({
        next: (value: LogoutResponseType) => {
          if (value && !value.error) {
            this.authService.removeTokens();
            this.authService.removeUserInfo()
            this.snackbar.open('Выход из системы успешный')
            this.router.navigate(['/'])
          } else {
            this.snackbar.open('Ошибка выхода из системы')

          }
        },
        error: (err: HttpErrorResponse) => {
          this.snackbar.open('Ошибка выхода из системы')
        }
      })
  }
}
