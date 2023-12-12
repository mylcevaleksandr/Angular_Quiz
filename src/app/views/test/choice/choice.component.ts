import {Component, OnInit} from '@angular/core';
import {TestService} from "../../../shared/services/test.service";
import {QuizListType} from "../../../../types/quiz-list.type";
import {TestResultType} from "../../../../types/test-result.type";
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {UserInfoType} from "../../../../types/user-info.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {
  public quizzes: QuizListType[] = [];

  constructor(private testService: TestService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.testService.getTests()
      .subscribe((result: QuizListType[]) => {
        this.quizzes = result
        const userInfo: UserInfoType | null = this.authService.getUserInfo()
        if (userInfo) {
          this.testService.getUserResult(userInfo.userId)
            .subscribe((result: DefaultResponseType | TestResultType[]) => {
              if (result) {
                if ((result as DefaultResponseType).error !== undefined) {
                  throw new Error((result as DefaultResponseType).message);
                }
                const testResult: TestResultType[] = result as TestResultType[];
                if (testResult) {
                  this.quizzes = this.quizzes.map((quiz: QuizListType) => {
                    const foundItem: TestResultType | undefined = testResult.find((item: TestResultType): boolean => item.testId === quiz.id);
                    if (foundItem) {
                      quiz.result = foundItem.score + '/' + foundItem.total;
                    }
                    console.log(quiz)
                    return quiz
                  });
                }
              }
            })
        }
      });
  }

  public chooseQuiz(id: number): void {
    this.router.navigate(['test', id])
  }
}
