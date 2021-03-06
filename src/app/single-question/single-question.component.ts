import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataInfo, Question } from '../interfaces/interfaces';
import { TestService } from '../shared/services/Question.service';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.scss']
})
export class SingleQuestionComponent implements OnInit {
  constructor (
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private testService: TestService,
    private path: Router,
  ) { }

  @Input() item: Question;

  @Output() blur = new EventEmitter();

  formAnswerOptions: FormGroup;
  dataInfo: DataInfo;
  id: number;
  checkAnswer: boolean = false;
  oldQuestion: Question;
  answer: string;

  ngOnInit(): void {
    this.dataInfo = this.route.snapshot.data as DataInfo;
    let newControlArray: FormControl[];

    if (this.dataInfo.status === 'edit') {
      this.id = +this.route.snapshot.params.id;
      this.oldQuestion = this.testService.questions$.value.find(item => item.id === this.id);

      newControlArray = this.oldQuestion.answerOptions.map(item => {
        return this.fb.control(item, Validators.required);
      });
    }

    this.formAnswerOptions = this.fb.group({
      answerOptions: this.fb.array(newControlArray || [this.fb.control('', Validators.required)])
    });
  }

  onChange(model: any) {
    this.answer = model.path[1].innerText;
    this.checkAnswer = true;
  }

  onClick() {
    this.testService.addAnswer(this.item.id, this.answer);
  }

  addChoice(): void {
    if (this.answerOptions.value.every((item: any) => item.length >= 1)) {
      this.answerOptions.push(this.fb.control('', Validators.required))
    }
  }

  removeChoice(index: number) : void {
    if (this.answerOptions.value.length > 1) {
      this.answerOptions.removeAt(index);
    }

    this.onBlur();
  }

  onBlur() {
    this.blur.emit(this.answerOptions.value);
  }

  get answerOptions(): FormArray {
    return this.formAnswerOptions.get('answerOptions') as FormArray;
  }
}
