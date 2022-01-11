import { Question } from './../shared/services/Question.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TestService } from '../shared/services/Question.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent {
  constructor(
    private fb: FormBuilder,
    private testService: TestService,
    private route: Router
  ) { }

  questionForm: FormGroup;
  typeQuestion: string;
  selelectedType;
  selelectedAnswerOptions: boolean;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() : void {
    this.questionForm = this.fb.group({
      question: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      answerOptions: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  allTypes = this.testService.allTypes.map((item) => ({...item}));

  onSubmit() {
    const newQuestion = this.selelectedType.constAnswerOptions
      ? {
        ...this.questionForm.value,
        id: Date.now(),
        answered: false,
        answer: '',
        date: (new Date).toISOString(),
        answerOptions: this.selelectedType.answerOptions,
      }
      : {
        ...this.questionForm.value,
        id: Date.now(),
        answered: false,
        answer: '',
        date: (new Date).toISOString(),
      }
    this.testService.allQuestion.push(newQuestion)
    this.initializeForm()
    this.route.navigate(['/']);
  }

  selectType(event: any): void {
    this.typeQuestion = event.target.value;
    this.selelectedType = this.allTypes.find(({ name }) => name === this.typeQuestion)
    this.selelectedAnswerOptions = !this.selelectedType.constAnswerOptions
  }

  addChoice(): void {
    const checkLenth = this.answerOptions.value.every((item: any) => item.length >= 1);

    if (checkLenth) {
      this.answerOptions.push(this.fb.control(''))
    }
  }

  removeChoice(index: number) : void {
    this.answerOptions.removeAt(index)
  }

  get answerOptions(): FormArray {
    return this.questionForm.get('answerOptions') as FormArray;
  }
}
