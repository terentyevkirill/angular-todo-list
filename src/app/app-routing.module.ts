import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosComponent } from './todos/todos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { AddTodoComponent } from './add-todo/add-todo.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'todos', component: TodosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: TodoDetailComponent },
  { path: 'add-todo', component: AddTodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
