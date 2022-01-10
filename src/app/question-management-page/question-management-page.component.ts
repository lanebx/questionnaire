import { Component } from '@angular/core';

export interface Question {
  id: number;
  description: string;
  answered: boolean;
  answer: string;
  type: 'Single choice' | 'Multiple Choice' | 'Open choice';
  singleChoice?: string[];
  multipleChoice?: string[];
  date: string;
}

@Component({
  selector: 'app-question-management-page',
  templateUrl: './question-management-page.component.html',
  styleUrls: ['./question-management-page.component.scss']
})
export class QuestionManagementPageComponent {

  constructor() { }

  allQuestion = [
    { id: 1, description: 'Question 1', answered: true, answer: 'Answer 1', type: 'Open choice', date: '2019-08-15 17:17:30.0', },
    { id: 2, description: 'Question 2', answered: false, answer: '', type: 'Single choice', date: '2017-08-15 17:17:30.0' },
    { id: 3, description: 'Question 3', answered: false, answer: '', type: 'Multiple Choice', date: '2016-08-15 17:17:30.0'},
    { id: 4, description: 'Question 4', answered: false, answer: '', type: 'Open choice', date: '2018-08-15 17:17:30.0' },
    { id: 5, description: 'Question 5', answered: false, answer: '', type: 'Open choice', date: '2018-09-15 17:17:30.0' },
  ];

  filter: 'all' | 'answered' | 'notAnswered' = 'all';

  get questions() {
    const newQuestions = this.allQuestion.map(a => ({...a}))
    if (this.filter === 'all') {
      newQuestions.sort((a, b) => <any>new Date(b.date) - <any>new Date(a.date))

      return newQuestions
    }

    return newQuestions
      .filter(item => this.filter === 'answered' ? item.answered : !item.answered)
      .sort((a, b) => <any>new Date(b.date) - <any>new Date(a.date) )
  }

  removeFromList(idFoDelete) {
    this.allQuestion = this.allQuestion.filter((question) => idFoDelete !== question.id)
  }

  editQuestion(question) {
    
  }
}
