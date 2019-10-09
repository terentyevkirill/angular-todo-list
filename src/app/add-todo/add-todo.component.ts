import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  todoForm: FormGroup;
  isSubmitted = false;
  todo: Todo;

  constructor(private todoService: TodoService, private formBuilder: FormBuilder, private location: Location) { }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.todoForm.invalid) { return; }
    this.todo = this.todoForm.value as Todo;
    this.todo.date = new Date();
    this.todoService.addTodo(this.todo)
      .subscribe(_ => {
        console.log(this.todoForm.value as Todo, 'Added');
        this.goBack();
      });
  }

  private buildForm() {
    this.todoForm = this.formBuilder.group({
      text: [ '', Validators.required ]
    });
  }

  goBack(): void {
    this.location.back();
  }

}
