import { ListsQuestionsPageComponent } from './lists-questions-page/lists-questions-page.component';
import { QuestionEditPageComponent } from './question-edit-page/question-edit-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { QuestionPageComponent } from './question-page/question-page.component';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'add', component: QuestionPageComponent},
  { path: 'wiev', component: ListsQuestionsPageComponent},
  { path: 'edit', component: QuestionEditPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
