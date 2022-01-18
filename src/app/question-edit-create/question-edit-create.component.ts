import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataInfo, Question } from '../interfaces/interfaces';
import { TestService } from '../shared/services/Question.service';

@Component({
  selector: 'app-question-edit-create',
  templateUrl: './question-edit-create.component.html',
  styleUrls: ['./question-edit-create.component.scss']
})
export class QuestionEditCreateComponent {
  constructor (
    private fb: FormBuilder,
    public testService: TestService,
    private route: ActivatedRoute,
    private path: Router,
  ) { }

  questionForm: FormGroup;

  editableQuestion: Question;
  type: string;
  id: number | undefined;
  checkId: boolean = true;
  dataInfo: DataInfo;
  answerOptionArray: string[] = [''];
  pageTitle: string;
  disabled: boolean[] = [true, true];

  ngOnInit(): void {
    this.testService.setQuestion()
    this.dataInfo = this.route.snapshot.data as DataInfo;

    if (this.dataInfo.status === 'edit') {
      this.id = +this.route.snapshot.params.id;

      this.checkId = this.testService.questions$.value.some(item => {
        if (item.id === this.id) {
          this.editableQuestion = item;
          this.type = item.type;
          this.pageTitle = 'Edit question';
          this.initializeForm()
        }

        return item.id === this.id;
      });

      this.questionForm.valueChanges.subscribe(val => {
        console.log(val);
      })
    } else {
      this.pageTitle = 'Create question';
      this.initializeForm()
    }

    this.questionForm.get('type').valueChanges.subscribe(val => {
      this.type = val;
    })

    this.questionForm.get('question').valueChanges.subscribe(val =>{
      if (val.length === 0) {
        this.disabled[0] = true;
      } else {
        this.disabled[0] = false;
      }
    })
  }

  initializeForm() : void {
    this.questionForm = this.fb.group({
      question: new FormControl(this.editableQuestion?.question || '', Validators.required),
      type: new FormControl(this.editableQuestion?.type || '', Validators.required),
      answerOptions: this.fb.array([this.fb.control('', Validators.required)])
    }, );
    // {updateOn: 'blur'}
  }

  onSubmit() {
    console.log(this.questionForm.value)

    let newQuestion = {
      ...this.questionForm.value,
      id: Date.now(),
      answered: false,
      answer: '',
      date: (new Date).toISOString(),
      answerOptions: this.answerOptionArray || this.editableQuestion.answerOptions,
    }

    if (this.dataInfo.status === 'edit') {
      newQuestion = {
        ...newQuestion,
        id: this.editableQuestion.id,
        date: this.editableQuestion.date,
      }

      this.testService.editQuestion(this.editableQuestion.id, newQuestion);
    } else {
      this.testService.addQuestion(newQuestion);
    }

    console.log(newQuestion);
    this.path.navigate(['/']);
  }

  get answerOptions(): FormArray {
    return this.questionForm.get('answerOptions') as FormArray;
  }

  onBlur(answerOption: string[]): void {
    this.answerOptionArray = answerOption;

    if (answerOption.length < 2) {
      this.disabled[1] = true;
    } else {
      this.disabled[1] = false;
    }
  }
}

