import { TestService } from '../shared/services/Question.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-management-page',
  templateUrl: './question-management-page.component.html',
  styleUrls: ['./question-management-page.component.scss']
})
export class QuestionManagementPageComponent implements OnInit {
  constructor(public testService: TestService, private route:Router) { }

  filter: 'all' | 'answered' | 'notAnswered' = 'all';

  ngOnInit(): void {
    this.testService.setQuestion();

  }

  get questions() {
    const newQuestions = this.testService.questions$.value.map(a => ({...a}))
    if (this.filter === 'all') {
      newQuestions.sort((a, b) => <any>new Date(b.date) - <any>new Date(a.date))

      return newQuestions
    }

    return newQuestions
      .filter(item => this.filter === 'answered' ? item.answered : !item.answered)
      .sort((a, b) => <any>new Date(b.date) - <any>new Date(a.date) )
  }

  removeFromList(idForDelete: number) {
    this.testService.removeQuestion(idForDelete);
  }

  getQuestionForEditing(id: number) {
    this.route.navigate(['/edit', id]);
  }
}
