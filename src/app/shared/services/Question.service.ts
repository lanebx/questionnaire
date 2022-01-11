import { Injectable } from '@angular/core';

export interface Question {
  id: number;
  description: string;
  answered: boolean;
  answer: string;
  type: 'Single choice' | 'Multiple Choice' | 'Open choice';
  date: string;
  multipleChoice?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class TestService {

  constructor() { }

  allQuestion: Question[] = [
    { id: 1641889825774, description: 'Question 1', answered: true, answer: 'Answer 1', type: 'Open choice', date: '2019-08-15 17:17:30.0', },
    { id: 1641889825775, description: 'Question 2', answered: false, answer: '', type: 'Single choice', date: '2017-08-15 17:17:30.0' },
    { id: 1641889825776, description: 'Question 3', answered: false, answer: '', type: 'Multiple Choice', date: '2016-08-15 17:17:30.0'},
    { id: 1641889825777, description: 'Question 4', answered: false, answer: '', type: 'Open choice', date: '2018-08-15 17:17:30.0' },
    { id: 1641889825778, description: 'Question 5', answered: false, answer: '', type: 'Open choice', date: '2018-09-15 17:17:30.0' },
  ]
}
