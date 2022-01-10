import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {

  constructor() { }

  allQuestion = [
    { id: 1, description: 'Question 1', answered: true, answer: 'Answer 1', type: 'Open choice', date: '2019-08-15 17:17:30.0', },
    { id: 2, description: 'Question 2', answered: false, answer: '', type: 'Single choice', date: '2017-08-15 17:17:30.0' },
    { id: 3, description: 'Question 3', answered: false, answer: '', type: 'Multiple Choice', date: '2016-08-15 17:17:30.0'},
    { id: 4, description: 'Question 4', answered: false, answer: '', type: 'Open choice', date: '2018-08-15 17:17:30.0' },
    { id: 5, description: 'Question 5', answered: false, answer: '', type: 'Open choice', date: '2018-09-15 17:17:30.0' },
  ]

  edit(idForEdit) {
    
  }

}
