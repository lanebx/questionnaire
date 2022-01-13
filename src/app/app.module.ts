import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { QuestionManagementPageComponent } from './question-management-page/question-management-page.component';
import { ListsQuestionsPageComponent } from './lists-questions-page/lists-questions-page.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionEditCreateComponent } from './question-edit-create/question-edit-create.component';
import { OpenQuestionComponent } from './open-question/open-question.component';
import { MultipleQuestionComponent } from './multiple-question/multiple-question.component';
import { SingleQuestionComponent } from './single-question/single-question.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionManagementPageComponent,
    ListsQuestionsPageComponent,
    QuestionEditCreateComponent,
    OpenQuestionComponent,
    MultipleQuestionComponent,
    SingleQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
