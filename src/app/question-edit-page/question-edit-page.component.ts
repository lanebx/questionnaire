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

  allTypes = this.testService.allTypes.map((item) => ({...item}));
  editableQuestion: Question = this.testService.questionForEdit;
  editableQuestionAnswerOptions: boolean;
  updatedQuestionAnswerOption: boolean = true;
  updatedQuestionType: string = this.editableQuestion.type;

  ngOnInit(): void {
    this.initializeForm();

    if (this.editableQuestion) {
      this.editableQuestionAnswerOptions = this.allTypes.find((item) => this.editableQuestion.type === item.name)?.constAnswerOptions;
    }
  }

  initializeForm() : void {
    if (this.editableQuestion) {
      this.editQuestionForm = this.fb.group({
        question: new FormControl(this.editableQuestion.question, Validators.required),
        type: new FormControl(this.editableQuestion.type, Validators.required),
        answerOptions: this.fb.array([this.fb.control('', Validators.required)])
      });
    }
  }

  onSubmit() {
    const selelectedType =  this.allTypes.find((item) => this.updatedQuestionType === item.name);
    let answerOptions;

    if(selelectedType) {
      answerOptions = selelectedType.answerOptions;
    }

    const newQuestion = this.updatedQuestionAnswerOption
      ? {
        ...this.editQuestionForm.value,
        id: Date.now(),
        answered: false,
        answer: '',
        date: (new Date).toISOString(),
        answerOptions: answerOptions,
      }
      : {
        ...this.editQuestionForm.value,
        id: Date.now(),
        answered: false,
        answer: '',
        date: (new Date).toISOString(),
      }

    this.testService.allQuestion = this.testService.allQuestion
      .map((item) => this.editableQuestion.id === item.id ? newQuestion : item)

    console.log(newQuestion)
    this.route.navigate(['/']);
  }

  selectType(event: any): void {
    this.updatedQuestionType = event.target.value;
    this.updatedQuestionAnswerOption = this.allTypes
      .find((item) => this.updatedQuestionType === item.name)?.constAnswerOptions;
    this.editableQuestionAnswerOptions = true;
  }

  addChoice(): void {
    if (this.answerOptions.value.every((item: any) => item.length >= 1)) {
      this.answerOptions.push(this.fb.control(''))
    }
  }

  removeChoice(index: number) : void {
    if (this.answerOptions.value.length > 1) {
      this.answerOptions.removeAt(index);
    }
  }

  get answerOptions(): FormArray {
    return this.editQuestionForm.get('answerOptions') as FormArray;
  }
}
