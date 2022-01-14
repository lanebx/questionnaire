import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataInfo, Question } from '../interfaces/interfaces';


@Component({
  selector: 'app-multiple-question',
  templateUrl: './multiple-question.component.html',
  styleUrls: ['./multiple-question.component.scss']
})
export class MultipleQuestionComponent implements OnInit {
  constructor (
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  @Input() item: Question;

  @Output() blur = new EventEmitter();

  arrayAnswers: [string, boolean][];

  addAnswer(event: any) {
    console.log(event.path[1].innerText)
    this.arrayAnswers = this.arrayAnswers.map(item => {
      if (event.path[1].innerText.trim() === item[0]) {
        item[1] = !item[1];
      }

      return item;
    })
  }

  onClick() {
    console.log(this.arrayAnswers)
    const newAnswer = this.arrayAnswers.filter(item => item[1]).map(item => item[0])
    this.item.answer = newAnswer;
    this.item.answered = true;
    this.item.dateOfAnswer = (new Date).toISOString(); 
  }

  formAnswerOptions: FormGroup;
  dataInfo: DataInfo;

  ngOnInit(): void {
    this.dataInfo = this.route.snapshot.data as DataInfo;
  
    this.arrayAnswers = this.item.answerOptions.map(item => {
      return [item, false]
    });

    this.formAnswerOptions = this.fb.group({
      answerOptions: this.fb.array([this.fb.control('', Validators.required)])
    })
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
