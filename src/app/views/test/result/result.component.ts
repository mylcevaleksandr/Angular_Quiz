import {Component, OnInit} from '@angular/core';
import {TestService} from "../../../shared/services/test.service";
import {AuthService} from "../../../core/auth/auth.service";
import {UserInfoType} from "../../../../types/user-info.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {PassTestType} from "../../../../types/pass-test.type";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  result: string = ''

  constructor(private testService: TestService, private authService: AuthService) {
  }

  ngOnInit() {
    const userInfo: UserInfoType | null = this.authService.getUserInfo()
    const quizId: string | null = sessionStorage.getItem('quizId')

    if (userInfo && quizId) {
      this.testService.getResult(quizId, userInfo.userId)
        .subscribe(result => {
          if (result) {
            if ((result as DefaultResponseType).error !== undefined) {
              throw new Error((result as DefaultResponseType).message);
            }
            this.result = (result as PassTestType).score + '/' + (result as PassTestType).total;
          }
        })
    }
  }
}
