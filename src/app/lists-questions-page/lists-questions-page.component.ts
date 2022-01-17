import { Question } from 'src/app/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestService } from '../shared/services/Question.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lists-questions-page',
  templateUrl: './lists-questions-page.component.html',
  styleUrls: ['./lists-questions-page.component.scss']
})
export class ListsQuestionsPageComponent implements OnInit {
  formGroup: FormGroup;

  // answeredQuestions$: Observable<any> = this.testService.questions$.pipe(
  //   map((qustions: any[]) => {
  //     return qustions.filter(item => item.answered)
  //   })
  // )

  // unansweredQuestions$: Observable<any> = this.testService.questions$.pipe(
  //   map((qustions: any[]) => {
  //     return qustions.filter(item => !item.answered)
  //   })
  // )

  ngOnInit(): void {
    this.testService.setQuestion()

    this.formGroup = new FormGroup({
      answer: new FormControl('', Validators.required)
     });
  }

  constructor(
    private testService: TestService,
  ) { }

  get answeredQuestions() {
    const answeredQuestions = this.testService.questions$.value.filter(item => item.answered);
    answeredQuestions.sort((a, b) => <any>new Date(b.dateOfAnswer) - <any>new Date(a.dateOfAnswer));

    return answeredQuestions;
  }

  get unansweredQuestions() {
    const unansweredQuestions = this.testService.questions$.value.filter(item => !item.answered);
    unansweredQuestions.sort((a, b) => <any>new Date(b.date) - <any>new Date(a.date));

    return unansweredQuestions;
  }

  clearAnswer(id: number) {
    this.testService.clearAnswer(id);
  }
}
