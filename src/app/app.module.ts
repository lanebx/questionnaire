import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuestionManagementPageComponent } from './question-management-page/question-management-page.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { QuestionEditPageComponent } from './question-edit-page/question-edit-page.component';
import { ListsQuestionsPageComponent } from './lists-questions-page/lists-questions-page.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    QuestionManagementPageComponent,
    QuestionPageComponent,
    QuestionEditPageComponent,
    ListsQuestionsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
