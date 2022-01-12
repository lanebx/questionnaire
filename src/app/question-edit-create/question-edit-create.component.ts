import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Question, TestService } from '../shared/services/Question.service';

@Component({
  selector: 'app-question-edit-create',
  templateUrl: './question-edit-create.component.html',
  styleUrls: ['./question-edit-create.component.scss']
})
export class QuestionEditCreateComponent {
  constructor (
    private fb: FormBuilder,
    public testService: TestService,
    private route: Router
  ) { }

  questionForm: FormGroup;

  allTypes = this.testService.allTypes.map((item) => ({...item}));
  editableQuestion: Question;
  type: string = 'Open';
  
  pageTitle: string = 'Edit question';

  ngOnInit(): void {
    const { questionForEdit, statusEditCreate } = this.testService;

    if (questionForEdit) {
      this.editableQuestion = this.testService.questionForEdit;
      this.initializeEditForm()
    } else {
      this.initializeCreateForm()
    }

    this.questionForm.get('type').valueChanges.subscribe(val => {
      this.type = val;
    })
  }

  initializeEditForm() : void {
    console.log(this.testService.statusEditCreate, this.editableQuestion)
    this.questionForm = this.fb.group({
      question: new FormControl(this.editableQuestion.question, Validators.required),
      type: new FormControl(this.editableQuestion.type, Validators.required),
      answerOptions: this.fb.array([this.fb.control('', Validators.required)])
    });;
  }

  initializeCreateForm() : void {
    this.questionForm = this.fb.group({
      question: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      answerOptions: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  /* onSubmit() {
    const selelectedType = this.allTypes.find((item) => this.updatedQuestionType === item.name);
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
  } */

  /* selectType(event: any): void {
    this.updatedQuestionType = event.target.value;
    this.updatedQuestionAnswerOption = this.allTypes
      .find((item) => this.updatedQuestionType === item.name)?.constAnswerOptions;
    this.editableQuestionAnswerOptions = true;
  } */

  get answerOptions(): FormArray {
    return this.questionForm.get('answerOptions') as FormArray;
  }
}

