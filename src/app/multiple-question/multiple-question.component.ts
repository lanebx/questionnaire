import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataInfo } from '../question-edit-create/question-edit-create.component';
import { TestService } from '../shared/services/Question.service';

@Component({
  selector: 'app-multiple-question',
  templateUrl: './multiple-question.component.html',
  styleUrls: ['./multiple-question.component.scss']
})
export class MultipleQuestionComponent implements OnInit {
  constructor (
    private testService: TestService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  formAnswerOptions: FormGroup;
  dataInfo: DataInfo;

  ngOnInit(): void {
    this.route
      .data
      .subscribe(data => this.dataInfo = data as DataInfo);

    this.formAnswerOptions = this.fb.group({
      answerOptions: this.fb.array([this.fb.control('', Validators.required)])
    })
  }

  onBlur() {
    this.testService.changeAnswerOptions = this.answerOptions.value;
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
    return this.formAnswerOptions.get('answerOptions') as FormArray;
  }
}
