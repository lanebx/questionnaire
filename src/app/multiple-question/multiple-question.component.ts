import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataInfo, Question } from '../interfaces/interfaces';
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

  @Input() item: Question;
  @Output() blur = new EventEmitter();

  arrayAnswers: [string, boolean][];
  checkAnswer: boolean = false;
  formAnswerOptions: FormGroup;
  id: number;
  dataInfo: DataInfo;
  oldQuestion: Question;
  answer: string[];

  ngOnInit(): void {
    this.dataInfo = this.route.snapshot.data as DataInfo;
    let newControlArray: FormControl[];
  
    if (this.dataInfo.status === 'view') {
      this.arrayAnswers = this.item.answerOptions.map(item => {
        return [item, false];
      });
    }

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

  onClick() {
    this.answer = this.arrayAnswers.filter(item => item[1]).map(item => item[0]);

    this.testService.addAnswer(this.item.id, this.answer);
  }

  addAnswer(event: any) {
    this.checkAnswer = false;

    this.arrayAnswers = this.arrayAnswers.map(item => {
      if (event.path[1].innerText.trim() === item[0]) {
        item[1] = !item[1];
      }

      if (item[1]) {
        this.checkAnswer = true;
      }

      return item;
    })
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

    this.onBlur();
  }

  onBlur() {
    this.blur.emit(this.answerOptions.value);
  }

  get answerOptions(): FormArray {
    return this.formAnswerOptions.get('answerOptions') as FormArray;
  }
}
