import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Question, TestService } from '../shared/services/Question.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent {
  constructor(
    private fb: FormBuilder,
    private testService: TestService,
    private route:Router
  ) { }

  questionForm: FormGroup;
  chosedType: string;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() : void {
    this.questionForm = this.fb.group({
      question: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      answerType: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  allTypes = this.testService.allTypes.map((item) => ({...item}));


  onSubmit() {
    const newQuestion = this.questionForm.get('question').value === 'Multiple'
      ? {
        ...this.questionForm.value,
        id: Date.now(),
        answered: false,
        answer: '',
        date: (new Date).toISOString(),
      }
      : {
        ...this.questionForm.value,
        id: Date.now(),
        answered: false,
        answer: '',
        date: (new Date).toISOString(),
        answerType: this.allTypes.find((type) => type.name === this.chosedType)?.answerType,
      }

    this.testService.allQuestion.push(newQuestion)
    this.initializeForm()
    this.route.navigate(['/']);
  }

  selectType(event: any): void {
    this.chosedType = event.target.value
  }

  addChoice(): void {
    if (this.answerType.value.every((item: any) => item.length >= 1)) {
      this.answerType.push(this.fb.control(''))
    }
  }

  removeChoice(index: number) : void {
    this.answerType.removeAt(index)
  }

  get answerType(): FormArray {
    return this.questionForm.get('answerType') as FormArray;
  }
}
