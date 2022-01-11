import { TestService } from '../shared/services/Question.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-question-management-page',
  templateUrl: './question-management-page.component.html',
  styleUrls: ['./question-management-page.component.scss']
})
export class QuestionManagementPageComponent {
  constructor(private testService: TestService) { }

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

  getIdForEditing(id: number) {
    this.testService.indexForEdit = id;
  }
}
