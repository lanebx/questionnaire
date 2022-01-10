import { Component, SimpleChange, OnInit } from '@angular/core';
import { TestService } from './shared/services/Question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private testService: TestService) {
  }

  ngOnChanges(obj: SimpleChange) {
    console.log(obj)
  }

  title = 'Questionnaire';

}
