import { Question } from './../shared/services/Question.service';
import { TestService } from '../shared/services/Question.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-management-page',
  templateUrl: './question-management-page.component.html',
  styleUrls: ['./question-management-page.component.scss']
})
export class QuestionManagementPageComponent {
  constructor(public testService: TestService, private route:Router) { }

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

  removeFromList(idForDelete) {
    this.testService.allQuestion = this.testService.allQuestion.filter((question) => idForDelete !== question.id)
  }

  getQuestionForEditing(question: Question) {
    this.testService.questionForEdit = question;
    this.testService.statusEditCreate = 'edit'
    this.route.navigate(['/question']);
  }
}
