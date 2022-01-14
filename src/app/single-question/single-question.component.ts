import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataInfo } from '../question-edit-create/question-edit-create.component';
import { Question, TestService } from '../shared/services/Question.service';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.scss']
})
export class SingleQuestionComponent implements OnInit {
  constructor (
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  @Input() item: Question;
  @Output() itemChange = new EventEmitter();
  @Output() blur = new EventEmitter();

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

  onChange(model: any) {
    this.item.answer = model.path[1].innerText;
    this.itemChange.emit(model);
  }

  onClick() {
    this.item.answered = true;
    this.item.dateOfAnswer = (new Date).toISOString();
  }

  onBlur() {
    this.blur.emit(this.answerOptions.value);
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