import { Injectable } from '@angular/core';

export interface Question {
  id: number;
  question: string;
  answered: boolean;
  answer: string;
  type: 'Single' | 'Multiple' | 'Open';
  date: string;
  dateOfAnswer: string;
  answerOptions: string[] | string;
}

/* export enum allTypes {
  Single = 1,
  Multiple = 2,
  Open = 3,
}; */

@Injectable({
  providedIn: 'root',
})
export class TestService {

  constructor() { }

  changeAnswerOptions: string[] = [];

  allQuestion: Question[] = [
    { id: 1641889825774, question: 'Question 1', answered: true, answer: 'Answer 1', type: 'Open', date: '2019-01-26T13:51:50.417Z', answerOptions: '', dateOfAnswer: '2019-01-26T13:51:50.417Z' },
    { id: 1641889825775, question: 'Question 2', answered: false, answer: '', type: 'Single', date: '2018-01-26T13:51:50.417Z', answerOptions: '', dateOfAnswer: '' },
    { id: 1641889825776, question: 'Question 3', answered: false, answer: '', type: 'Multiple', date: '2012-01-26T13:51:50.417Z', answerOptions: '', dateOfAnswer: '' },
    { id: 1641889825777, question: 'Question 4', answered: false, answer: '', type: 'Open', date: '2021-01-26T13:51:50.417Z', answerOptions: '', dateOfAnswer: '' },
    { id: 1641889825778, question: 'Question 5', answered: false, answer: '', type: 'Open', date: '2021-01-26T13:51:50.417Z', answerOptions: '', dateOfAnswer: '' },
  ];

  allTypes = [
    { id: 1, name: 'Single' },
    { id: 2, name: 'Multiple' },
    { id: 3, name: 'Open' },
  ];
}
