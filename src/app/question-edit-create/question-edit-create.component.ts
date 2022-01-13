import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, TestService } from '../shared/services/Question.service';
import { switchMap } from 'rxjs/operators';

export interface DataInfo {
  status: string;
}

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

  allTypes = this.testService.allTypes.map((item) => ({...item}));
  editableQuestion: Question;
  type: string;
  id: number | undefined;
  checkId: boolean = true;
  dataInfo: DataInfo;
  
  pageTitle: string;

  ngOnInit(): void {
    this.route
      .data
      .subscribe(data => this.dataInfo = data as DataInfo);

    if (this.dataInfo.status === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => params.getAll('id'))
      ).subscribe(data => this.id = +data);

      this.checkId = this.testService.allQuestion.some(item => {
        if (item.id === this.id) {
          this.editableQuestion = item;
          this.type = item.type;
          this.pageTitle = 'Edit question';
          this.initializeEditForm()
        }

        return item.id === this.id;
      });
    } else {
      this.pageTitle = 'Create question';
      this.initializeCreateForm()
    }

    this.questionForm.get('type').valueChanges.subscribe(val => {
      this.type = val;
    })
  }

  initializeEditForm() : void {
    this.questionForm = this.fb.group({
      question: new FormControl(this.editableQuestion.question, Validators.required),
      type: new FormControl(this.editableQuestion.type, Validators.required),
      answerOptions: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  initializeCreateForm() : void {
    this.questionForm = this.fb.group({
      question: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      answerOptions: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  onSubmit() {
    let newQuestion = {
      ...this.questionForm.value,
      id: Date.now(),
      answered: false,
      answer: '',
      date: (new Date).toISOString(),
      answerOptions: this.testService.changeAnswerOptions,
    }

    if (this.dataInfo.status === 'edit') {
      newQuestion = {
        ...newQuestion,
        id: this.editableQuestion.id,
        date: this.editableQuestion.date,
      }
      this.testService.allQuestion = this.testService.allQuestion
      .map((item) => this.editableQuestion.id === item.id ? newQuestion : item)
    } else {
      this.testService.allQuestion.push(newQuestion);
    }

    console.log(newQuestion)
    this.testService.changeAnswerOptions = [];
    this.path.navigate(['/']);
  }

  get answerOptions(): FormArray {
    return this.questionForm.get('answerOptions') as FormArray;
  }
}

