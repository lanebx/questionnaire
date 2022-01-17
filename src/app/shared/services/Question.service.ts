import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  // constructor(private http) { }

  Question: Question[] = [
    { id: 1641889825774, question: 'Question 1', answered: true, answer: 'Answer 1', type: 'Open', date: '2019-01-26T13:51:50.417Z', answerOptions: [], dateOfAnswer: '2019-01-26T13:51:50.417Z' },
    { id: 1641889825775, question: 'Question 2', answered: false, answer: '', type: 'Single', date: '2018-01-26T13:51:50.417Z', answerOptions: ['add 3', 'add 4'], dateOfAnswer: '' },
    { id: 1641889825776, question: 'Question 3', answered: false, answer: '', type: 'Multiple', date: '2012-01-26T13:51:50.417Z', answerOptions: ['add 1', 'add 2', 'add 3'], dateOfAnswer: '' },
    { id: 1641889825777, question: 'Question 4', answered: false, answer: '', type: 'Open', date: '2021-01-26T13:51:50.417Z', answerOptions: [], dateOfAnswer: '' },
    { id: 1641889825778, question: 'Question 5', answered: false, answer: '', type: 'Open', date: '2021-01-26T13:51:50.417Z', answerOptions: [], dateOfAnswer: '' },
  ];

  questions$: BehaviorSubject<Question[]> = new BehaviorSubject(this.Question);

  allTypes = [
    { id: 1, name: 'Single' },
    { id: 2, name: 'Multiple' },
    { id: 3, name: 'Open' },
  ];

  setQuestion() {
    if (!localStorage.getItem('Questions')) {
      localStorage.setItem('Questions', JSON.stringify(this.Question))
      this.questions$.next(JSON.parse(localStorage.getItem('Questions')));
    } {
      this.questions$.next(JSON.parse(localStorage.getItem('Questions')));
    }
  }

  addQuestion(newQuestion: Question) {
    let newData = [...this.questions$.value, newQuestion];
    this.questions$.next(newData);
    this.updateQuestion();
  }

  removeQuestion(id: number) {
    this.questions$.next(this.questions$.value.filter((question) => id !== question.id));
    this.updateQuestion();
  }

  updateQuestion() {
    localStorage.setItem('Questions', JSON.stringify(this.questions$.value));
  }

  addAnswer(id: number, answer: string | string[]) {
    this.questions$.next(this.questions$.value.map(question => {
      if (id === question.id) {
        return {
          ...question,
          answered: true,
          dateOfAnswer: (new Date).toISOString(),
          answer: answer,
        }
      }

      return question
    }))

    this.updateQuestion();
  }

  clearAnswer(id: number) {
    this.questions$.next(this.questions$.value.map((item) => {
      if (item.id === id){
        return {
          ...item,
          answer: [],
          answered: false,
          dateOfAnswer: '',
        }
      }

      return item;
    }))
    this.updateQuestion();
  }

  editQuestion(oldQuestionId, newQuestion) {
    this.questions$.next(this.questions$.value.map((item) => oldQuestionId === item.id ? newQuestion : item));
    this.updateQuestion();
  }
}
