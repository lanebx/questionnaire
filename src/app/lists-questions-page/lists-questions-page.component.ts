import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../shared/services/Question.service';

@Component({
  selector: 'app-lists-questions-page',
  templateUrl: './lists-questions-page.component.html',
  styleUrls: ['./lists-questions-page.component.scss']
})
export class ListsQuestionsPageComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor(private testService: TestService, private route:Router) { }

  filter: 'all' | 'answered' | 'notAnswered' = 'all';

  get questions() {
    const newQuestions = this.testService.allQuestion.map(a => ({...a}))
    if (this.filter === 'all') {
      newQuestions.sort((a, b) => <any>new Date(b.date) - <any>new Date(a.date))

      return newQuestions
    }

    return newQuestions
      .filter(item => this.filter === 'answered' ? item.answered : !item.answered)
      .sort((a, b) => <any>new Date(b.date) - <any>new Date(a.date) )
  }

}
