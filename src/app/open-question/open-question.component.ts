import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataInfo, Question } from '../interfaces/interfaces';

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
  checkAnwer: boolean = false;

  ngOnInit(): void {
    this.dataInfo = this.route.snapshot.data as DataInfo;
  }

  onChange(model: string){
    this.item.answer = model
    this.itemChange.emit(model);

    if (model.trim().length > 0) {
     this.checkAnwer = true;
    } else {
      this.checkAnwer = false;
    }
  }

  onClick() {
    this.item.answered = true;
    this.item.dateOfAnswer = (new Date).toISOString();
  }
}
