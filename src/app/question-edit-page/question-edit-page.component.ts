import { Question } from './../shared/services/Question.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestService } from '../shared/services/Question.service';

@Component({
  selector: 'app-question-edit-page',
  templateUrl: './question-edit-page.component.html',
  styleUrls: ['./question-edit-page.component.scss']
})
export class QuestionEditPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public testService: TestService,
    private route: Router
  ) { }

  editQuestionForm: FormGroup;
  typeQuestion: string;
  selelectedType;
  selelectedAnswerOptions: boolean;

  allTypes = this.testService.allTypes.map((item) => ({...item}));

  selectQuestion: Question = this.testService.allQuestion
      .find(({ id }) => id === this.testService.indexForEdit);

  chosedType: string = this.selectQuestion.type;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() : void {
    if (this.selectQuestion) {
      this.editQuestionForm = this.fb.group({
        question: new FormControl(this.selectQuestion.question, Validators.required),
        type: new FormControl(this.selectQuestion.type, Validators.required),
        answerOptions: this.fb.array([this.fb.control('', Validators.required)])
      });
    }
  }

  onSubmit() {
    const newQuestion = this.selelectedType.constAnswerOptions
      ? {
        ...this.editQuestionForm.value,
        id: Date.now(),
        answered: false,
        answer: '',
        date: (new Date).toISOString(),
        answerOptions: this.selelectedType.answerOptions,
      }
      : {
        ...this.editQuestionForm.value,
        id: Date.now(),
        answered: false,
        answer: '',
        date: (new Date).toISOString(),
      }

    this.testService.allQuestion = this.testService.allQuestion
      .map((item) => this.selectQuestion.id === item.id ? newQuestion : item)

    console.log(newQuestion)
    this.route.navigate(['/']);
  }

  selectType(event: any): void {
    this.typeQuestion = event.target.value;
    this.selelectedType = this.allTypes.find(({ name }) => name === this.typeQuestion)
    this.selelectedAnswerOptions = !this.selelectedType.constAnswerOptions
  }

  addChoice(): void {
    if (this.answerOptions.value.every((item: any) => item.length >= 1)) {
      this.answerOptions.push(this.fb.control(''))
    }
  }

  removeChoice(index: number) : void {
    this.answerOptions.removeAt(index);
  }

  get answerOptions(): FormArray {
    return this.editQuestionForm.get('answerOptions') as FormArray;
  }
}
