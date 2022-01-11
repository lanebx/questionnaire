import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestService } from '../shared/services/Question.service';

@Component({
  selector: 'app-question-edit-page',
  templateUrl: './question-edit-page.component.html',
  styleUrls: ['./question-edit-page.component.scss']
})
export class QuestionEditPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public testService: TestService,
    private route: Router
  ) { }

  editQuestionForm: FormGroup;
  chosedType: string;

  allTypes = this.testService.allTypes.map((item) => ({...item}));

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() : void {
    this.editQuestionForm = this.fb.group({
      question: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      answerType: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  onSubmit() {
    
  }

  selectType(event: any): void {
    this.chosedType = event.target.value
  }


}
