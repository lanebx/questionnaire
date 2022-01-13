import { NgModule } from '@angular/core';
/* import { CommonModule } from '@angular/common'; */
import { Routes, RouterModule } from '@angular/router';
/* import { AppComponent } from './app.component';
import { QuestionPageComponent } from './question-page/question-page.component'; */
import { ListsQuestionsPageComponent } from './lists-questions-page/lists-questions-page.component';
import { QuestionEditCreateComponent } from './question-edit-create/question-edit-create.component';
import { QuestionManagementPageComponent } from './question-management-page/question-management-page.component';

const routes: Routes = [
  { path: 'wiev', component: ListsQuestionsPageComponent, data: { status: 'wiev' } },
  { path: '', component: QuestionManagementPageComponent},
  { path: 'create', component: QuestionEditCreateComponent, data: { status: 'create' } },
  { path: 'edit/:id', component: QuestionEditCreateComponent, data: { status: 'edit' } },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
     RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
