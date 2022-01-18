import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataInfo, Question } from '../interfaces/interfaces';
import { TestService } from '../shared/services/Question.service';

@Component({
  selector: 'app-open-question',
  templateUrl: './open-question.component.html',
  styleUrls: ['./open-question.component.scss']
})
export class OpenQuestionComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
  ) {}

  @Input() item: Question;

  dataInfo: DataInfo;
  checkAnswer: boolean = false;
  answer: string;

  ngOnInit(): void {
    this.dataInfo = this.route.snapshot.data as DataInfo;
  }

  onChange(model: string){
    this.answer = model

    if (model.trim().length > 0) {
     this.checkAnswer = true;
    } else {
      this.checkAnswer = false;
    }
  }

  onClick() {
    this.testService.addAnswer(this.item.id, this.answer);
  }
}
