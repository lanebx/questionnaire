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

  allTypes = [
    { id: 1, name: 'Single', answerType: ['Yes', 'No'] },
    { id: 2, name: 'Multiple', answerType: [''] },
    { id: 3, name: 'Open', answerType: '' },
  ];

  onSubmit() {
    let newQuestion: Question;

    if (this.questionForm.get('question').value === 'Multiple') {
      newQuestion = {
        id: Date.now(),
        question: this.questionForm.get('question').value,
        answered: false,
        answer: '',
        type: this.questionForm.get('type').value,
        date: (new Date).toISOString(),
        answerType: this.questionForm.get('multipleChoice').value,
      }
    } else {
      newQuestion = {
        id: Date.now(),
        question: this.questionForm.get('question').value,
        answered: false,
        answer: '',
        type: this.questionForm.get('type').value,
        date: (new Date).toISOString(),
        answerType: this.allTypes.find((type) => type.name === this.chosedType)?.answerType,
      }
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
