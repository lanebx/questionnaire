import { Question } from './../shared/services/Question.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../shared/services/Question.service';

@Component({
  selector: 'app-lists-questions-page',
  templateUrl: './lists-questions-page.component.html',
  styleUrls: ['./lists-questions-page.component.scss']
})
export class ListsQuestionsPageComponent implements OnInit {
  newQuestions: Question[] = this.testService.allQuestion.map(a => ({...a}))

  ngOnInit(): void {
  }

  constructor(private testService: TestService, private route:Router) { }

  get answeredQuestions() {
    return this.newQuestions.filter(item => item.answered)
  }

  get unansweredQuestions() {
    return this.newQuestions.filter(item => !item.answered)
  }
}
