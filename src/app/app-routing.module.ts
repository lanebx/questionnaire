import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsQuestionsPageComponent } from './lists-questions-page/lists-questions-page.component';
import { QuestionEditCreateComponent } from './question-edit-create/question-edit-create.component';
import { QuestionManagementPageComponent } from './question-management-page/question-management-page.component';

const routes: Routes = [
  { path: 'view', component: ListsQuestionsPageComponent, data: { status: 'view' } },
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
