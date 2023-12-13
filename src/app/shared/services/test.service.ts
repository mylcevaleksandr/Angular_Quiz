import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {QuizListType} from "../../../types/quiz-list.type";
import {TestResultType} from "../../../types/test-result.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {QuizType} from "../../../types/quiz.type";
import {UserResultType} from "../../../types/user-result.type";
import {PassTestType} from "../../../types/pass-test.type";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) {
  }

  getTests(): Observable<QuizListType[]> {
    return this.http.get<QuizListType[]>(environment.apiHost + 'tests')
  }

  getUserResult(userId: number): Observable<DefaultResponseType | TestResultType[]> {
    return this.http.get<DefaultResponseType | TestResultType[]>(environment.apiHost + 'tests/results?userId=' + userId)
  }

  getQuiz(id: number | string): Observable<DefaultResponseType | QuizType> {
    return this.http.get<DefaultResponseType | QuizType>(environment.apiHost + 'tests/' + id)
  }

  passQuiz(id: number | string, userId: number | string, userResult: UserResultType[]): Observable<DefaultResponseType | PassTestType> {
    return this.http.post<DefaultResponseType | PassTestType>(environment.apiHost + 'tests/' + id + '/pass',
      {
        userId: userId,
        results: userResult
      })
  }

  getResult(id: number | string, userId: number | string): Observable<DefaultResponseType | PassTestType> {
    return this.http.get<DefaultResponseType | PassTestType>(environment.apiHost + 'tests/' + id + '/result?userId=' + userId)
  }

}

