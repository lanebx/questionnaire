import { Question } from 'src/app/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestService } from '../shared/services/Question.service';

@Component({
  selector: 'app-lists-questions-page',
  templateUrl: './lists-questions-page.component.html',
  styleUrls: ['./lists-questions-page.component.scss']
})
export class ListsQuestionsPageComponent implements OnInit {
  formGroup: FormGroup;
  questionsList: Question[];

  ngOnInit(): void {
    this.questionsList = this.testService.allQuestion;

    this.formGroup = new FormGroup({
      answer: new FormControl('', Validators.required)
     });
  }

  constructor(
    private testService: TestService,
  ) { }

  get answeredQuestions() {
    const answeredQuestions = this.questionsList.filter(item => item.answered);
    answeredQuestions.sort((a, b) => <any>new Date(b.dateOfAnswer) - <any>new Date(a.dateOfAnswer));

    return answeredQuestions;
  }

  get unansweredQuestions() {
    const unansweredQuestions = this.questionsList.filter(item => !item.answered);
    unansweredQuestions.sort((a, b) => <any>new Date(b.date) - <any>new Date(a.date));

    return unansweredQuestions;
  }

  clearAnswer(question: Question) {
    question.answer = '';
    question.answered = false;
    question.dateOfAnswer = '';
  }

}
