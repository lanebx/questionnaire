import { Component } from '@angular/core';

export interface Question {
  description: string;
  answered: boolean;
  answer: string;
  types: 'singleChoice' | 'multipleChoice' | 'Open';
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
    { description: 'Question 1', answered: true, answer: 'Answer 1', types: 'Open', date: '2019-08-15 17:17:30.0', },
    { description: 'Question 2', answered: false, answer: '', types: 'singleChoice', date: '2017-08-15 17:17:30.0' },
    { description: 'Question 3', answered: false, answer: '', types: 'multipleChoice', date: '2016-08-15 17:17:30.0'},
    { description: 'Question 4', answered: false, answer: '', types: 'Open', date: '2018-08-15 17:17:30.0' },
  ];

  filter: 'all' | 'answered' | 'notAnswered' = 'all';

  get questions() {
    const newQuestions = this.allQuestion.map(a => ({...a}))
    if (this.filter === 'all') {
      newQuestions.sort((a, b) => <any>new Date(b.date) - <any>new Date(a.date))

      return newQuestions
    }

    return this.allQuestion
      .filter(item => this.filter === 'answered' ? item.answered : !item.answered)
      .sort((a, b) => <any>new Date(b.date) - <any>new Date(a.date) )
  }

}
