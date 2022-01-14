import { Question } from './../shared/services/Question.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataInfo } from '../interfaces/interfaces';

@Component({
  selector: 'app-open-question',
  templateUrl: './open-question.component.html',
  styleUrls: ['./open-question.component.scss']
})
export class OpenQuestionComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
  ) {}

  @Input() item: Question;
  @Output() itemChange = new EventEmitter();

  dataInfo: DataInfo;

  ngOnInit(): void {
    this.dataInfo = this.route.snapshot.data as DataInfo;
  }

   onChange(model: string){
    this.item.answer = model;
    this.itemChange.emit(model);
  }

  onClick() {
    this.item.answered = true;
    this.item.dateOfAnswer = (new Date).toISOString();
  }
}
