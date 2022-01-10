import { QuestionManagementPageComponent } from './question-management-page/question-management-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { ListsQuestionsPageComponent } from './lists-questions-page/lists-questions-page.component';
import { QuestionEditPageComponent } from './question-edit-page/question-edit-page.component';

const routes: Routes = [
  { path: 'add', component: QuestionPageComponent},
  { path: 'wiev', component: ListsQuestionsPageComponent},
  { path: '', component: QuestionManagementPageComponent},
  { path: 'edit', component: QuestionEditPageComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
     RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
